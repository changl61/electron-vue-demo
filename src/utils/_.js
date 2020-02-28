// ===========================
// 工具函数合集,参考underscore.js
// list 列表（对象数组）;
// arr 简单数组;
// obj 对象;
// date 日期;
// is 判断;
// file 文件名相关
// 其他
// ===========================

const _ = {};

// ===========================
// list 列表（对象数组）
// ===========================

/**
 * 列表分组
 * @param list [{}]
 * @param key str 子对象键名
 * @return {{[]}}
 */
_.listGroupBy = function (list, key) {
  let obj = {};
  if (!_.isList(list)) return obj;

  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    let type = item[key];
    if (!type) continue;

    if (typeof obj[type] === 'undefined') obj[type] = [];
    obj[type].push(item);
  }

  return obj;
};

/**
 * 列表索引
 * @param list [{}]
 * @param key str 子对象键名
 * @return {[]}
 */
_.listIndexBy = function (list, key) {
  let obj = {};
  if (!_.isList(list)) return obj;

  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    let value = item[key];
    if (value) obj[value] = item;
  }

  return obj;
};

/**
 * 列表萃取某属性值
 * @param list [{}]
 * @param key str 子对象键名
 * @return []
 */
_.listPluck = function (list, key) {
  let arr = [];
  if (!_.isList(list)) return arr;

  for (let i = 0; i < list.length; i++) {
    let v = list[i][key];
    if (v && arr.indexOf(v) < 0) arr.push(v);
  }

  return arr;
};

/**
 * 列表查找某些项
 * @param list [{}]
 * @param predicate func 检测回调
 * @param len int 返回列表长度(不填或-1则不限长度)
 * @return [{}]
 */
_.listFind = function (list, predicate, len) {
  let resList = [];
  if (!_.isList(list)) return resList;
  if (!_.isFunction(predicate)) return resList;

  for (let i = 0; i < list.length; i++) {
    if (len > 0 && resList.length === len) return resList;
    let item = list[i];
    if (predicate(item)) resList.push(_.deepCopy(item));
  }

  return resList;
};

/**
 * 列表查找第一个
 * @param list [{}]
 * @param predicate func 检测回调
 * @return {}
 */
_.listFindFirst = function (list, predicate) {
  let item = {};
  if (!_.isList(list)) return item;
  if (!_.isFunction(predicate)) return item;

  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i])) return _.deepCopy(list[i]);
  }

  return item;
};

/**
 * 列表剔除某些项
 * @param list [{}]
 * @param predicate func 检测回调
 * @return [{}]
 */
_.listExclude = function (list, predicate) {
  let resList = [];
  if (!_.isList(list)) return resList;
  if (!_.isFunction(predicate)) return resList;

  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    if (!predicate(item)) resList.push(item);
  }
  return resList;
};

/**
 * 列表本身添加子对象
 * @param master [{}] 要操作的列表
 * @param slave [{}] 要添加的列表
 * @return bool
 */
_.listAppend = function (master, slave) {
  if (!_.isList(master) || !_.isList(slave)) return false;
  for (let i = 0; i < slave.length; i++) {
    master.push(_.deepCopy(slave[i]));
  }

  return true;
};

// ===========================
// array 简单数组
// ===========================

/**
 * 数组最后一个元素
 * @param arr []
 * @return *
 */
_.arrLast = function (arr) {
  if (!_.isArray(arr)) return null;
  return arr[arr.length - 1];
};

/**
 * 判断数组是否包含某个元素
 * @param arr []
 * @param item str|int
 * @return bool
 */
_.arrHas = function (arr, item) {
  if (!_.isArray(arr)) return false;
  return arr.indexOf(item) >= 0;
};

/**
 * 数组合并
 * @param master 要合并的数组
 * @param slave 被合并的数组
 * @return bool
 */
_.arrMerge = function (master, slave) {
  if (!_.isArray(master) || !_.isArray(slave)) return false;

  for (let i = 0; i < slave.length; i++) {
    let item = slave[i];
    if (master.indexOf(item) < 0) master.push(item);
  }

  return true;
};

/**
 * 数组剔除
 * @param master 要操作的数组
 * @param slave 被剔除的元素数组
 * @return bool
 */
