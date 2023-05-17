import moment from 'moment'

export const useMoment = () => {
  // timestamp时间戳 format时间格式如"YYYY年MM月DD日dddd"  "2023.01.17"  "2023-01-17"
  //将时间戳 单位毫秒转换成日期
  const dateMsec = (timestamp: number, format: st) => {
    return moment(timestamp).format(format) //年月日
  }

  //将时间戳 单位秒转换成日期
  const dateSec = (timestamp: number, format: st) => {
    return moment.unix(timestamp).format(format) //年月日
  }

  return { dateMsec, dateSec }
}
