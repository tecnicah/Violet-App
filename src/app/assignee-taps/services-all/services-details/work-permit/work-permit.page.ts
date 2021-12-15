import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ConfirmationPage } from 'src/app/dialog/confirmation/confirmation.page';
import { DocumentsDialogPage } from 'src/app/dialog/documents-dialog/documents-dialog.page';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { GeneralService } from 'src/app/general/general.service';
import { LoadingService } from 'src/app/general/loader.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-work-permit',
  templateUrl: './work-permit.page.html',
  styleUrls: ['./work-permit.page.scss'],
})
export class WorkPermitPage implements OnInit {

  constructor(private socialSharing: SocialSharing, private iab: InAppBrowser, private callNumber: CallNumber, public router: Router, private _permissions: NgxPermissionsService, public loader: LoadingService, public modalController: ModalController, public _services: GeneralService) { }
  //public navParams: NavParams,
  addReminder_: boolean = false;
  addComment_: boolean = false;
  userData: any = {};
  temporalDocument = [];
  reminder_data: any = {};
  comment_data: any = {};
  payments: any[] = [];
  coordinatorData: any;
  consultantData: any;
  cliente: any;
  disabled: boolean = false;
  public __userlog__: any = JSON.parse(localStorage.getItem('userData'));
  type_user: any;
  public show_name_assignee = true;
  //**************************************************************************************************//
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
    this.coordinatorData = JSON.parse(localStorage.getItem('immigrationCoodinators'));
    this.consultantData = JSON.parse(localStorage.getItem('immigrationSupplierPartners'));
    if (this.__userlog__.role.id == 4) {
      this.disabled = true;
      this.getConsultant();
      this.getCoordinator();
    }
    this.cliente = JSON.parse(localStorage.getItem('cliente'));

  }
  //**************************************************************************************************//
  //CONSULTA DATA GLOBAL SERVICIO//
  public workPremit: any = {
    documentWorkPermits: [],
    commentsWorkPermits: [],
    reminderWorkPermits: []
  };
  public data: any = {};
  public ca_visaType = [];
  ngOnInit() {
    this.loader.loadingPresent();
    this.getCatalogos();
    //this.data = this.navParams.data;
    this.data = JSON.parse(localStorage.getItem('data_service'));
    this._services.service_general_get(`ImmigrationServices/GetWorkPermitById?id=${this.data.service[0].id}`)
      .subscribe((response: any) => {
        console.log(response);
        if (response.success) {
          console.log(response.result);
          this.workPremit = response.result;
          this.getServiceScope();
          this.getDataDependent();
          this.sortData();
          this.loader.loadingDismiss();
          this.request();
          this.loader.loadingDismiss();
        }
      }, (error: any) => {
        console.error('Error => ', error);
      });

    this._services.service_general_get("Catalogue/GetVisaCategory").subscribe((data => {
      if (data.success) {
        this.ca_visaType = data.result;
      }
    }));
    this.loader.loadingDismiss();
  }
  //*********************************************//
  //CONSULTA DE INFORMACION DEL DEPENDENT//
  public data_dependent: any;
  getDataDependent() {
    this._services.service_general_get('ServiceOrder/GetDeliverTo?wos=' + this.workPremit.workOrderServicesId).subscribe(r => {
      if (r.success) {
        this.data_dependent = r.result.value;
        console.log(this.data_dependent);
      }
    })
  }
  //*********************************************//
  //SORT REMINDER//
  sortData() {
    return this.workPremit.reminderWorkPermits.sort((a, b) => {
      return <any>new Date(a.reminderDate) - <any>new Date(b.reminderDate);
    });
  }
  //**************************************************************************************************//
  //CONSULTA DE  REQUEST PAYMENTS//
  request() {
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.workPremit.workOrderServicesId).subscribe((data => {
      if (data.success) {
        console.log(data.result);
        this.payments = data.result.value.payments;
        console.log(this.payments);
      }
      console.log(this.payments);
    }))
  }
  //**************************************************************************************************//
  //CONSULTA DE CATALOGOS//
  ca_estatus = [];
  async getCatalogos() {
    //this.ca_estatus = await this._services.getCatalogueFrom('GetStatus');
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=2").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.ca_estatus = data.result;
      }
    }))
  }
  //**************************************************************************************************//
  //FUNCION PARA AGREGAR DOCUMENTOS//
  async addDocument() {
    const modal = await this.modalController.create({
      component: DocumentsDialogPage,
      componentProps: { id: 2 },
      backdropDismiss: true,
    });

    modal.onDidDismiss().then((data: any) => {
      console.log(data);
      if (data.data.success) {
        data.data.workPermitId = this.workPremit.id;
        data.data.comment = "";
        this.temporalDocument.push(data.data);
      }
    })
    this.modalController.dismiss();
    await modal.present();
  }
  //**************************************************************************************************//
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
          this._services.service_general_delete('ImmigrationServices/DeleteDocumentWP?id=' + id).subscribe(r => {
            if (r.success) {
              this.general_messages({
                title: "Success",
                body: "The document was deleted",
                success: true
              });
              this._services.loader = false;
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
  //**************************************************************************************************//
  //FUNCION PARA AGREGAR REPLICA//
  addComment() {
    this.workPremit.commentsWorkPermits.push({
      "id": 0,
      "workPermitId": this.workPremit.id,
      "reply": this.comment_data.comments,
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
  //**************************************************************************************************//
  //FUNCION PARA AGREGAR REPLICA//
  addReminder() {
    this.workPremit.reminderWorkPermits.push({
      "id": 0,
      "workPermitId": this.workPremit.id,
      "reminderDate": this.reminder_data.reminderDate,
      "reminderComments": this.reminder_data.reminderComments,
      "createdBy": this.userData.id,
      "createdDate": new Date()
    })
    this.reminder_data.reminderDate = null;
    this.reminder_data.reminderComments = '';
    this.addReminder_ = false;
  }
  //**************************************************************************************************//
  //FUNCION PARA ELIMINAR DOCUMENTOS//
  async deleteReminder(id, i) {
    const modal = await this.modalController.create({
      component: ConfirmationPage,
      cssClass: 'modal-general-confirm',
      componentProps: {
        header: "Delete",
        body: "Delete reminder?",
        yesText: 'Yes, delete',
        noText: 'No, continue',
      }
    });

    modal.onDidDismiss().then((data) => {
      console.log(data, id);
      if (data.data) {
        if (id != 0) {
          this._services.service_general_delete('ImmigrationServices/DeleteReminderWP?id=' + id).subscribe(r => {
            if (r.success) {
              this.general_messages({
                title: "Success",
                body: "The reminder was deleted",
                success: true
              });
              this._services.loader = false;
              this.ionViewWillEnter();
            }
          })
        } else {
          this.workPremit.reminderWorkPermits.splice(i, 1);
        }
      }
    })
    this.modalController.dismiss();
    await modal.present();
  }
  //**************************************************************************************************//
  //FUNCION PARA GUARDAR INFORMACION//
  save() {
    this.loader.loadingPresent();
    this.workPremit.updatedDate = new Date();
    this.workPremit.updateBy = new Date();
    this.workPremit.documentWorkPermits = this.temporalDocument;
    let data_comment_aux = this.workPremit.commentsWorkPermits;
    this.workPremit.commentsWorkPermits = [];
    for (let i = 0; i < data_comment_aux.length; i++) {
      if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
        data_comment_aux[i].user.profileUsers = [];
        this.workPremit.commentsWorkPermits.push(data_comment_aux[i]);
      }
    }

    console.log(this.workPremit);
    this._services.service_general_put("ImmigrationServices/PutWorkPermit", this.workPremit).subscribe((data => {
      if (data.success) {
        console.log(data);
        this.general_messages({
          title: "Success",
          body: "Work permit was updated",
          success: true
        });
        this.loader.loadingDismiss();
        this.temporalDocument = [];
        this.ionViewWillEnter();
      }
    }))
  }
  //**************************************************************************************************//
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
  //**************************************************************************************************//
  //FUNCION PARA GUARDAR INFORMACION//
  back() {
    //let back: any = document.getElementById('back');
    //back.play();
    //this.modalController.dismiss();
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
  consultant = [];
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
  //FUNCION PARA STATUS NAME//
  getStatusName(statusId) {
    for (let i = 0; i < this.ca_estatus.length; i++) {
      const element = this.ca_estatus[i];
      if (element.id == statusId) {
        return element.status;
      }
    }
  }
  //FUNCION PARA VISA NAME//
  getVisaNAme(visaTypeId) {
    for (let i = 0; i < this.ca_visaType.length; i++) {
      const element = this.ca_visaType[i];
      if (element.id == visaTypeId) {
        return element.visaCategory;
      }
    }
  }

  Scroll(event) {
    this._services.onScroll(event);
  }

  //*********************************************//
  sendMessage() {
    let item = JSON.parse(localStorage.getItem('data_service'));;
    let immRel = 1;
    this.router.navigate(['assignee-taps/chat/' + item.serviceRecordId + '/' + immRel])
  }
  //*********************************************//
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

  //*******************************************************************//
  serviceScope: any = {
    documentcountries: []
  };
  //CONSULTA DE SCOPE SERVICE DOCUMENTS//
  getServiceScope() {
    let partnerId = Number(localStorage.getItem('partnerID'));
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.workPremit.workOrderServicesId}&client=${partnerId}`).subscribe(resp => {
      if (resp.success) {
        console.log('Data ScopeService: ', resp);
        this.serviceScope = resp.result.value;
      }
    });
  }

  //*****************************************************************//
  viewDoc(doc) {
    this.iab.create(this._services.url_images + doc, '_system')
  }
  //**************************************************************************************************//
  //FUNCION PARA CONSULAR SERVICES//
  viewConsularService(e) {
    console.log(e);
    if (e.detail.checked) {
      this.workPremit.consularServiceId = 1;
    } else {
      this.workPremit.consularServiceId = 2;
    }
  }

}
