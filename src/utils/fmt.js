/**
 * @Date: 2019/3/11 14:41
 * @Description: 格式化
 */

const fmt = {};

/**
 * 日期
 * @param v str|num|date 待格式化
 * @param layout str 格式 yyyy-MM-dd HH:mm:ss
 * @returns {*}
 */
fmt.date = function (v, layout) {
  if (!v) return '';
  if (!layout) layout = 'yyyy-MM-dd';

  // 不同输入类型
  let date = v;
  switch (typeof date) {
    case 'string': {
      date = new Date(date.replace(/-/, '/'));
      break;
    }
    case 'number': {
      date = new Date(date);
      break;
    }
    default: {
      break;
    }
  }
  if (!(date instanceof Date)) return '';

  // 格式化
  let map = {
    yyyy: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate(),
    H: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    MM: (`${date.getMonth() + 101}`).substr(1),
    dd: (`${date.getDate() + 100}`).substr(1),
    HH: (`${date.getHours() + 100}`).substr(1),
    mm: (`${date.getMinutes() + 100}`).substr(1),
    ss: (`${date.getSeconds() + 100}`).substr(1),
  };

  return layout.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, s => map[s]);
};

/**
 * 转为逝去时间 如：几分、时、天前
 * @param v int 毫秒级时间戳
 * @return str
 */
fmt.passedTime = function (v) {
  if (typeof v !== 'number') return '';
  let seconds = parseInt((Date.now() - v) / 1000);

  if (seconds < 60) {
    return `${seconds}刚刚`;
  } if (seconds < 3600) {
    return `${parseInt(seconds / 60)}分钟前`;
  } if (seconds < 86400) {
    return `${parseInt(seconds / 3600)}小时前`;
  }
  return `${parseInt(seconds / 86400)}天前`;
};

/**
 * 数字
 * @param v num 数字
 * @param n int 保留几位小数
 * @returns {string} 千分位
 */
fmt.number = function (v, n) {
  if (typeof v !== 'number') return '-';
  n = typeof n === 'undefined' ? 2 : Math.abs(n);

  return v.toFixed(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * 数字转为百分比格式
 * @param v num
 * @param n int 小数位
 * @return str
 */
fmt.percent = function (v, n) {
  if (Object.is(Number(v), NaN)) return '-';
  return `${fmt.number(v * 100, n)}%`;
};

/**
 * 计算计算两数环比值
 * @param now 当前值
 * @param old 过去值
 * @param n int 小数位
 * @return string
 */
fmt.increase = function (now, old, n) {
  if (old === 0 || now === '-' || old === '-') return '-';
  if (now === old) return '0';

  let percent = Math.abs((now - old) / old);
  return `${fmt.number(percent * 100, n)}%`;
};

/**
 * 货币
 * @param v num 数字
 * @param n int 保留几位小数
 * @param symbol str 货币符号
 * @returns {string}
 */
fmt.money = function (v, n, symbol) {
  if (typeof v !== 'number') return '-';
  return (symbol || '¥') + fmt.number(v, n);
};

/**
 * 数字转文件大小格式
 * @param v num
 * @param n int 保留几位小数
 * @return str
 */
fmt.fileSize = function (v, n) {
  if (typeof v !== 'number') return '';

  if (v < 1000) {
    return `${fmt.number(v, n)} B`;
  } if (v < 1024 * 1000) {
    return `${fmt.number(v / 1024, n)} K`;
  } if (v < 1024 * 1024 * 1000) {
    return `${fmt.number(v / (1024 * 1024), n)} M`;
  } if (v < 1024 * 1024 * 1024 * 1000) {
    return `${fmt.number(v / (1024 * 1024 * 1024), n)} G`;
  } if (v < 1024 * 1024 * 1024 * 1024 * 1000) {
    return `${fmt.number(v / (1024 * 1024 * 1024 * 1024), n)} T`;
  } if (v < 1024 * 1024 * 1024 * 1024 * 1024 * 1000) {
    return `${fmt.number(v / (1024 * 1024 * 1024 * 1024 * 1024), n)} P`;
  }

  return '';
};

/**
 * 首字母大写
 * @param v str
 * @return str
 */
fmt.cap = function (v) {
  if (typeof v !== 'string') return '';

  let cap = v.substr(0, 1).toLocaleUpperCase();
  let str = v.substring(1);

  return cap + str;
};

/**
 * 全部字母大写
 * @param v str
 * @return str
 */
fmt.upper = function (v) {
  if (typeof v !== 'string') return '';
  return v.toUpperCase();
};

/**
 * 全部字母小写
 * @param v str
 * @return str
 */
fmt.lower = function (v) {
  if (typeof v !== 'string') return '';
  return v.toLowerCase();
};

/**
 * 修剪字符串
 * @param v str
 * @param char str 剔除的字符
 * @return str
 */
fmt.trim = function (v, char) {
  if (typeof v !== 'string') v = `${v}`;

  if (!char) char = '\\s';
  let regExp = new RegExp(`(^${char}*)|(${char}*$)`, 'g');

  return v.replace(regExp, '');
};

/**
 * 左边修剪字符串
 * @param v str
 * @param char 剔除的字符
 * @return str
 */
fmt.ltrim = function (v, char) {
  if (typeof v !== 'string') v = `${v}`;

  if (!char) char = '\\s';
  let regExp = new RegExp(`^${char}*`, 'g');

  return v.replace(regExp, '');
};

/**
 * 右边修剪字符串
 * @param v str
 * @param char 剔除的字符
 * @return str
 */
fmt.rtrim = function (v, char) {
  if (typeof v !== 'string') v = `${v}`;

  if (!char) char = '\\s';
  let regExp = new RegExp(`${char}*$`, 'g');

  return v.replace(regExp, '');
};

/**
 * 包裹字符串
 * @param v str
 * @param leftChar 剔除的字符
 * @param rightChar 剔除的字符
 * @return str
 */
fmt.wrap = function (v, leftChar, rightChar) {
  if (typeof v !== 'string') v = `${v}`;
  if (!v) return v;
  if (!leftChar) leftChar = '(';
  if (!rightChar) rightChar = ')';

  return leftChar + v + rightChar;
};

/**
 * 字符串截取两头
 * @param v arr|str
 * @param num num 展示项数量
 * @param ellipsis str 省略文字
 * @returns str
 */
fmt.thin = function (v, num, ellipsis) {
  if (typeof v !== 'string') return v;
  if (v.length <= num) return v;
  if (!ellipsis) ellipsis = '...';

  let str = v.substr(0, parseInt(num / 2));
  str += ellipsis;
  str += v.substr(parseInt(-num / 2));

  return str;
};

module.exports = fmt;
