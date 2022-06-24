import {nx, ny, serviceKey, weatherApi} from "../common/common_config";
import {IWeatherApi} from "../common/interface/weather";
import dayjs from "dayjs";
import 'dayjs/locale/ko'
dayjs.locale('ko')

export namespace Weather{
  export function getTodayUrl(url: string = weatherApi): string{
    let url_setting = url
    const base_date = dayjs().format('YYYYMMDD')
    const weatherParams: IWeatherApi = {
      serviceKey:serviceKey,
      pageNo:'1',
      numOfRows:'180',
      dataType:'JSON',
      base_date,
      base_time:'0500',
      nx:nx,
      ny:ny
    }

    url_setting += '?'
    for(let key in weatherParams){
      url_setting += `&${key}=${weatherParams[key]}`
    }
    return url_setting.replace('&','');
  }
}


