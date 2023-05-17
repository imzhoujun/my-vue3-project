import moment from 'moment'

export const useMoment = () => {
  // timestamp时间戳 format时间格式如"YYYY年MM月DD日dddd"  "2023.01.17"  "2023-01-17"
  //将时间戳转换成日期
  const date = (timestamp: number, format: st) =>
    moment.unix(timestamp).format(format) //年月日

  return { date }
}