_.arrWithout = function (master, slave) {
  if (!_.isArray(master) || !_.isArray(slave)) return false;

  for (let i = 0; i < slave.length; i++) {
    let index = master.indexOf(slave[i]);
    if (index >= 0) master.splice(index, 1);
  }

  return true;
};

/**
 * 求两个数组的交集
 * @param a []
 * @param b []
 * @return []
 */
_.arrIntersection = function (a, b) {
  let arr = [];
  if (!_.isArray(a) || !_.isArray(b)) return arr;

  for (let i = 0; i < a.length; i++) {
    let item = a[i];
    if (b.indexOf(item) >= 0) arr.push(item);
  }

  return arr;
};

/**
 * 求两个数组差集(在a不在b)
 * @param a []
 * @param b []
 * @return []
 */
_.arrDiff = function (a, b) {
  let arr = [];
  if (!_.isArray(a) || !_.isArray(b)) return arr;

  for (let i = 0; i < a.length; i++) {
    let item = a[i];
    if (b.indexOf(item) < 0) arr.push(item);
  }

  return arr;
};

/**
 * 数组去重
 * @param arr []
 * @return []
 */
_.arrUnique = function (arr) {
  return Array.from(new Set(arr));
};

/**
 * 数组取最大者
 * @param arr []
 * @return num
 */
_.arrMax = function (arr) {
  if (!_.isArray(arr) || !arr.length) return Number.NaN;
  return Math.max.apply({}, arr);
};

/**
 * 数组取最小者
 * @param arr []
 * @return num
 */
_.arrMin = function (arr) {
  if (!_.isArray(arr) || !arr.length) return Number.NaN;
  return Math.min.apply({}, arr);
};

/**
 * 数组交换元素位置
 * @param arr []
 * @param i1 int
 * @param i2 int
 * @return num
 */
_.arrSwap = function (arr, i1, i2) {
  arr[i1] = arr.splice(i2, 1, arr[i1])[0];
  return arr;
};

/**
 * 数组移动元素位置
 * @param arr []
 * @param i0 int 原索引
 * @param i1 int 目标位置索引
 * @return num
 */
_.arrMove = function (arr, i0, i1) {
  if (i1 < 0) i1 = 0;
  if (i1 > arr.length - 1) i1 = arr.length - 1;

  let item = arr.splice(i0, 1)[0];
  arr.splice(i1, 0, item);
  return arr;
};

// 判断数组相等-浅对比
_.arrIsEqual = function (arr1, arr2) {
  if (!_.isArray(arr1) || !_.isArray(arr2)) {
    throw new Error('_.arrIsEqual: 两个参数必须全为数组');
  }
  if (arr1 === arr2) {
    return true;
  }

  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i in arr1) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
};

// ===========================
// object 对象
// ===========================

/**
 * 判断对象自身拥有属性（不含继承）
 * @param obj {*}
 * @param key str
 * @return bool
 */
_.objHas = function (obj, key) {
  return obj.hasOwnProperty(key);
};

/**
 * 获取对象所有自身的（不含继承）可枚举属性
 * @param obj {*}
 * @return []
 */
_.objKeys = function (obj) {
  if (!_.isObject(obj)) return [];
  if (Object.keys) return Object.keys(obj);

  let keys = [];
  for (let key in obj) if (obj.hasOwnProperty(key)) keys.push(key);
  return keys;
};

/**
 * 对象所有自身的（不含继承）可枚举属性数量
 * @param obj {*}
 * @return int
 */
_.objSize = function (obj) {
  return _.objKeys(obj).length;
};

/**
 * 对象所有（含继承）可枚举属性
 * @param obj {*}
 * @return []
 */
_.objAllKeys = function (obj) {
  if (!_.isObject(obj)) return [];

  let keys = [];
  /* eslint-disable */
  for (let key in obj) keys.push(key);
  /* eslint-enable */
  return keys;
};

/**
 * 获取对象某些属性值，返回一个对象。
 * @param obj {*}
 * @param keys []
 * @return {*}
 */
_.objPluck = function (obj, keys) {
  let res = {};
  if (!_.isObject(obj)) return res;

  for (let k in obj) {
    if (obj.hasOwnProperty(k) && keys.indexOf(k) >= 0) {
      res[k] = _.deepCopy(obj[k]);
    }
  }

  return res;
};

