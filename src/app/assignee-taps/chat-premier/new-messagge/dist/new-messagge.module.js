"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NewMessaggePageModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var angular_1 = require("@ionic/angular");
var new_messagge_routing_module_1 = require("./new-messagge-routing.module");
var new_messagge_page_1 = require("./new-messagge.page");
var ngx_file_drop_1 = require("ngx-file-drop");
var ng_fallimg_1 = require("ng-fallimg");
var NewMessaggePageModule = /** @class */ (function () {
    function NewMessaggePageModule() {
    }
    NewMessaggePageModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                angular_1.IonicModule,
                new_messagge_routing_module_1.NewMessaggePageRoutingModule,
                ngx_file_drop_1.NgxFileDropModule,
                ng_fallimg_1.NgFallimgModule.forRoot({
                    "default": './assets/gris.png',
                    avatar: './assets/avatar.svg'
                }),
            ],
            declarations: [new_messagge_page_1.NewMessaggePage]
        })
    ], NewMessaggePageModule);
    return NewMessaggePageModule;
}());
exports.NewMessaggePageModule = NewMessaggePageModule;
