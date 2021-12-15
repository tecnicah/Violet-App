"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TimeZonePage = void 0;
var core_1 = require("@angular/core");
var TimeZonePage = /** @class */ (function () {
    function TimeZonePage(router, service, http) {
        this.router = router;
        this.service = service;
        this.http = http;
        this.AllZone = [];
    }
    TimeZonePage.prototype.Scroll = function (event) {
        this.service.onScroll(event);
    };
    TimeZonePage.prototype.ngOnInit = function () {
        this.getZone();
    };
    TimeZonePage.prototype.back = function () {
        var back = document.getElementById('back');
        back.play();
        this.router.navigateByUrl(localStorage.getItem('back'));
    };
    TimeZonePage.prototype.getZone = function () {
        var _this = this;
        this.dataZone = this.http.get("http://worldtimeapi.org/api/timezone\"").subscribe(function (resp) {
            var zone = resp;
            // console.log('zone', zone);
        });
        this.http.get("http://worldtimeapi.org/api/timezone/America/New_York").subscribe(function (rny) {
            _this.AllZone.push(rny);
        });
        this.http.get("http://worldtimeapi.org/api/timezone/America/Argentina/Buenos_Aires").subscribe(function (rba) {
            _this.AllZone.push(rba);
        });
        this.http.get("http://worldtimeapi.org/api/timezone/America/Mexico_City").subscribe(function (rmx) {
            _this.AllZone.push(rmx);
        });
        this.http.get("http://worldtimeapi.org/api/timezone/Asia/Dubai").subscribe(function (rdb) {
            _this.AllZone.push(rdb);
        });
        this.http.get("http://worldtimeapi.org/api/timezone/Asia/Hong_Kong\n    ").subscribe(function (rhk) {
            _this.AllZone.push(rhk);
        });
        // this.http.get(`http://worldtimeapi.org/api/timezone/Atlantic/Canary
        // `).subscribe(rca => {
        //   this.AllZone.push(rca);
        // });
        this.http.get("http://worldtimeapi.org/api/timezone/Australia/Sydney\n    ").subscribe(function (rsy) {
            _this.AllZone.push(rsy);
        });
        this.http.get("http://worldtimeapi.org/api/timezone/Europe/London\n    ").subscribe(function (rlo) {
            _this.AllZone.push(rlo);
        });
        this.http.get("http://worldtimeapi.org/api/timezone/Europe/Rome\n    ").subscribe(function (rro) {
            _this.AllZone.push(rro);
        });
        this.http.get("http://worldtimeapi.org/api/timezone/Indian/Cocos\n    ").subscribe(function (rcoc) {
            _this.AllZone.push(rcoc);
        });
        console.log('zonas', this.AllZone);
    };
    TimeZonePage = __decorate([
        core_1.Component({
            selector: 'app-time-zone',
            templateUrl: './time-zone.page.html',
            styleUrls: ['./time-zone.page.scss']
        })
    ], TimeZonePage);
    return TimeZonePage;
}());
exports.TimeZonePage = TimeZonePage;
