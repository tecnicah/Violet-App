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
  selector: 'app-airport-transportation',
  templateUrl: './airport-transportation.page.html',
  styleUrls: ['./airport-transportation.page.scss'],
})
export class AirportTransportationPage implements OnInit {

  constructor(private socialSharing: SocialSharing, private iab: InAppBrowser,private callNumber: CallNumber, public router: Router, private _permissions: NgxPermissionsService, public loader: LoadingService, public modalController: ModalController, public _services: GeneralService) { }
  //public navParams: NavParams,
  public addReminder_: boolean = false;
  public addComment_: boolean = false;
  public userData: any = {};
  public reminder_data: any = {};
  public comment_data: any = {};
  public dataSourceHousing: any[] = [];
  public dataSourceSchool: any[] = [];
  public family: any[] = [];
  public coordinatorData: any;
  public consultantData: any;
  public cliente: any;
  public show_name_assignee = true;
  public disabled: boolean = false;
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
  public transportation: any = {
    documentAirportTransportationServices: [],
    commentAirportTransportationServices: [],
    reminderAirportTransportationServices: [],
    extensionAirportTransportationServices: []
  };
  public dataSourceP = [];
  public data: any = {};
  ngOnInit() {
    this.loader.loadingPresent();
    this.getCatalogos();
    //this.data = this.navParams.data;
    this.data = JSON.parse(localStorage.getItem('data_service'));
    this._services.service_general_get('RelocationServices/GetAirportTransportationServicesById?applicatId=' + this.data.deliveredToId + '&service_order_id=' + this.data.workOrderId + '&type_service=' + this.data.type).subscribe((data => {
      if (data.success) {
        this.transportation = data.result.value[0];
        this.getDataDependent();
        this.getServiceScope();
        this.sortData();
        for (let i = 0; i < this.transportation.transportService.length; i++) {
          this.transportation.transportService[i].family = [];
          if (this.transportation.transportService[i].familyMemberTransportServices.length > 0) {
            for (let j = 0; j < this.transportation.transportService[i].familyMemberTransportServices.length; j++) {
              this.transportation.transportService[i].family.push(this.transportation.transportService[i].familyMemberTransportServices[j].familyMember)
            }
          }
        }
        console.log('DATA CONSULTA FINAL: ', this.transportation);
        this.dataSourceP = this.transportation.paymentTransportations;
        this.loader.loadingDismiss();
        this.getPayment();
        this._services.service_general_get('Catalogue/GetDependents?sr=' + Number(localStorage.getItem('srAd'))).subscribe((data_ => {
          if (data_.success) {
            this.family = data_.result;
            console.log(this.family);
          }
        }))
        this.loader.loadingDismiss();
        this.get_SupplierType();
      }
    }));
    this.loader.loadingDismiss();
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
  //**************************************************************************//
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
  //**************************************************************************//
  //SORT REMINDER//
  sortData() {
    return this.transportation.reminderAirportTransportationServices.sort((a, b) => {
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
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=20").subscribe((data => {
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
        data.data.airportTransportationServicesId = this.transportation.transportService[0].id;
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
          this._services.service_general_delete('RelocationServices/DeleteDocumentATS?id=' + id).subscribe(r => {
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
    this.transportation.commentAirportTransportationServices.push({
      "id": 0,
      "airportTransportationServicesId": this.transportation.transportService[0].id,
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
    this.transportation.reminderAirportTransportationServices.push({
      "id": 0,
      "airportTransportationServicesId": this.transportation.transportService[0].id,
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
          this._services.service_general_delete('RelocationServices/DeleteReminderATS?id=' + id).subscribe(r => {
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
          this.transportation.reminderAirportTransportationServices.splice(i, 1);
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
    this.transportation.documentAirportTransportationServices = this.temporalDocument;
    for (let i = 0; i < this.transportation.transportService.length; i++) {
      this.transportation.transportService[i].documentAirportTransportationServices = this.temporalDocument;
      this.transportation.transportService[i].reminderAirportTransportationServices = this.transportation.reminderAirportTransportationServices;

      this.transportation.transportService[i].updateBy = this.userData.id;
      this.transportation.transportService[i].updatedDate = new Date();
      this.transportation.transportService[i].createdBy = this.userData.id;
      this.transportation.transportService[i].createdDate = new Date();
      this.transportation.transportService[i].authoDateExtension = new Date();
      this.transportation.transportService[i].authoAcceptanceDateExtension = new Date();

      if (this.transportation.transportService[i].family != undefined && this.transportation.transportService[i].family.length > 0) {
        this.transportation.transportService[i].familyMemberTransportServices = [];
        for (let j = 0; j < this.transportation.transportService[i].family.length; j++) {
          this.transportation.transportService[i].familyMemberTransportServices.push({
            "transportService": this.transportation.transportService[i].id,
            "familyMember": this.transportation.transportService[i].family[j]
          })
        }
      }

      let data_comment_aux = this.transportation.commentAirportTransportationServices;
      this.transportation.transportService[i].commentAirportTransportationServices = [];

      for (let k = 0; k < data_comment_aux.length; k++) {
        if (data_comment_aux[k].reply != null && data_comment_aux[k].reply != undefined && data_comment_aux[k].reply.trim() != '') {
          this.transportation.transportService[i].commentAirportTransportationServices.push(data_comment_aux[k]);
        }
      }
    }
    console.log("SAVE INFORMATION: ", this.transportation);

    this._services.service_general_put("RelocationServices/PutAirportTransportationServices", this.transportation.transportService).subscribe((data => {
      if (data.success) {
        console.log(data);
        this.general_messages({
          title: "Success",
          body: "Airport Transportation Services was updated",
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
    if (number != null && number != '' && number != undefined) {
      const modal = await this.modalController.create({
        component: ConfirmationPage,
        cssClass: 'modal-general-confirm',
        componentProps: {
          header: "Message",
          body: "Send message to" + message + "?",
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
  //*********************************************//
  viewDoc(doc){
    this.iab.create(this._services.url_images+doc,'_system')
  }
}
