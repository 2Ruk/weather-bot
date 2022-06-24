import express from "express"
import {Controller_weather} from "./weather/controller_weather";
import dayjs from "dayjs";
import 'dayjs/locale/ko'
dayjs.locale('ko')
const app = express();
const port = process.env.PORT || 3000;


app.get('/',async (request, response)=>{
  try{
    const weather = new Controller_weather();
    const message = await weather.getTodayWeather();

    response.json({
      message
    })
  }catch (e) {
    console.log(e)
  }
})

app.get('/today',async (request, response)=>{
  try{
    response.send(`날짜 ${dayjs().format('YYYY-MM-DD')}`)
  }catch (e) {
    console.log(e)
  }
})

app.get('/message',async (request, response)=>{
  try{
    const weather = new Controller_weather();
    const message = await weather.getTodayWeather();

    response.send(`${message}`)
  }catch (e) {
    console.log(e)
  }
})


app.listen(port,()=>{
  console.log('start app')
})