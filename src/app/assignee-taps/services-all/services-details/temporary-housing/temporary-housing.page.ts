import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general/general.service';
import { ModalController, NavParams } from '@ionic/angular';
import { DocumentsDialogPage } from 'src/app/dialog/documents-dialog/documents-dialog.page';
import { ConfirmationPage } from 'src/app/dialog/confirmation/confirmation.page';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { LoadingService } from 'src/app/general/loader.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { DocumentRelocationPage } from 'src/app/dialog/document-relocation/document-relocation.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-temporary-housing',
  templateUrl: './temporary-housing.page.html',
  styleUrls: ['./temporary-housing.page.scss'],
})
export class TemporaryHousingPage implements OnInit {

  public addExtension_: boolean = false;
  public addReminder_: boolean = false;
  public addComment_: boolean = false;
  public reminder_data: any = {};
  public comment_data: any = {};
  public entension_data: any = {};

  disabled: boolean = false;
  coordinatos: any = [];
  consultant: any = [];
  constructor(private socialSharing: SocialSharing, private iab: InAppBrowser,private callNumber: CallNumber,public router: Router, public loader: LoadingService, public modalController: ModalController, public _services: GeneralService, private permissionsService: NgxPermissionsService) { }
  //public navParams: NavParams, 
  //***************************************************************************//
  public userData: any = {};
  public show_name_assignee = true;
  ionViewWillEnter() {
    if (window.screen.width <= 500) {
      this.show_name_assignee = true;
    } else {
      this.show_name_assignee = false;
    }
    this.coordinatos = [];
    this.consultant = [];
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
  //CONSULTA DE INFORMACION DEL SERVICIO//
  public temporary_housing: any = {
    documentTemporaryHousingCoordinatons: [],
    stayExtensionTemporaryHousings: [],
    commentTemporaryHosuings: [],
    reminderTemporaryHousingCoordinatons:[]
  };
  public data: any;
  ngOnInit() {
    this.loader.loadingPresent();
    this.getCatalogos();
    //this.data = this.navParams.data;
    this.data = JSON.parse(localStorage.getItem('data_service'));
    this._services.service_general_get(`RelocationServices/GetTemporaryHousingCoordinatonById?id=${this.data.service[0].id}`)
      .subscribe((response: any) => {
        console.log(response);
        if (response.success) {
          console.log(response.result);
          this.temporary_housing = response.result;
          this.getServiceScope();
          this.getDataDependent();
          this.sortData();
          this.getDataHousing();
          this.get_payment();
          this.get_supplierPartner();
          this.loader.loadingDismiss();
        }
      }, (error: any) => {
        console.error('Error => ', error);
      });
    this.loader.loadingDismiss();
  }
  //*************************************************************************//
  serviceScope:any = {
    documentcountries: []
  };
  //CONSULTA DE SCOPE SERVICE DOCUMENTS//
  getServiceScope() {
    let partnerId = Number(localStorage.getItem('partnerID'));
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.temporary_housing.workOrderServicesId}&client=${partnerId }`).subscribe(resp => {
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
     this._services.service_general_get('ServiceOrder/GetDeliverTo?wos=' + this.temporary_housing.workOrderServicesId).subscribe(r => {
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
    return this.temporary_housing.reminderTemporaryHousingCoordinatons.sort((a, b) => {
      return <any>new Date(a.reminderDate) - <any>new Date(b.reminderDate);
    });
  }
  //***************************************************************************//
  //CONSULTA DE INFORMACION DE CATALOGOS//
  ca_estatus = [];
  number = [];
  ca_currency = [];
  responsable_catalogue = [];
  reservation_catalogue = [];
  async getCatalogos() {
    this.reservation_catalogue = await this._services.getCatalogueFrom('GetReservationType');
    this.responsable_catalogue = await this._services.getCatalogueFrom(`GetDependents?sr=${localStorage.getItem('srAd')}`);
    //this.ca_estatus = await this._services.getCatalogueFrom('GetStatus');
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=17").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.ca_estatus = data.result;
      }
    }))
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    for (let index = 0; index < 6; index++) {
      this.number.push(index);
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
  //CONSULTA DE HOUSING LIST//
  services_catalogue = []
  get_supplierPartner() {
    this._services.service_general_get("SupplierPartnerProfile/GetConsultantContactsService?supplierType=1").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.services_catalogue = data.result.value;
      }
    }))
  }
  //***************************************************************************//
  //CONSULTA DE HOUSING LIST//
  public dataSourceHousing = [];
  getDataHousing() {
    this._services.service_general_get('HousingList/GetAllHousing?key=' + Number(this.data.workOrderId)).subscribe((data_housing => {
      if (data_housing.success) {
        console.log('DATA CONSULTA HOUSING LIST: ', data_housing);
        this.dataSourceHousing = data_housing.message;
      }
    }));
  }
  //***************************************************************************//
  //FUNCION PARA CONSULTAR LOS REQUEST PAYMENT//
  payment = [];
  get_payment() {
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.temporary_housing.workOrderServicesId).subscribe((data => {
      if (data.success) {
        this.payment = data.result.value.payments;
        console.log(data);
      }
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
        data.data.temporaryHousingCoordinationId = this.temporary_housing.id;
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
          this._services.service_general_delete('RelocationServices/DeleteDocumentTHC?id=' + id).subscribe(r => {
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
    this.temporary_housing.commentTemporaryHosuings.push({
      "id": 0,
      "temporaryHousingCoordinationId": this.temporary_housing.id,
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
    this.temporary_housing.reminderTemporaryHousingCoordinatons.push({
      "id": 0,
      "temporaryHousingCoordinationId": this.temporary_housing.id,
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
          this._services.service_general_delete('RelocationServices/DeleteReminderTHC?id=' + id).subscribe(r => {
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
          this.temporary_housing.reminderTemporaryHousingCoordinatons.splice(i, 1);
        }
      }
    })
    this.modalController.dismiss();
    await modal.present();
  }
  //***************************************************************************//
  //FUNCION PARA AGREGAR REPLICA//
  addExtension() {
    this.temporary_housing.stayExtensionTemporaryHousings.push({
      "id": 0,
      "temporaryHousingCoordinationId": this.temporary_housing.id,
      "initialDate": this.entension_data.initialDate,
      "finalDate": this.entension_data.finalDate,
      "extraDays": this.entension_data.extraDays,
      "totalDays": 0,
      "comment": this.entension_data.comments,
      "createdBy": this.userData.id,
      "createdDate": new Date(),
      "updateBy": this.userData.id,
      "updatedDate": new Date()
    })
    this.entension_data.initialDate = null;
    this.entension_data.finalDate = null;
    this.entension_data.comments = '';
    this.addExtension_ = false;
  }

  getDaysBetweenDatesStaticField() {
    const date_one: Date = new Date(this.entension_data.initialDate),
      date_two: Date = new Date(this.entension_data.finalDate),
      difference_in_time: any = date_two.getTime() - date_one.getTime(),
      difference_in_days: any = difference_in_time / (1000 * 3600 * 24);
    this.entension_data.totalDays = Math.round(difference_in_days);
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
  //***************************************************************************//
  //FUNCION PARA LOS NOMBRES DE CURRENCY//
  getNameCurrency(id) {
    for (let i = 0; i < this.ca_currency.length; i++) {
      if (this.ca_currency[i].id == id) {
        return this.ca_currency[i].currency;
      }
    }
  }
  //***************************************************************************//
  //FUNCION PARA LOS NOMBRES DE CURRENCY//
  getNamePayment(id) {
    for (let i = 0; i < this.responsable_catalogue.length; i++) {
      if (this.responsable_catalogue[i].id == id) {
        return this.responsable_catalogue[i].name;
      }
    }
  }
  //***************************************************************************//
  //FUNCION PARA GUARDAR INFORMACION//
  save() {
    this.loader.loadingPresent();
    this.temporary_housing.updateBy = this.userData.id;
    this.temporary_housing.documentTemporaryHousingCoordinatons = this.temporalDocument;
    this.temporary_housing.updatedDate = new Date();

    let data_comment_aux = this.temporary_housing.commentTemporaryHosuings;
    this.temporary_housing.commentTemporaryHosuings = [];
    for (let i = 0; i < data_comment_aux.length; i++) {
      if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
        this.temporary_housing.commentTemporaryHosuings.push(data_comment_aux[i]);
      }
    }

    console.log("Informacion a guardar:  ", this.temporary_housing);

    this._services.service_general_put("RelocationServices/PutTemporaryHousingCoordinaton", this.temporary_housing).subscribe((data => {
      if (data.success) {
        this.general_messages({
          title: "Success",
          body: "Temporary Housing Coordination was updated",
          success: true
        });
        this.loader.loadingDismiss();
        this.temporalDocument = [];
        this.ionViewWillEnter();
      }
    }))
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
  //*****************************************************************//
  viewDoc(doc){
    this.iab.create(this._services.url_images+doc,'_system')
  }
}
