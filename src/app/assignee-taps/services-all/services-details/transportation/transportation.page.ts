import { Component, OnInit } from '@angular/core';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { ConfirmationPage } from 'src/app/dialog/confirmation/confirmation.page';
import { DocumentsDialogPage } from 'src/app/dialog/documents-dialog/documents-dialog.page';
import { NavParams, ModalController } from '@ionic/angular';
import { GeneralService } from 'src/app/general/general.service';
import { LoadingService } from 'src/app/general/loader.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { DocumentRelocationPage } from 'src/app/dialog/document-relocation/document-relocation.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-transportation',
  templateUrl: './transportation.page.html',
  styleUrls: ['./transportation.page.scss'],
})
export class TransportationPage implements OnInit {

  disabled: boolean = false;
  coordinatos: any = [];
  consultant: any = [];
  constructor(private socialSharing: SocialSharing, private iab: InAppBrowser,private callNumber: CallNumber,public router: Router, public loader: LoadingService, public modalController: ModalController, public _services: GeneralService, private permissionsService: NgxPermissionsService) { }
  //public navParams: NavParams,
  public addReminder_: boolean = false;
  public addComment_: boolean = false;
  public userData: any = {};
  public reminder_data: any = {};
  public comment_data: any = {};
  public dataSourceHousing: any[] = [];
  public dataSourceSchool: any[] = [];
  public family: any[] = [];
  public show_name_assignee = true;
  //***************************************************************************//
  ionViewWillEnter() {
    this.coordinatos = [];
    this.consultant = [];
    if (window.screen.width <= 500) {
      this.show_name_assignee = true;
    } else {
      this.show_name_assignee = false;
    }
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.permissionsService.loadPermissions([this.userData.role.id]);
    if (this.userData.role.id == 4 || this.userData.role.id == 3) {
      this.disabled = true;
    }
    this.ngOnInit();
    let coordi = JSON.parse(localStorage.getItem('relocationCoordinators'));
    let consult = JSON.parse(localStorage.getItem('relocationSupplierPartners'));

    for (let i = 0; i < coordi.length; i++) {
      const element = coordi[i];
      this._services.service_general_get('Catalog/GetUser/' + element.coordinatorId).subscribe(r => {
        if (r.success) {
          this.coordinatos.push(r.result.value);
        }
      })
    }

    for (let i = 0; i < consult.length; i++) {
      const element = consult[i];
      this._services.service_general_get('Catalog/GetUser/' + element.supplierId).subscribe(r => {
        if (r.success) {
          this.consultant.push(r.result.value);
        }
      })
    }

    console.log(this.coordinatos, this.consultant);

  }
  //***************************************************************************//
  //CONSULTA DATA GLOBAL SERVICIO//
  public transportation: any = {
    documentTransportations: [],
    commentTransportations: [],
    reminderTransportations:[],
    extensionTransportations:[],
    transportService: [{
      budget: '',
      totalTimeAllowed: '',
      totalTimeAllowedId: 0
    }],

  };
  public dataSourceP = [];
  public data: any = {};
  ngOnInit() {
    this.loader.loadingPresent();
    this.getCatalogos();
    //this.data = this.navParams.data;
    this.data = JSON.parse(localStorage.getItem('data_service'));
    this._services.service_general_get('RelocationServices/GetTransportationById?applicatId=' + this.data.deliveredToId + '&service_order_id=' + this.data.workOrderId + '&type_service=' + this.data.type).subscribe((data => {
      if (data.success) {
        this.transportation = data.result.value[0];
        this.getDataDependent();
        this.getServiceScope();
        this.sortData();
        for (let i = 0; i < this.transportation.transportService.length; i++) {
          this.transportation.transportService[i].family = [];
          if (this.transportation.transportService[i].familyMemberTransportations.length > 0) {
            for (let j = 0; j < this.transportation.transportService[i].familyMemberTransportations.length; j++) {
              this.transportation.transportService[i].family.push(this.transportation.transportService[i].familyMemberTransportations[j].familyMember)
            }
          }
        }
        console.log('DATA CONSULTA FINAL: ', this.transportation);
        this.dataSourceP = this.transportation.paymentTransportations;
        this.getPayment();
        this._services.service_general_get('Catalogue/GetDependents?sr=' + Number(localStorage.getItem('srAd'))).subscribe((data_ => {
          if (data_.success) {
            this.family = data_.result;
            console.log(this.family);
          }
        }))
        this.get_SupplierType();
      }
      this.loader.loadingDismiss();
    }));
  }
  //*************************************************************************//
  serviceScope:any = {
    documentcountries: []
  };
  //CONSULTA DE SCOPE SERVICE DOCUMENTS//
  getServiceScope() {
    let partnerId = Number(localStorage.getItem('partnerID'));
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.transportation.transportService[0].workOrderServicesId}&client=${partnerId }`).subscribe(resp => {
      if (resp.success) {
        console.log('Data ScopeService: ', resp);
        this.serviceScope = resp.result.value;
      }
    });
  }
  //*********************************************//
  //CONSULTA DE INFORMACION DEL DEPENDENT//
  public data_dependent:any;
  getDataDependent(){
    this._services.service_general_get('ServiceOrder/GetDeliverTo?wos=' + this.transportation.transportService[0].workOrderServicesId).subscribe(r => {
      if (r.success) {
        this.data_dependent = r.result.value;
        console.log(this.data_dependent);
        this.loader.loadingDismiss();
      }
    })
  }
  //*********************************************//
  //SORT REMINDER//
  sortData() {
    return this.transportation.reminderTransportations.sort((a, b) => {
      return <any>new Date(a.reminderDate) - <any>new Date(b.reminderDate);
    });
  }
  //***************************************************************************//
  //CONSULTA DE CATALOGOS//
  public ca_estatus = [];
  public ca_requestType = [];
  public nacionality = [];
  public ca_document = [];
  public ca_duracion = [];
  public ca_transportType = [];
  public ca_supplier = [];
  public caNumbers: any[] = [];
  public Numbers: any[] = [];
  public caNumbersMin: any[] = [];
  async getCatalogos() {
    //this.ca_estatus = await this._services.getCatalogueFrom('GetStatus');
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=19").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.ca_estatus = data.result;
      }
    }))
    this.ca_requestType = await this._services.getCatalogueFrom('GetRequestType');
    this.nacionality = await this._services.getCatalogueFrom('GetCountry');
    this.ca_document = await this._services.getCatalogueFrom('GetDocumentType');
    this.ca_duracion = await this._services.getCatalogueFrom('GetDuration');
    this.ca_transportType = await this._services.getCatalogueFrom('GetTransportType');
    this.ca_supplier = await this._services.getCatalogueFrom('GetSupplier');

    for (let i = 1; i < 24; i++) {
      this.Numbers.push(i)
    }
    for (let i = 1; i < 24; i++) {
      this.caNumbers.push(i + ' hr')
    }
    for (let i = 1; i < 60; i++) {
      this.caNumbersMin.push(i + ' min');
    }
  }

  getStatusName(statusId) {
    for (let i = 0; i < this.ca_estatus.length; i++) {
      const element = this.ca_estatus[i];
      if (element.id == statusId) {
        return element.status;
      }
    }
  }
  //***************************************************************************//
  //CONSULTA DE  REQUEST PAYMENTS//
  public payment: any[] = [];
  getPayment() {
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.transportation.transportService[0].workOrderServicesId).subscribe((data => {
      if (data.success) {
        console.log(data.result);
        this.payment = data.result.value.payments;
        console.log(this.payment);
      }
      console.log(this.payment);
    }))
  }
  //***************************************************************************//
  //CONSULTA DEL SUPPLIER//
  public supplier_get = [];
  get_SupplierType() {
    this._services.service_general_get('SupplierPartnerProfile/GetSupplierPartnerServiceByServices?workOrderService=' + this.transportation.transportService[0].workOrderServicesId + '&supplierType=' + 10 + '&serviceLine=2').subscribe(r => {
      if (r.success) {
        this.supplier_get = r.result.value;
        console.log(this.supplier_get);
        this.getInfo();
      }
    })
  }
  //***************************************************************************//
  public info = [];
  //CONSULTA DE INFORMACION PARA MODAL//
  getInfo() {
    for (let i = 0; i < this.supplier_get.length; i++) {
      if (this.supplier_get[i].id == this.transportation.transportService[0].supplierPartner) {
        this.info = this.supplier_get[i];
        console.log(this.info);
      }
    }
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
        data.data.transportationId = this.transportation.transportService[0].id;
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
          this._services.service_general_delete('RelocationServices/DeleteDocumentT?id=' + id).subscribe(r => {
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
  addComment() {
    this.transportation.commentTransportations.push({
      "id": 0,
      "transportationId": this.transportation.transportService[0].id,
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
  //***************************************************************************//
  //FUNCION PARA AGREGAR REPLICA//
  addReminder() {
    this.transportation.reminderTransportations.push({
      "id": 0,
      "transportationId": this.transportation.transportService[0].id,
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
          this._services.service_general_delete('RelocationServices/DeleteReminderT?id=' + id).subscribe(r => {
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
          this.transportation.reminderTransportations.splice(i, 1);
        }
      }
    })
    this.modalController.dismiss();
    await modal.present();
  }
  //***************************************************************************//
  //NACIONALITY//
  getNacionality(id) {
    for (let i = 0; i < this.nacionality.length; i++) {
      if (this.nacionality[i].id == id) {
        return this.nacionality[i].name;
      }
    }
  }
  //***************************************************************************//
  //FUNCION PARA GUARDAR INFORMACION//
  save() {
    this.loader.loadingPresent();
    this.transportation.documentTransportations = this.temporalDocument;
    for (let i = 0; i < this.transportation.transportService.length; i++) {
      this.transportation.transportService[i].documentTransportations = this.temporalDocument;
      this.transportation.transportService[i].reminderTransportations = this.transportation.reminderTransportations;

      this.transportation.transportService[i].updateBy = this.userData.id;
      this.transportation.transportService[i].updatedDate = new Date();
      this.transportation.transportService[i].createdBy = this.userData.id;
      this.transportation.transportService[i].createdDate = new Date();
      this.transportation.transportService[i].authoDateExtension = new Date();
      this.transportation.transportService[i].authoAcceptanceDateExtension = new Date();

      if (this.transportation.transportService[i].family != undefined && this.transportation.transportService[i].family.length > 0) {
        this.transportation.transportService[i].familyMemberTransportations = [];
        for (let j = 0; j < this.transportation.transportService[i].family.length; j++) {
          this.transportation.transportService[i].familyMemberTransportations.push({
            "transportService": this.transportation.transportService[i].id,
            "familyMember": this.transportation.transportService[i].family[j]
          })
        }
      }

      let data_comment_aux = this.transportation.commentTransportations;
      this.transportation.transportService[i].commentTransportations = [];

      for (let k = 0; k < data_comment_aux.length; k++) {
        if (data_comment_aux[k].reply != null && data_comment_aux[k].reply != undefined && data_comment_aux[k].reply.trim() != '') {
          this.transportation.transportService[i].commentTransportations.push(data_comment_aux[k]);
        }
      }
    }
    console.log("SAVE INFORMATION: ", this.transportation);

    this._services.service_general_put("RelocationServices/PutTransportation", this.transportation.transportService).subscribe((data => {
      if (data.success) {
        console.log(data);
        this.general_messages({
          title: "Success",
          body: "Transportation was updated",
          success: true
        });
        this.loader.loadingDismiss();
        this.temporalDocument = [];
        this.ionViewWillEnter();
      }
    }))
  }
  //***************************************************************************//
  //FUNCION PARA GUARDAR INFORMACION//
  back() {
    /*
   let back: any = document.getElementById('back');
   back.play();
   this.modalController.dismiss();
   */
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

  Scroll(event) {
    this._services.onScroll(event);
  }

  //*********************************************//
  sendMessage() {
    let item = JSON.parse(localStorage.getItem('data_service'));;
    let immRel = 2;
    this.router.navigate(['assignee-taps/chat/' + item.serviceRecordId + '/' + immRel])
  }
  //*********************************************//
  async call(number, message) {
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
    console.log("Entra a llamar");
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
  //*****************************************************************//
  viewDoc(doc){
    this.iab.create(this._services.url_images+doc,'_system')
  }
}
