import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general/general.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingService } from 'src/app/general/loader.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {

  constructor(public router: Router,
              public service: GeneralService,
              private http: HttpClient,
              public geolocalizacion:Geolocation,
              public loadingService: LoadingService) { }
  
  
  date = new Date();
  apikey = '8440d47f0341f0d1dfa7177f61935122';
  dataClima;
  coordenadas;
  weather;
  urlIcon;
  converFC;

  ionViewWillEnter(){
    this.loadingService.loadingPresent();
    this.geolocalizacion.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
      this.getWeather(resp.coords.latitude, resp.coords.longitude);
      this.loadingService.loadingDismiss();
     }).catch((error) => {
       console.log('Error getting location', error);
       this.loadingService.loadingDismiss();
     });
  }

  ngOnInit() {
    
  }

  back(){
    let back: any = document.getElementById('back');
    back.play()
    this.router.navigateByUrl(localStorage.getItem('back'));
  }
  getWeather(lat, lon) {
    console.log('entrando a getweather');
    // this.dataClima = this.http.get(`${this.URI} ${lat} ${lon}`)
    this.dataClima = this.http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apikey}`)
    .subscribe (
      resp => {
        this.weather = resp;
        this.urlIcon = `http://openweathermap.org/img/wn/${this.weather.weather[0].icon}@2x.png`;
        this.converFC = ((this.weather.main.temp - 273.15)  ).toFixed(0);
        console.log(this.weather);

        // console.log('icono', this.urlIcon);
        // console.log('img icon', this.weather.weather[0].icon);

        console.log('resp clima', resp)
      },
      err => console.log('error clima', err)
    )
    console.log('weather', this.weather);
  }
  converCelsius(grados) {
    return ((grados - 273.15)  ).toFixed(0);
  }

  converF(grados) {
    let celcius;
        celcius = ((grados - 273.15)  ).toFixed(0);
     return  (celcius * 9 / 5) + 32;
  }

  Scroll(event) {
    this.service.onScroll(event);
  }
  
  show_grade: boolean = false;
  convertGrade(){
   this.show_grade = !this.show_grade;
   console.log("Entra a convertir grados celcius a farengeith");
   if(this.show_grade){
    let fahrenheit = (this.converFC * 9 / 5) + 32;
    console.log("los grados ºf son : ", fahrenheit);
    this.converFC = fahrenheit;
   }else{
    this.ionViewWillEnter();
   }
  }
}
