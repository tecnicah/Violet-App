"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CurrencyExchangePage = void 0;
var core_1 = require("@angular/core");
var CurrencyExchangePage = /** @class */ (function () {
    function CurrencyExchangePage(router, service, http) {
        this.router = router;
        this.service = service;
        this.http = http;
        this.currencyKey = '42838068e9d2e0905e25ee59a1ef1597';
        this.currencyExcha = [];
        this.amountUsd = 1;
    }
    CurrencyExchangePage.prototype.ngOnInit = function () {
        this.getCurrencyExch();
    };
    CurrencyExchangePage.prototype.back = function () {
        var back = document.getElementById('back');
        back.play();
        this.router.navigateByUrl(localStorage.getItem('back'));
    };
    CurrencyExchangePage.prototype.getCurrencyExch = function () {
        var _this = this;
        var moneda;
        this.dataCurrency = this.http.get("http://api.currencylayer.com/live?access_key=" + this.currencyKey).subscribe(function (resp) {
            var _a;
            moneda = resp;
            for (var key in moneda.quotes) {
                _this.currencyExcha.push((_a = {}, _a['name'] = key, _a['value'] = moneda.quotes[key], _a['symbol'] = key.slice(3), _a));
                // console.log('name=' + key + ' value=' + moneda[key]);
            }
            // console.log('index', this.currencyExcha);
        }, function (err) { return console.log('error currecy', err); });
    };
    CurrencyExchangePage.prototype.getValue = function () {
        var _a;
        this.allValCurrency = [];
        for (var i = 0; i < this.currencyExcha.length; i++) {
            var element = this.currencyExcha[i];
            if (element.value == this.currency) {
                this.allValCurrency = (_a = {}, _a['name'] = element.name, _a['value'] = element.value, _a['symbol'] = element.symbol, _a);
            }
        }
        this.total = this.amountUsd * this.currency;
    };
    CurrencyExchangePage.prototype.Scroll = function (event) {
        this.service.onScroll(event);
    };
    CurrencyExchangePage = __decorate([
        core_1.Component({
            selector: 'app-currency-exchange',
            templateUrl: './currency-exchange.page.html',
            styleUrls: ['./currency-exchange.page.scss']
        })
    ], CurrencyExchangePage);
    return CurrencyExchangePage;
}());
exports.CurrencyExchangePage = CurrencyExchangePage;
