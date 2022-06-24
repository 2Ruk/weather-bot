export interface IWeatherApi {
  serviceKey: string,
  pageNo: string,
  numOfRows: string,
  dataType: string,
  base_date: string,
  base_time: string,
  nx: string,
  ny: string,

  [key: string]:string
}

export interface IWeatherMessage {
  today: string,
  am:IMessageValue,
  pm:IMessageValue
}

interface IMessageValue {
  text: ITimeText,
  idx: number,
  value: number[],
}

type ITimeText = '출근시간'|'퇴근시간'