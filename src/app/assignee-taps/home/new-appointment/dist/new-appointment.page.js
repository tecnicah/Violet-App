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
exports.NewAppointmentPage = void 0;
var core_1 = require("@angular/core");
var confirmation_page_1 = require("src/app/dialog/confirmation/confirmation.page");
var general_mensage_page_1 = require("src/app/dialog/general-mensage/general-mensage.page");
var NewAppointmentPage = /** @class */ (function () {
    function NewAppointmentPage(router, service, modalController, popoverController, loadingService) {
        this.router = router;
        this.service = service;
        this.modalController = modalController;
        this.popoverController = popoverController;
        this.loadingService = loadingService;
        this.userData = {};
        this.caSl = [];
        this.caWo = [];
        this.caService = [];
        this.caSr = [];
        this.data = {
            documentAppointments: []
        };
        this.name = null;
        this.temporalDocument = [];
        this.files = [];
        this.active_start = false;
        this.active_startD = false;
        this.active_end = false;
        this.active_service = false;
    }
    NewAppointmentPage.prototype.ngOnInit = function () {
    };
    NewAppointmentPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.data = {
            id: 0,
            serviceRecordId: 0,
            date: "",
            startTime: "",
            endTime: "",
            description: "",
            status: true,
            createdBy: this.userData.id,
            createdDate: new Date(),
            updateBy: this.userData.id,
            updatedDate: new Date(),
            appointmentWorkOrderServices: [],
            documentAppointments: []
        };
        this.service.service_general_get('Catalogue/GetServiceRecordApp/' + this.userData.id).subscribe(function (r) {
            if (r.success) {
                _this.caSr = r.result.value;
                console.log(_this.caSr);
                if (_this.userData.role.id == 4) {
                    _this.data.serviceRecordId = Number(localStorage.getItem('sr'));
                    _this.getWO();
                }
            }
        });
    };
    NewAppointmentPage.prototype.getWO = function () {
        var _this = this;
        for (var i = 0; i < this.caSr.length; i++) {
            var element = this.caSr[i];
            if (this.data.serviceRecordId == element.id) {
                this.name = element.assigneeName;
            }
        }
        this.service.service_general_get('Catalogue/GetworkOrderBySR?service_record_Id=' + this.data.serviceRecordId + '&service_line_id=2').subscribe(function (r) {
            if (r.success) {
                _this.caWo = r.result.value;
            }
        });
    };
    NewAppointmentPage.prototype.getServices = function () {
        var _this = this;
        this.service.service_general_get('Catalogue/GetServiceByWorkOrder?wo=' + this.data.workOrder).subscribe(function (r) {
            if (r.success) {
                _this.caService = r.result.value;
                console.log(_this.caService);
            }
        });
    };
    NewAppointmentPage.prototype.setService = function ($event, item, id, i) {
        console.log();
        if ($event.detail.checked) {
            this.data.appointmentWorkOrderServices.push({
                id: 0,
                appointmentId: 0,
                workOrderServiceId: item.service
            });
        }
        else {
            this.data.appointmentWorkOrderServices.splice(i, 1);
        }
        console.log(this.data);
    };
    NewAppointmentPage.prototype.doc = function () {
        document.getElementById('doc').click();
    };
    NewAppointmentPage.prototype.dropped = function (files) {
        var _this = this;
        this.files = files;
        var _loop_1 = function (droppedFile) {
            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
                var fileEntry_1 = droppedFile.fileEntry;
                var reader_1 = new FileReader();
                fileEntry_1.file(function (file) {
                    // Here you can access the real file
                    console.log(droppedFile.relativePath);
                    console.log(file, _this.files);
                    fileEntry_1.file(function (file) {
                        reader_1.readAsDataURL(file);
                        reader_1.onload = function () {
                            var imageUrl = reader_1.result;
                            var encoded = imageUrl.toString().replace(/^data:(.*;base64,)?/, '');
                            if ((encoded.length % 4) > 0) {
                                encoded += '='.repeat(4 - (encoded.length % 4));
                            }
                            var ext = file.type.split("/");
                            _this.data.documentAppointments.push({
                                "id": 0,
                                "fileRequest": encoded,
                                "fileName": droppedFile.relativePath,
                                "fileExtension": ext[1],
                                "appointmentId": 0,
                                "createdBy": _this.userData.id,
                                "createdDate": (new Date()).toISOString()
                            });
                        };
                    });
                });
            }
            else {
                // It was a directory (empty directories are added, otherwise only files)
                var fileEntry = droppedFile.fileEntry;
                console.log(droppedFile.relativePath, fileEntry);
            }
        };
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var droppedFile = files_1[_i];
            _loop_1(droppedFile);
        }
    };
    NewAppointmentPage.prototype.fileOver = function (event) {
        console.log(event);
    };
    NewAppointmentPage.prototype.fileLeave = function (event) {
        console.log(event);
    };
    NewAppointmentPage.prototype.deleteDoc = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: confirmation_page_1.ConfirmationPage,
                            cssClass: 'modal-general-confirm',
                            componentProps: {
                                header: "Delete",
                                body: "Delete document?",
                                yesText: 'Yes, delete',
                                noText: 'No, continue'
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data, id);
                            if (data.data) {
                                _this.data.documentAppointments.splice(id, 1);
                            }
                        });
                        this.modalController.dismiss();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NewAppointmentPage.prototype.save = function () {
        var _this = this;
        console.log(this.data);
        if (this.data.date == "" || this.data.date == undefined || this.data.date == null) {
            this.active_start = true;
        }
        if (this.data.startTime == "" || this.data.startTime == undefined || this.data.startTime == null) {
            this.active_startD = true;
        }
        if (this.data.endTime == "" || this.data.endTime == undefined || this.data.endTime == null) {
            this.active_end = true;
        }
        if (this.data.serviceRecordId == 0) {
            this.active_service = true;
        }
        if (this.data.date != "" && this.data.startTime != "" && this.data.endTime != "" && this.data.serviceRecordId != 0) {
            var int = new Date(this.data.startTime);
            var end = new Date(this.data.endTime);
            this.data.startTime = int.getHours() + ':' + int.getMinutes();
            this.data.endTime = end.getHours() + ':' + end.getMinutes();
            console.log(this.data);
            this.data.createdBy = this.userData.id;
            this.data.createdDate = new Date();
            this.data.updateBy = this.userData.id;
            this.data.updatedDate = new Date();
            this.loadingService.loadingPresent();
            this.service.service_general_post_with_url('Appointment/CreateAppointment', [this.data]).subscribe(function (r) {
                if (r.success) {
                    console.log(r);
                    _this.general_messages({
                        title: "Success",
                        body: "Inserted Data",
                        success: true
                    });
                    _this.back();
                }
            });
        }
    };
    NewAppointmentPage.prototype.general_messages = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: general_mensage_page_1.GeneralMensagePage,
                            cssClass: 'modal-general-mensage',
                            backdropDismiss: true,
                            componentProps: data
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                        });
                        this.modalController.dismiss();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NewAppointmentPage.prototype.back = function () {
        console.log("back");
        var back = document.getElementById('back');
        this.router.navigateByUrl('/assignee-taps/home');
        back.play();
        //this.modalController.dismiss();
    };
    NewAppointmentPage = __decorate([
        core_1.Component({
            selector: 'app-new-appointment',
            templateUrl: './new-appointment.page.html',
            styleUrls: ['./new-appointment.page.scss']
        })
    ], NewAppointmentPage);
    return NewAppointmentPage;
}());
exports.NewAppointmentPage = NewAppointmentPage;
