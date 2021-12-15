"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AssigneeTapsPage = void 0;
var core_1 = require("@angular/core");
var AssigneeTapsPage = /** @class */ (function () {
    function AssigneeTapsPage(router, _services, localNotifications) {
        var _this = this;
        this.router = router;
        this._services = _services;
        this.localNotifications = localNotifications;
        this.userData = {};
        this.serviceline_conversation = 1;
        //***********************************************************//
        //CONSULTA CHAT//
        this.numberChat = 1;
        this.table_contacts = [];
        this.hide = false;
        this.chatPremier = false;
        this.hideNotificacion = false;
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this._services.retrieveMappedObject().subscribe(function (receivedObj) {
            console.log(receivedObj);
            _this.localNotifications.schedule({
                text: 'New Chat'
            });
            _this.hide = true;
            if (_this.userData.role.id != 4) {
                _this.get_Chats();
            }
        });
    }
    AssigneeTapsPage.prototype.ngOnInit = function () {
        this.userData = JSON.parse(localStorage.getItem('userData'));
    };
    AssigneeTapsPage.prototype.ionViewWillEnter = function () {
        this.getNotificaciones();
        if (localStorage.getItem('userData')) {
            this.userData = JSON.parse(localStorage.getItem('userData'));
        }
        else {
            var play = document.getElementById('success');
            play.play();
            this.router.navigateByUrl('');
        }
    };
    AssigneeTapsPage.prototype.get_Chats = function () {
        var _this = this;
        this._services.service_general_get('Chat/GetChatNotification/' + this.userData.id).subscribe(function (n) {
            if (n.success) {
                _this.table_contacts = n.result.value;
                console.log(_this.table_contacts);
                if (_this.table_contacts.length > 0) {
                    _this.chatPremier = true;
                }
            }
        });
    };
    AssigneeTapsPage.prototype.getNotificaciones = function () {
        var _this = this;
        var numero_notificaciones = [];
        this._services.service_general_get('Notification/GetNotificationCenter/' + this.userData.id).subscribe((function (data) {
            if (data.success) {
                console.log('DATA CONSULTA NOTIFICACIONES: ', data);
                //this.ca_notification = data.result.value;
                numero_notificaciones = data.result.value;
                for (var i = 0; i < numero_notificaciones.length; i++) {
                    if (numero_notificaciones[i].view == false) {
                        _this.ca_notification++;
                    }
                }
                if (_this.ca_notification > 0) {
                    _this.hideNotificacion = true;
                }
                console.log(_this.ca_notification);
            }
        }));
    };
    AssigneeTapsPage = __decorate([
        core_1.Component({
            selector: 'app-assignee-taps',
            templateUrl: './assignee-taps.page.html',
            styleUrls: ['./assignee-taps.page.scss']
        })
    ], AssigneeTapsPage);
    return AssigneeTapsPage;
}());
exports.AssigneeTapsPage = AssigneeTapsPage;
