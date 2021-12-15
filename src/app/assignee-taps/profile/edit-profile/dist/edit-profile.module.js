"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditProfilePageModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var angular_1 = require("@ionic/angular");
var edit_profile_routing_module_1 = require("./edit-profile-routing.module");
var edit_profile_page_1 = require("./edit-profile.page");
var expansion_1 = require("@angular/material/expansion");
var form_field_1 = require("@angular/material/form-field");
var icon_1 = require("@angular/material/icon");
var input_1 = require("@angular/material/input");
var radio_1 = require("@angular/material/radio");
var core_2 = require("@angular/material/core");
var ng_fallimg_1 = require("ng-fallimg");
var EditProfilePageModule = /** @class */ (function () {
    function EditProfilePageModule() {
    }
    EditProfilePageModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                angular_1.IonicModule,
                edit_profile_routing_module_1.EditProfilePageRoutingModule,
                expansion_1.MatExpansionModule,
                form_field_1.MatFormFieldModule,
                icon_1.MatIconModule,
                input_1.MatInputModule,
                radio_1.MatRadioModule,
                core_2.MatRippleModule,
                ng_fallimg_1.NgFallimgModule.forRoot({
                    "default": './assets/gris.png',
                    avatar: './assets/avatar.svg'
                })
            ],
            declarations: [edit_profile_page_1.EditProfilePage]
        })
    ], EditProfilePageModule);
    return EditProfilePageModule;
}());
exports.EditProfilePageModule = EditProfilePageModule;
