import {Weather} from "./config_weather";
import axios from "axios";
import dayjs from "dayjs";
import 'dayjs/locale/ko'
dayjs.locale('ko')
axios.defaults.timeout = 60000
import {IWeatherMessage} from "../common/interface/weather";


export class Service_weather{

  async getTodayWeather(): Promise<string>{
    return await this.getWeatherData()
  }


  async getWeatherData():Promise<string>{

    const url = Weather.getTodayUrl();
    const {data} = await axios.get(url);
    console.log(data.response.body.items);
    const items = data.response.body.items.item

    const today = dayjs().format('YY월 MM년 DD일')
    const todayString= dayjs().format('YYYYMMDD')

    const filterItem = items.filter((v: { category: string; fcstDate: string; }) => v.category ==='POP' && v.fcstDate===`${todayString}` )

    const messageInfo: IWeatherMessage = {
      today: today,
      am:{
        text: '출근시간',
        idx: 0,
        value: [],
      },
      pm:{
        text: '퇴근시간',
        idx: 0,
        value: [],
      }
    }

    for(let item of filterItem){
      const time = Number(item.fcstTime)/100
      const value = Number(item.fcstValue);
      const joinWorkTime = 7<time && time < 10
      const leaveWorkTime = 17<time && time < 20

      if(joinWorkTime){
        // 출근시간
        messageInfo.am.idx++;
        messageInfo.am.value.push(value);
      }else if(leaveWorkTime){
        // 퇴근시간
        messageInfo.pm.idx++;
        messageInfo.pm.value.push(value);
      }
    }
    let min:number = 100;
    let max:number = 0;

    for(let value of messageInfo.am.value){
      const isMin = value < min;
      const isMax = value > max;
      if(isMin) min = value;
      if(isMax) max = value;
    }

    for(let value of messageInfo.pm.value){
      const isMin = value < min;
      const isMax = value > max;
      if(isMin) min = value;
      if(isMax) max = value;
    }

    const todayIsRain =  min&&max ? `${min}% ~ ${max}% 확률로 비가 온다는 소식!!` : `비 확률이 0% !!`

    return `
      ${todayIsRain} 
      ${messageInfo.today}날씨 정보 \n
      ${messageInfo.am.text} 
      ( •̀ ω •́ )✧
       08시-09시 ▶ ${messageInfo.am.value[0]} % 확률
       09시-10시 ▶ ${messageInfo.am.value[1]} % 확률
      ${messageInfo.pm.text} 
      ヾ(≧▽≦*)o
       18시-19시 ▶ ${messageInfo.pm.value[0]} % 확률
       19시-20시 ▶ ${messageInfo.pm.value[1]} % 확률
    `
  }


}

