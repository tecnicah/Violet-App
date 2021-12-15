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
import { DocumentRelocationPage } from 'src/app/dialog/document-relocation/document-relocation.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-rental-furniture-coordination',
  templateUrl: './rental-furniture-coordination.page.html',
  styleUrls: ['./rental-furniture-coordination.page.scss'],
})
export class RentalFurnitureCoordinationPage implements OnInit {

  constructor(private socialSharing: SocialSharing, private iab: InAppBrowser,public router: Router, private _permissions: NgxPermissionsService, public loader: LoadingService,
    public modalController: ModalController, private callNumber: CallNumber,
    public _services: GeneralService) { }

  //public navParams: NavParams,
  userData: any = {};
  data: any = {};
  caNumbers = [];
  rental: any = {
    documentRentalFurnitureCoordinations: [],
    stayExtensionRentalFurnitureCoordinations: [],
    commentRentalFurnitureCoordinations: [],
    reminderRentalFurnitureCoordinations: [],
    paymentsRentalFurnitureCoordinations: [],
    extensionRentalFurnitureCoordinations: []
  };
  table_payments: any[] = [];
  deliveryTo: any[] = [];
  caCurrency: any[] = [];
  CleaningCompanySupplier: any[] = [];
  main: any[] = [];
  infomain: any[] = [];
  addR_:boolean = false;
  addExtension_: boolean = false;
  entension_data: any = {};
  temporalDocument: any[] = [];
  payments : any = {};
  public coordinatorData: any;
  public consultantData: any;
  public cliente: any;
  public disabled: boolean = false;
  public __userlog__: any = JSON.parse(localStorage.getItem('userData'));
  public type_user: any;
  public show_name_assignee = true;
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
    for (let i = 0; i < 10; i++) {
      this.caNumbers.push(i);
    }
    this.coordinatorData = JSON.parse(localStorage.getItem('relocationCoordinators'));
    this.consultantData = JSON.parse(localStorage.getItem('relocationSupplierPartners'));
    if (this.__userlog__.role.id == 4 || this.__userlog__.role.id == 3) {
      this.disabled = true;
      this.getConsultant();
      this.getCoordinator();
    }
    
  }

  ngOnInit() {
    this.loader.loadingPresent();
    this.getCatalogos();
    this.userData = JSON.parse(localStorage.getItem('userData'));
    //this.data = this.navParams.data;
    this.data = JSON.parse(localStorage.getItem('data_service'));
    console.log(this.data);
    this._services.service_general_get('RelocationServices/GetRentalFurnitureCoordinationById?id=' + this.data.service[0].id).subscribe((data => {
      if (data.success) {
        this.rental = data.result;
        this.getServiceScope();
        this.getDataDependent();
        this.sortData();
        this.loader.loadingDismiss();
        console.log(this.rental);
        this.get_payment();
        this.get_supplierPartner();
        this.getMain();
        this.loader.loadingDismiss();
      }
    }))

    this._services.service_general_get(`ServiceRecord/GetApplicant/${this.data.serviceRecordId}`)
      .subscribe((response: any) => {
        console.log(response);
        if (response.success) {

          this.deliveryTo = response.applicant.value;
        }

      }, (error: any) => {

        console.error('Error (GetApplicant) => ', error);

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
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.rental.workOrderServicesId}&client=${partnerId }`).subscribe(resp => {
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
    this._services.service_general_get('ServiceOrder/GetDeliverTo?wos=' + this.rental.workOrderServicesId).subscribe(r => {
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
    return this.rental.reminderRentalFurnitureCoordinations.sort((a, b) => {
      return <any>new Date(a.reminderDate) - <any>new Date(b.reminderDate);
    });
  }

  //**CONSULTA SUPPLIER PARTNER**//
  get_supplierPartner() {
    this._services.service_general_get("SupplierPartnerProfile/GetSupplierPartnerServiceByServices?workOrderService=" + this.rental.workOrderServicesId + "&supplierType=12&serviceLine=2").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.CleaningCompanySupplier = data.result.value;
      }
    }))
  }

  getMain() {
    this._services.service_general_get("SupplierPartnerProfile/GetAdministrativeContactsServiceBySupplierPartner?workOrderService=" + this.rental.workOrderServicesId + "&supplierPartner=" + this.rental.supplierPartner).subscribe((data => {
      if (data.success) {
        this.main = data.result.value;
        this.getInfoMain();
      }
    }))
  }

  getInfoMain() {
    for (let i = 0; i < this.main.length; i++) {
      if (this.main[i].id == this.rental.mainContact) {
        this.infomain = this.main[i];
        console.log(this.infomain);
      }
    }
  }

  get_payment() {
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.rental.workOrderServicesId).subscribe((data => {
      if (data.success) {
        console.log(data.result);

        this.table_payments = data.result.value.payments;
        console.log(this.table_payments);
      }
      console.log(this.table_payments);
    }))
  }

  addExtension() {
    this.rental.stayExtensionRentalFurnitureCoordinations.push({
      "id": 0,
      "rentalFurnitureCoordinationId": this.rental.id,
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
  //CONSULTA DE CATALOGOS//
  public ca_estatus = [];
  public ca_grade = [];
  public nacionality = [];
  async getCatalogos() {
    this.ca_grade = await this._services.getCatalogueFrom('GetGradeSchooling');
    this.nacionality = await this._services.getCatalogueFrom('GetCountry');
    //this.ca_estatus = await this._services.getCatalogueFrom('GetStatus');
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=18").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.ca_estatus = data.result;
      }
    }))
    this.caCurrency = await this._services.getCatalogueFrom('GetCurrency');
  }

  async addDocument() {
    const modal = await this.modalController.create({
      component: DocumentRelocationPage,
      componentProps: { id: 1 },
      backdropDismiss: true,
    });

    modal.onDidDismiss().then((data: any) => {
      console.log(data);
      if (data.data.success) {
        data.data.rentalFurnitureCoordinationId = this.rental.id;
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
          this._services.service_general_delete('RelocationServices/DeleteDocumentRFC?id=' + id).subscribe(r => {
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

  //FUNCION PARA AGREGAR REPLICA//
  comment_data: any = {};
  addComment_: boolean = false;
  addComment() {
    this.rental.commentRentalFurnitureCoordinations.push({
      "id": 0,
      "rentalFurnitureCoordinationId": this.rental.id,
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
  reminder_data: any = {};
  addReminder_: boolean = false;
  addReminder() {
    this.rental.reminderRentalFurnitureCoordinations.push({
      "id": 0,
      "rentalFurnitureCoordinationId": this.rental.id,
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
          this._services.service_general_delete('RelocationServices/DeleteReminderRFC?id=' + id).subscribe(r => {
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
          this.rental.reminderRentalFurnitureCoordinations.splice(i, 1);
        }
      }
    })
    this.modalController.dismiss();
    await modal.present();
  }

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
  //FUNCION PARA GUARDAR INFORMACION//
  save() {
    this.loader.loadingPresent();
    this.rental.updateBy = this.userData.id;
    this.rental.documentRentalFurnitureCoordinations = this.temporalDocument;
    this.rental.updatedDate = new Date();

    let data_comment_aux = this.rental.commentRentalFurnitureCoordinations;
    this.rental.commentRentalFurnitureCoordinations = [];
    for (let i = 0; i < data_comment_aux.length; i++) {
      if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
        this.rental.commentRentalFurnitureCoordinations.push(data_comment_aux[i]);
      }
    }

    console.log("Informacion a guardar:  ", this.rental);

    this._services.service_general_put("RelocationServices/PutRentalFurnitureCoordinaton", this.rental).subscribe((data => {
      if (data.success) {
        this.general_messages({
          title: "Success",
          body: "Rental Forniture Coordination was updated",
          success: true
        });
        this.loader.loadingDismiss();
        this.temporalDocument = [];
        this.ionViewWillEnter();
      }
    }))
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
  //*********************************************//
  addPayment(){
    this.rental.paymentsRentalFurnitureCoordinations.push({
      "id": 0,
      "rentalFurnitureCoordinationId": this.rental.id,
      "paymentType": this.payments.paymentType,
      "paymentResponsibility": this.payments.paymentResponsibility,
      "createdBy": this.userData.id,
      "createdDate": new Date()
    })
    this.payments.paymentType = null;
    this.payments.paymentResponsibility = '';
    this.addR_ = false;
  }
  //*****************************************************************//
  viewDoc(doc){
    this.iab.create(this._services.url_images+doc,'_system')
  }
}
