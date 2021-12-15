"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ProfilePage = void 0;
var core_1 = require("@angular/core");
var edit_profile_page_1 = require("./edit-profile/edit-profile.page");
var housing_specifications_page_1 = require("./housing-specifications/housing-specifications.page");
var immigration_profile_page_1 = require("./immigration-profile/immigration-profile.page");
var add_dependent_page_1 = require("./add-dependent/add-dependent.page");
var add_pet_page_1 = require("./add-pet/add-pet.page");
var ProfilePage = /** @class */ (function () {
    function ProfilePage(service, router, modalController, loadingService) {
        this.service = service;
        this.router = router;
        this.modalController = modalController;
        this.loadingService = loadingService;
        this.userData = {};
        this.info = {};
        this.relationship_catalogue = [];
        this.country_catalogue = [];
        this.CaBreed = [];
        this.pettype_catalogue = [];
        this.petsize_catalogue = [];
        this.hs_boolean = false;
        this.immPrf = {};
        this.immPrf_boolean = false;
    }
    ProfilePage.prototype.ngOnInit = function () {
    };
    ProfilePage.prototype.Scroll = function (event) {
        this.service.onScroll(event);
    };
    ProfilePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.loadingService.loadingPresent();
        if (Number(localStorage.getItem('sr')) != 0) {
            this.service.service_general_get("ServiceRecord/GetServiceRecordById?id=" + localStorage.getItem('sr') + "&user=" + this.userData.id).subscribe(function (r) {
                console.log(r);
                if (r.success) {
                    _this.allSR = r.result;
                    _this.loadingService.loadingDismiss();
                    _this.info = r.result.assigneeInformations[0];
                    _this.pet_Type();
                    for (var i = 0; i < r.result.immigrationProfiles[0].dependentImmigrationInfos.length; i++) {
                        var element = r.result.immigrationProfiles[0].dependentImmigrationInfos[i];
                        for (var j = 0; j < _this.info.dependentInformations.length; j++) {
                            var e = _this.info.dependentInformations[j];
                            if (element.name == e.name) {
                                _this.info.dependentInformations[j].documents = element.documentDependentImmigrationInfos;
                            }
                        }
                    }
                    console.log(_this.info);
                    _this.loadingService.loadingDismiss();
                }
            });
            this.catalogos();
        }
        else {
            this.service.service_general_get("ServiceRecord/GetServiceRecordById?id=" + localStorage.getItem('srAd') + "&user=" + localStorage.getItem('userId')).subscribe(function (r) {
                console.log(r);
                if (r.success) {
                    _this.allSR = r.result;
                    _this.info = r.result.assigneeInformations[0];
                    _this.pet_Type();
                    _this.loadingService.loadingDismiss();
                    if (r.result.immigrationProfiles.length > 0) {
                        for (var i = 0; i < r.result.immigrationProfiles[0].dependentImmigrationInfos.length; i++) {
                            var element = r.result.immigrationProfiles[0].dependentImmigrationInfos[i];
                            for (var j = 0; j < _this.info.dependentInformations.length; j++) {
                                var e = _this.info.dependentInformations[j];
                                if (element.name == e.name) {
                                    _this.info.dependentInformations[j].documents = element.documentDependentImmigrationInfos;
                                }
                            }
                        }
                    }
                    console.log(_this.info);
                    _this.loadingService.loadingDismiss();
                    _this.catalogos();
                }
            });
        }
        this.housingSpe();
        this.immProfile();
        this.loadingService.loadingDismiss();
    };
    ProfilePage.prototype.housingSpe = function () {
        /*this.service.service_general_get('HousingSpecification/GetHousingSpecitifcationByServiceRecord?sr='+localStorage.getItem('sr')).subscribe(r=>{
          console.log(r);
          if(r.success){
            this.hs = r.result;
            this.hs_boolean = true;
          }
        })*/
    };
    ProfilePage.prototype.immProfile = function () {
        var _this = this;
        if (Number(localStorage.getItem('sr')) != 0) {
            this.service.service_general_get('ImmigrationProfile/GetImmigrationProfile?sr=' + localStorage.getItem('sr')).subscribe(function (r) {
                console.log(r);
                if (r.success) {
                    _this.immPrf = r.result.value;
                    if (_this.immPrf != null) {
                        _this.immPrf_boolean = true;
                    }
                }
            });
        }
        else {
            this.service.service_general_get('ImmigrationProfile/GetImmigrationProfile?sr=' + localStorage.getItem('srAd')).subscribe(function (r) {
                console.log(r);
                if (r.success) {
                    _this.immPrf = r.result.value;
                    if (_this.immPrf != null) {
                        _this.immPrf_boolean = true;
                    }
                }
            });
        }
    };
    ProfilePage.prototype.back = function () {
        var back = document.getElementById('back');
        back.play();
        var ruta = localStorage.getItem('back');
        if (ruta != undefined && ruta != null) {
            this.router.navigateByUrl(ruta);
        }
        else {
            this.router.navigateByUrl('/assignee-taps/home');
        }
    };
    ProfilePage.prototype.catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetRelationship')];
                    case 1:
                        _a.relationship_catalogue = _e.sent();
                        _b = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetCountry')];
                    case 2:
                        _b.country_catalogue = _e.sent();
                        _c = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetPetType')];
                    case 3:
                        _c.pettype_catalogue = _e.sent();
                        _d = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetSize')];
                    case 4:
                        _d.petsize_catalogue = _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfilePage.prototype.pet_Type = function () {
        var _this = this;
        var _loop_1 = function (i) {
            var element = this_1.info.petsNavigation[i];
            this_1.service.service_general_get("Catalogue/GetBreed?id=" + element.petTypeId).subscribe((function (data) {
                if (data.success) {
                    _this.CaBreed[i] = data.result;
                }
            }));
        };
        var this_1 = this;
        for (var i = 0; i < this.info.petsNavigation.length; i++) {
            _loop_1(i);
        }
    };
    ProfilePage.prototype.getRelationShip = function (id) {
        for (var i = 0; i < this.relationship_catalogue.length; i++) {
            var element = this.relationship_catalogue[i];
            if (id == element.id) {
                return element.relationship;
            }
        }
    };
    ProfilePage.prototype.getYears = function (date_in) {
        var date_init = new Date(date_in), date_today = new Date();
        var diff = (date_init.getTime() - date_today.getTime()) / 1000;
        diff /= (60 * 60 * 24);
        return Math.abs(Math.round(diff / 365.25));
    };
    ProfilePage.prototype.getNationality = function (id) {
        for (var i = 0; i < this.country_catalogue.length; i++) {
            var element = this.country_catalogue[i];
            if (element.id == id) {
                return element.name;
            }
        }
    };
    ProfilePage.prototype.getPetType = function (id) {
        for (var i = 0; i < this.pettype_catalogue.length; i++) {
            var element = this.pettype_catalogue[i];
            if (id == element.id) {
                return element.petType;
            }
        }
    };
    ProfilePage.prototype.GetBreed = function (id, i) {
        if (this.CaBreed[i]) {
            for (var j = 0; j < this.CaBreed[i].length; j++) {
                var element = this.CaBreed[i][j];
                if (id == element.id) {
                    return element.breed;
                }
            }
        }
    };
    ProfilePage.prototype.getSize = function (id) {
        for (var i = 0; i < this.petsize_catalogue.length; i++) {
            var element = this.petsize_catalogue[i];
            if (id == element.id) {
                return element.size;
            }
        }
    };
    ProfilePage.prototype.edit = function (a, data, i) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: edit_profile_page_1.EditProfilePage,
                            backdropDismiss: true,
                            componentProps: {
                                type: a,
                                data: data,
                                allData: this.info,
                                allSR: this.allSR,
                                pos: i
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            _this.ionViewWillEnter();
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfilePage.prototype.housing = function (a) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: housing_specifications_page_1.HousingSpecificationsPage,
                            backdropDismiss: true,
                            componentProps: a
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            _this.housingSpe();
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfilePage.prototype.immigrationProfile = function (a) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.immPrf_boolean == false) {
                            return [2 /*return*/, true];
                        }
                        return [4 /*yield*/, this.modalController.create({
                                component: immigration_profile_page_1.ImmigrationProfilePage,
                                backdropDismiss: true,
                                componentProps: this.immPrf
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            _this.immProfile();
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfilePage.prototype.addDependent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: add_dependent_page_1.AddDependentPage,
                            componentProps: { data: this.allSR }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            _this.ionViewWillEnter();
                        });
                        this.modalController.dismiss();
                        // console.log(data);
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        // console.log(data);
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfilePage.prototype.addPet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: add_pet_page_1.AddPetPage,
                            componentProps: { data: this.allSR }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            _this.ionViewWillEnter();
                        });
                        this.modalController.dismiss();
                        // console.log(data);
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        // console.log(data);
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfilePage = __decorate([
        core_1.Component({
            selector: 'app-profile',
            templateUrl: './profile.page.html',
            styleUrls: ['./profile.page.scss']
        })
    ], ProfilePage);
    return ProfilePage;
}());
exports.ProfilePage = ProfilePage;
