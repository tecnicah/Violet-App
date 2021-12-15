import { Component, OnInit } from '@angular/core';
import { ConfirmationPage } from 'src/app/dialog/confirmation/confirmation.page';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { DocumentsDialogPage } from 'src/app/dialog/documents-dialog/documents-dialog.page';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { LoadingService } from 'src/app/general/loader.service';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { GeneralService } from 'src/app/general/general.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DocumentRelocationPage } from 'src/app/dialog/document-relocation/document-relocation.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-property-management',
  templateUrl: './property-management.page.html',
  styleUrls: ['./property-management.page.scss'],
})
export class PropertyManagementPage implements OnInit {
  constructor(private socialSharing: SocialSharing, private iab: InAppBrowser,public actionSheetController: ActionSheetController, private camera: Camera, private callNumber: CallNumber, public router: Router, private _permissions: NgxPermissionsService, public loader: LoadingService, public modalController: ModalController, public _services: GeneralService) { }
  // public navParams: NavParams,
  public addReminder_: boolean = false;
  public addComment_: boolean = false;
  public addReport : boolean = false;
  public report_data : any = {};
  public userData: any = {};
  public reminder_data: any = {};
  public comment_data: any = {};
  public dataSourceHousing: any[] = [];
  public dataSourceSchool: any[] = [];
  public coordinatorData: any;
  public consultantData: any;
  public cliente: any;
  public disabled: boolean = false;
  public show_name_assignee = true;
  public __userlog__: any = JSON.parse(localStorage.getItem('userData'));
  public type_user: any;
  //***************************************************************************//
  ionViewWillEnter() {
    if (window.screen.width <= 500) {
      this.show_name_assignee = true;
    } else {
      this.show_name_assignee = false;
    }
    this.coordinador = [];
    this.consultant = [];
    this.userData = JSON.parse(localStorage.getItem('userData'));
    const user_rol: string[] = [this.__userlog__.role.id];
    this.type_user = user_rol;
    this._permissions.loadPermissions(user_rol);
    this.ngOnInit();
    this.coordinatorData = JSON.parse(localStorage.getItem('relocationCoordinators'));
    this.consultantData = JSON.parse(localStorage.getItem('relocationSupplierPartners'));
    if (this.__userlog__.role.id == 4 || this.__userlog__.role.id == 3) {
      this.disabled = true;
      this.getConsultant();
      this.getCoordinator();
    }
  }
  //***************************************************************************//
  //CONSULTA DATA GLOBAL SERVICIO//
  public area: any = {
    documentPropertyManagements: [],
    documentReportIssuePropertyManagements: [],
    photoBillPropertyManagements: [],
    photoInspectionPropertyManagements: [],
    photoMailPropertyManagements: [],
    photoPropertyManagements: [],
    photoReportIssuePropertyManagements: [],
    reminderPropertyManagements: [],
    visitReportPropertyManagements: [],
    commentPropertyManagements: []
  };
  public data: any = {};
  public ca_visaType = [];
  ngOnInit() {
    this.loader.loadingPresent();
    this.getCatalogos();
    //this.data = this.navParams.data;
    this.data = JSON.parse(localStorage.getItem('data_service'));
    this._services.service_general_get(`RelocationServices/GetPropertyManagementById?id=${this.data.service[0].id}`)
      .subscribe((response: any) => {
        console.log(response);
        if (response.success) {
          console.log(response.result);
          //this.loader.loadingDismiss();
          this.area = response.result;
          for(let i=0; i<this.area.commentPropertyManagements.length; i++){
            this.area.commentPropertyManagements[i].role = this.area.commentPropertyManagements[i].createdByNavigation.role.role;
            this.area.commentPropertyManagements[i].name = this.area.commentPropertyManagements[i].createdByNavigation.name;
            this.area.commentPropertyManagements[i].avatar = this.area.commentPropertyManagements[i].createdByNavigation.avatar;
          }
          this.getServiceScope();
          this.getDataDependent();
          this.sortData();
          this.getPayment();
          this.loader.loadingDismiss();
        }
      }, (error: any) => {
        console.error('Error => ', error);
        this.loader.loadingDismiss();
      });
    this.loader.loadingDismiss();
    //this.loader.loadingDismiss();
  }
  //**************************************************************************//
  //CONSULTA DE INFORMACION DEL DEPENDENT//
  public data_dependent: any;
  getDataDependent() {
    this._services.service_general_get('ServiceOrder/GetDeliverTo?wos=' + this.area.workOrderServices).subscribe(r => {
      if (r.success) {
        this.data_dependent = r.result.value;
        console.log(this.data_dependent);
        //this.loader.loadingDismiss();
      }
    })
  }
  //**************************************************************************//
  //SORT REMINDER//
  sortData() {
    return this.area.reminderPropertyManagements.sort((a, b) => {
      return <any>new Date(a.reminderDate) - <any>new Date(b.reminderDate);
    });
  }
  //***************************************************************************//
  //CONSULTA DE CATALOGOS//
  public ca_estatus = [];
  public catalog_library = [];
  public catalog_severity = [];
  public catalog_status_report = [];
  public catalog_bill = [];
  async getCatalogos() {
    this.catalog_status_report = await this._services.getCatalogueFrom('GetStatusReportIssue');
    this.catalog_severity = await this._services.getCatalogueFrom('GetSeverity');
    this.catalog_bill = await this._services.getCatalogueFrom('GetBillType');
    this.catalog_library = await this._services.getCatalogueFrom('GetLibrary');
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=25").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.ca_estatus = data.result;
      }
    }))
  }
  //***************************************************************************//
  //CONSULTA DE  REQUEST PAYMENTS//
  public payment: any[] = [];
  getPayment() {
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.area.workOrderServices).subscribe((data => {
      if (data.success) {
        console.log(data.result);
        this.payment = data.result.value.payments;
        console.log(this.payment);
      }
      console.log(this.payment);
    }))
  }
  //***************************************************************************//
  //FUNCION PARA AGREGAR DOCUMENTOS//
  public temporalDocument = [];
  async addDocument() {
    const modal = await this.modalController.create({
      component: DocumentRelocationPage,
      componentProps: { id: 1 },
      backdropDismiss: true,
    });

    modal.onDidDismiss().then((data: any) => {
      console.log(data);
      if (data.data.success) {
        data.data.propertyManagement = this.area.id;
        data.data.comment = "";
        this.temporalDocument.push(data.data);
      }
    })
    this.modalController.dismiss();
    await modal.present();
  }
  //***************************************************************************//
  //FUNCION PARA ELIMINAR DOCUMENTOS//
  async deleteDocument(id, i) {
    const modal = await this.modalController.create({
      component: ConfirmationPage,
      cssClass: 'modal-general-confirm',
      componentProps: {
        header: "Delete",
        body: "Delete document?",
        yesText: 'Yes, delete',
        noText: 'No, continue',
      }
    });

    modal.onDidDismiss().then((data) => {
      console.log(data, id);
      if (data.data) {
        if (id != 0) {
          this._services.service_general_delete('RelocationServices/DeleteDocumentPropertyManagement?id=' + id).subscribe(r => {
            if (r.success) {
              this.general_messages({
                title: "Success",
                body: "The document was deleted",
                success: true
              });
              this.ionViewWillEnter();
            }
          })
        } else {
          this.temporalDocument.splice(i, 1);
        }
      }
    })
    this.modalController.dismiss();
    await modal.present();
  }
  //***************************************************************************//
  //FUNCION PARA AGREGAR REPLICA//
  public temporalComment = [];
  addComment() {
    this.temporalComment.push({
      "id": 0,
      "propertyManagement": this.area.id,
      "comment": this.comment_data.comments,
      "userId": this.userData.id,
      "createdBy": this.userData.id,
      "createdDate": new Date(),
      "updateBy": this.userData.id,
      "updatedDate": new Date(),
      "user": this.userData
    })
    this.addComment_ = false;
    this.comment_data.comments = '';
  }
  //***************************************************************************//
  //FUNCION PARA AGREGAR REPLICA//
  addReminder() {
    this.area.reminderPropertyManagements.push({
      "id": 0,
      "propertyManagement": this.area.id,
      "reminderDate": this.reminder_data.reminderDate,
      "reminderComments": this.reminder_data.reminderComments,
      "createdBy": this.userData.id,
      "createdDate": new Date()
    })
    this.reminder_data.reminderDate = null;
    this.reminder_data.reminderComments = '';
    this.addReminder_ = false;
  }
  //***************************************************************************//
  //FUNCION PARA ELIMINAR REMINDER//
  async deleteReminder(id, i) {
    const modal = await this.modalController.create({
      component: ConfirmationPage,
      cssClass: 'modal-general-confirm',
      componentProps: {
        header: "Delete",
        body: "Do you want delete this reminder?",
        yesText: 'Yes, delete',
        noText: 'No, continue',
      }
    });

    modal.onDidDismiss().then((data) => {
      console.log(data, id);
      if (data.data) {
        if (id != 0) {
          this._services.service_general_delete('RelocationServices/DeleteReminderPropertyManagement?id=' + id).subscribe(r => {
            if (r.success) {
              this.general_messages({
                title: "Success",
                body: "The reminder was deleted",
                success: true
              });
              this.ionViewWillEnter();
            }
          })

        } else {
          this.area.reminderPropertyManagements.splice(i, 1);
        }
      }
    })
    this.modalController.dismiss();
    await modal.present();
  }
  //***************************************************************************//
  //FUNCION PARA GUARDAR INFORMACION//
  save() {
    this._services.footerHidden = false;
    this.loader.loadingPresent();
    console.log("SAVE INFORMATION: ", this.area);
    this.area.documentPropertyManagements = this.temporalDocument;
    this.area.updateBy = this.userData.id;
    this.area.updatedDate = new Date();
    this.area.createdBy = this.userData.id;
    this.area.createdDate = new Date();
    this.area.authoDateExtension = new Date();
    this.area.authoAcceptanceDateExtension = new Date();

    this.area.commentPropertyManagements = this.temporalComment;
    let data_comment_aux = this.area.commentPropertyManagements;
    this.area.commentPropertyManagements = [];

    for (let i = 0; i < data_comment_aux.length; i++) {
      if (data_comment_aux[i].comment != null && data_comment_aux[i].comment != undefined && data_comment_aux[i].comment.trim() != '') {
        this.area.commentPropertyManagements.push(data_comment_aux[i]);
      }
    }

    console.log(this.area);
    this._services.service_general_put("RelocationServices/PutPropertyManagement", this.area).subscribe((data => {
      if (data.success) {
        console.log(data);
        this.general_messages({
          title: "Success",
          body: "Property Management was updated",
          success: true
        });
        this.loader.loadingDismiss();
        this.temporalDocument = [];
        this.temporalComment = [];
        this.ionViewWillEnter();
      }
    }))
  }
  //***************************************************************************//
  //FUNCION PARA GUARDAR INFORMACION//
  back() {
    if (this.userData.role.id != 4) {
      let back: any = document.getElementById('back');
      let sr = Number(localStorage.getItem('srAd'));
      localStorage.removeItem('data_service');
      this.router.navigateByUrl('assignee-taps/services-all/view-sr/' + sr);
      back.play();
    } else {
      let back: any = document.getElementById('back');
      let sr = Number(localStorage.getItem('srAd'));
      localStorage.removeItem('data_service');
      this.router.navigateByUrl('assignee-taps/services');
      back.play();
    }
  }
  //***************************************************************************//
  //FUNCION PARA ABRIR MODAL DE CONFIRMACION//
  async general_messages(data) {
    const modal = await this.modalController.create({
      component: GeneralMensagePage,
      cssClass: 'modal-general-mensage',
      backdropDismiss: true,
      componentProps: data
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
    })
    this.modalController.dismiss();

    await modal.present();
  }
  //FUNCION PARA COORDINADOR//
  coordinador = [];
  getCoordinator() {
    if (this.coordinatorData.length > 0) {
      for (let i = 0; i < this.coordinatorData.length; i++) {
        this._services.service_general_get('Catalog/GetUser/' + this.coordinatorData[i].coordinatorId)
          .subscribe((response: any) => {
            this.coordinador.push(response.result.value);
          })
      }
    }
  }
  //FUNCION PARA CONSULTANT//
  consultant = [];;
  getConsultant() {
    if (this.consultantData.length > 0) {
      for (let i = 0; i < this.consultantData.length; i++) {
        this._services.service_general_get('Catalog/GetUser/' + this.consultantData[i].supplierId)
          .subscribe((response: any) => {
            this.consultant.push(response.result.value);
          })
      }
    }
  }
  //**********************************************************************//
  Scroll(event) {
    this._services.onScroll(event);
  }
  //**********************************************************************//
  sendMessage() {
    let item = JSON.parse(localStorage.getItem('data_service'));;
    let immRel = 2;
    this.router.navigate(['assignee-taps/chat/' + item.serviceRecordId + '/' + immRel])
  }
  //*********************************************************************//
  async call(number, message) {
    console.log("Entra a llamar");
    console.log("Entra a llamar");
    console.log(number);
    let search = '+';
    let posicion = number.indexOf(search);
    console.log(posicion)
    let final_number;
    if(posicion >=1){
      let prefix = number.substr(0, posicion);
      let phone = number.substr(posicion + 1);
      final_number = '+'+prefix+phone;
      console.log(final_number);
    }
    if (number != null && number != '' && number != undefined) {
      const modal = await this.modalController.create({
        component: ConfirmationPage,
        cssClass: 'modal-general-confirm',
        componentProps: {
          header: "Message",
          body: "Send message to " + message + "?",
          yesText: 'Yes',
          noText: 'No',
        }
      });

      modal.onDidDismiss().then((data) => {
        console.log(data);
        if (data.data) {
          this.socialSharing.shareViaWhatsAppToPhone(final_number,'Hello '+message,null,null);
        }
      })
      this.modalController.dismiss();
      await modal.present();
    }
  }
  //*********************************************************************//
  async photo() {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }

          this.option(options);
        }
      }, {
        text: 'Gallery',
        icon: 'images',
        handler: () => {
          const options: CameraOptions = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }
          this.option(options);
        }
      }]
    });
    await actionSheet.present();
  }
  //**********************************************************************//
  public interior = [];
  option(options) {
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let data_photo = {
        "id": 0,
        "propertyManagement": this.area.id,
        "photo": imageData,
        "photoExtension": 'jpeg',
        "namePhoto": new Date(),
        "b64": base64Image,
        "createdBy": this.userData.id,
        "createdDate": new Date(),
        "updateBy": this.userData.id,
        "updatedDate": new Date()
      }
      this.area.photoReportIssuePropertyManagements.push(data_photo);
    }, (err) => {
      // Handle error
    });
  }
  //**********************************************************************//
  show_rented: boolean = false;
  eventToggle(e) {
    console.log(e);
    if (e.detail.checked) {
      this.show_rented = true;
      this.area.rented = true;
      this.show_vacant = false;
      this.area.vacant = false;
    } else {
      this.show_rented = false;
    }
  }

  show_vacant: boolean = false;
  eventToggle_(e) {
    console.log(e);
    if (e.detail.checked) {
      this.show_vacant = true;
      this.area.vacant = false;
      this.show_rented = false;
      this.area.rented = false;
    } else {
      this.show_vacant = false;
    }
  }
  //**********************************************************************//
  async photo_() {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }

          this.option_(options);
        }
      }, {
        text: 'Gallery',
        icon: 'images',
        handler: () => {
          const options: CameraOptions = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }
          this.option_(options);
        }
      }]
    });
    await actionSheet.present();
  }
  //**********************************************************************//
  option_(options) {
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let data_photo = {
        "id": 0,
        "propertyManagement": this.area.id,
        "photo": imageData,
        "photoExtension": 'jpeg',
        "namePhoto": new Date(),
        "b64": base64Image,
        "createdBy": this.userData.id,
        "createdDate": new Date(),
        "updateBy": this.userData.id,
        "updatedDate": new Date()
      }
      this.area.photoInspectionPropertyManagements.push(data_photo);
    }, (err) => {
      // Handle error
    });
  }
  //**********************************************************************//
  async __photo__() {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }

          this.__option__(options);
        }
      }, {
        text: 'Gallery',
        icon: 'images',
        handler: () => {
          const options: CameraOptions = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }
          this.__option__(options);
        }
      }]
    });
    await actionSheet.present();
  }
  //**********************************************************************//
  __option__(options) {
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let data_photo = {
        "id": 0,
        "propertyManagement": this.area.id,
        "photo": imageData,
        "photoExtension": 'jpeg',
        "namePhoto": new Date(),
        "b64": base64Image,
        "createdBy": this.userData.id,
        "createdDate": new Date(),
        "updateBy": this.userData.id,
        "updatedDate": new Date()
      }
      this.area.photoBillPropertyManagements.push(data_photo);
    }, (err) => {
      // Handle error
    });
  }
  //**********************************************************************//
  async photoMail(){
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }

          this.optionMail(options);
        }
      }, {
        text: 'Gallery',
        icon: 'images',
        handler: () => {
          const options: CameraOptions = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }
          this.optionMail(options);
        }
      }]
    });
    await actionSheet.present();
  }
  //**********************************************************************//
  optionMail(options) {
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let data_photo = {
        "id": 0,
        "propertyManagement": this.area.id,
        "photo": imageData,
        "photoExtension": 'jpeg',
        "namePhoto": new Date(),
        "b64": base64Image,
        "createdBy": this.userData.id,
        "createdDate": new Date(),
        "updateBy": this.userData.id,
        "updatedDate": new Date()
      }
      this.area.photoMailPropertyManagements.push(data_photo);
    }, (err) => {
      // Handle error
    });
  }
  //**********************************************************************//
  serviceScope:any = {
    documentcountries: []
  };
  //CONSULTA DE SCOPE SERVICE DOCUMENTS//
  getServiceScope() {
    let partnerId = Number(localStorage.getItem('partnerID'));
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.area.workOrderServices}&client=${partnerId }`).subscribe(resp => {
      if (resp.success) {
        console.log('Data ScopeService: ', resp);
        this.serviceScope = resp.result.value;
      }
    });
  }
  //***************************************************************************//
  //FUNCION PARA AGREGAR REPLICA//
  addVisitReport() {
    this.area.visitReportPropertyManagements.push({
      "id": 0,
      "propertyManagement": this.area.id,
      "visitReport": this.report_data.visitReport,
      "createdBy": this.userData.id,
      "createdDate": new Date(),
      "updateBy": this.userData.id,
      "updatedDate": new Date()
    })
    this.report_data.visitReport = '';
    this.addReport = false;
  }
  //*****************************************************************//
  viewDoc(doc){
    this.iab.create(this._services.url_images+doc,'_system')
  }
}
