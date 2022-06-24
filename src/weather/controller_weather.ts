import {Service_weather} from "./service_weather";

export class Controller_weather {
  private readonly serviceWeather: Service_weather = new Service_weather();

  getTodayWeather(){
    return this.serviceWeather.getTodayWeather()
  }
}