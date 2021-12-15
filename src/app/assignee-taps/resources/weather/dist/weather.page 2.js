"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WeatherPage = void 0;
var core_1 = require("@angular/core");
var WeatherPage = /** @class */ (function () {
    function WeatherPage(router, service, http, geolocalizacion, loadingService) {
        this.router = router;
        this.service = service;
        this.http = http;
        this.geolocalizacion = geolocalizacion;
        this.loadingService = loadingService;
        this.date = new Date();
        this.apikey = '8440d47f0341f0d1dfa7177f61935122';
    }
    WeatherPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.loadingService.loadingPresent();
        this.geolocalizacion.getCurrentPosition().then(function (resp) {
            console.log(resp.coords.latitude);
            console.log(resp.coords.longitude);
            _this.getWeather(resp.coords.latitude, resp.coords.longitude);
            _this.loadingService.loadingDismiss();
        })["catch"](function (error) {
            console.log('Error getting location', error);
            _this.loadingService.loadingDismiss();
        });
    };
    WeatherPage.prototype.ngOnInit = function () {
    };
    WeatherPage.prototype.back = function () {
        var back = document.getElementById('back');
        back.play();
        this.router.navigateByUrl(localStorage.getItem('back'));
    };
    WeatherPage.prototype.getWeather = function (lat, lon) {
        var _this = this;
        console.log('entrando a getweather');
        // this.dataClima = this.http.get(`${this.URI} ${lat} ${lon}`)
        this.dataClima = this.http.get("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + this.apikey)
            .subscribe(function (resp) {
            _this.weather = resp;
            _this.urlIcon = "http://openweathermap.org/img/wn/" + _this.weather.weather[0].icon + "@2x.png";
            _this.converFC = ((_this.weather.main.temp - 273.15)).toFixed(0);
            console.log(_this.weather);
            // console.log('icono', this.urlIcon);
            // console.log('img icon', this.weather.weather[0].icon);
            console.log('resp clima', resp);
        }, function (err) { return console.log('error clima', err); });
        console.log('weather', this.weather);
    };
    WeatherPage.prototype.converCelsius = function (grados) {
        return ((grados - 273.15)).toFixed(0);
    };
    WeatherPage.prototype.Scroll = function (event) {
        this.service.onScroll(event);
    };
    WeatherPage = __decorate([
        core_1.Component({
            selector: 'app-weather',
            templateUrl: './weather.page.html',
            styleUrls: ['./weather.page.scss']
        })
    ], WeatherPage);
    return WeatherPage;
}());
exports.WeatherPage = WeatherPage;