// ===========================
// is 判断
// ===========================

_.isDefined = function (v) {
  return typeof v !== 'undefined';
};

_.isUndefined = function (v) {
  return typeof v === 'undefined';
};

_.isNumber = function (v) {
  return typeof v === 'number';
};

_.isString = function (v) {
  return typeof v === 'string';
};

_.isBoolean = function (v) {
  return typeof v === 'boolean';
};

_.isFunction = function (v) {
  return typeof v === 'function';
};

_.isArray = function (v) {
  return Object.prototype.toString.call(v) === '[object Array]';
};

_.isObject = function (v) {
  return Object.prototype.toString.call(v) === '[object Object]';
};

_.isDate = function (v) {
  return _.isObject(v) && (v instanceof Date);
};

// 判断是否为对象数组
_.isList = function (v) {
  if (!_.isArray(v)) return false;
  if (v.length) {
    return _.isObject(v[0]);
  }
  return true;
};

// 判断是否为空（空对象或空数组）
_.isEmpty = function (v) {
  if (_.isArray(v)) return !v.length;
  if (_.isObject(v)) return !_.objKeys(v).length;

  return !v;
};

// ===========================
// 文件名相关
// ===========================

// 文件名哈希，保证唯一
_.fileHashName = function (name) {
  return `${_.uuid()}.${_.fileSuffix(name)}`;
};

// 文件名（不包括后缀）
_.filePureName = function (name) {
  let i = name.lastIndexOf('.');
  return name.substring(0, i);
};

// 文件后缀
_.fileSuffix = function (name) {
  let i = name.lastIndexOf('.');
  return name.substring(i + 1);
};


// ===========================
// 其他
// ===========================

// 函数防抖
_.debounce = function (fn, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(fn.bind(this, ...arguments), delay);
  };
};

// 函数截流
_.throttle = function (fn, interval) {
  let lastTime = 0;
  return function () {
    let nowTime = Date.now();
    if (nowTime - lastTime >= interval) {
      lastTime = nowTime;
      fn.apply(this, arguments);
    }
  }
};

/**
 * 对象通过json编码再解码的方式拷贝
 * 会丢失function和undefined属性
 * @param v {*}|[]
 * @return {*}|[]
 */
_.jsonCopy = function (v) {
  return (_.isObject(v) || _.isArray(v)) ? JSON.parse(JSON.stringify(v)) : v;
};

/**
 * 对象深拷贝（不包括继承属性）
 * @param v *
 * @returns {*}
 */
_.deepCopy = function (v) {
  // not object || null object
  if (typeof v !== 'object' || v === null) return v;

  // object (not null)
  let copy;
  switch (v.constructor) {
    case Date: {
      copy = new v.constructor(v.getTime());
      break;
    }
    case RegExp: {
      copy = new v.constructor(v);
      break;
    }
    case Array: {
      copy = v.map(item => _.deepCopy(item));
      break;
    }
    default: {
      copy = {};
      for (k in v) {
        // 不包括继承属性
        if (v.hasOwnProperty(k)) {
          copy[k] = _.deepCopy(v[k]);
        }
      }
    }
  }

  return copy;
};

/**
 * 对象深继承 (不包括继承属性）
 * @param target
 * @param sources
 * @returns {*|{}}
 */
_.deepAssign = function (target, ...sources) {
  // 不是对象
  if (!_.isObject(target)) {
    let lastSource = sources[sources.length - 1];
    return _.deepCopy(lastSource);
  }

  // 依次赋值
  for (let i = 0, len = sources.length; i < len; i++) {
    let source = sources[i];
    if (!_.isObject(source)) continue;

    for(k in source) {
      if (!source.hasOwnProperty(k)) continue; // 排除继承属性

      if (target.hasOwnProperty(k)) {
        target[k] = _.deepAssign(target[k], source[k]);
      } else {
        target[k] = _.deepCopy(source[k]);
      }
    }
  }

  return target;
};

// 唯一字符串
_.uuid = function () {
  let s = [];
  let hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = '_';

  return s.join('');
};

module.exports = _;
