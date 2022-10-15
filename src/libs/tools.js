/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
const getHandledValue = num => {
  return num < 10 ? '0' + num : num
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 */
export const getDate = (timeStamp) => {
  const d = timeStamp ? new Date(timeStamp) : new Date()
  const year = d.getFullYear()
  const month = getHandledValue(d.getMonth() + 1)
  const date = getHandledValue(d.getDate())
  const hours = getHandledValue(d.getHours())
  const minutes = getHandledValue(d.getMinutes())
  const second = getHandledValue(d.getSeconds())
  let resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second
  return resStr
}

// 生成uuid字符串
export function uuid() {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  var uuid = s.join('')
  return uuid
}

/**
 * 导出Excel
 * 
 * @param {blob} data blob的文件流
 * @param {string} fileName 下载后的文件名称
 * @returns 
 */
export function _exportExcel(data, fileName) {
  if (!data) {
    this.$message.warning('文件下载失败')
    return
  }
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    window.navigator.msSaveBlob(new Blob([data.data]), `${fileName}.xls`)
  } else {
    let url = window.URL.createObjectURL(new Blob([data.data]))
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', `${fileName}.xls`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link) //下载完成移除元素
    window.URL.revokeObjectURL(url) //释放掉blob对象
  }
}
