"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MapsPage = void 0;
var core_1 = require("@angular/core");
var MapsPage = /** @class */ (function () {
    function MapsPage(router, service) {
        this.router = router;
        this.service = service;
    }
    MapsPage.prototype.ngOnInit = function () {
        this.load();
    };
    MapsPage.prototype.back = function () {
        var back = document.getElementById('back');
        back.play();
        this.router.navigateByUrl(localStorage.getItem('back'));
    };
    MapsPage.prototype.load = function () {
        var _this = this;
        var mapEle = document.getElementById('map');
        var myLatLang = { lat: 19.4978, lng: -99.1269 };
        this.map = new google.maps.Map(mapEle, {
            center: myLatLang,
            zoom: 12
        });
        google.maps.event.addListenerOnce(this.map, 'idle', function () {
            // this.renderMarkers();
            mapEle.classList.add('show-map');
            var marker = {
                position: {
                    lat: 19.4978,
                    lng: -99.1269
                },
                title: 'here'
            };
            _this.addMarker(marker);
        });
    };
    MapsPage.prototype.addMarker = function (marker) {
        return new google.maps.Marker({
            position: marker.position,
            map: this.map,
            title: marker.title
        });
    };
    MapsPage.prototype.Scroll = function (event) {
        this.service.onScroll(event);
    };
    MapsPage = __decorate([
        core_1.Component({
            selector: 'app-maps',
            templateUrl: './maps.page.html',
            styleUrls: ['./maps.page.scss']
        })
    ], MapsPage);
    return MapsPage;
}());
exports.MapsPage = MapsPage;
