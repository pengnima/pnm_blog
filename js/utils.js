//  格式化日期
export function DateFormat(date, fmt) {
  fmt = fmt.replace(/^(y+)/, function () {
    return date.getFullYear() + "".substr(4 - RegExp.$1.length);
  });

  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
  };

  for (const key in o) {
    let reg = new RegExp(`(${key})`);

    fmt = fmt.replace(reg, function () {
      let str = o[key] + "";
      return RegExp.$1.length > 1 ? ("00" + str).substr(str.length) : str;
    });
  }

  return fmt;
}
