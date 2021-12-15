import { Component, OnInit } from '@angular/core';
import { PaymentsPage } from '../dialogs/payments/payments.page';
import { RenewalDetailsPage } from '../dialogs/renewal-details/renewal-details.page';
import { DepartureDetailsPage } from '../dialogs/departure-details/departure-details.page';
import { ContractDetailsPage } from '../dialogs/contract-details/contract-details.page';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { ConfirmationPage } from 'src/app/dialog/confirmation/confirmation.page';
import { DocumentsDialogPage } from 'src/app/dialog/documents-dialog/documents-dialog.page';
import { NavParams, ModalController } from '@ionic/angular';
import { GeneralService } from 'src/app/general/general.service';
import { InspectionsRepairsPage } from '../dialogs/inspections-repairs/inspections-repairs.page';
import { CostSavingsPage } from '../dialogs/cost-savings/cost-savings.page';
import { LandlordDetailsPage } from '../dialogs/landlord-details/landlord-details.page';
import { MoveInPage } from '../dialogs/move-in/move-in.page';
import { MoveOutPage } from '../dialogs/move-out/move-out.page';
import { LoadingService } from 'src/app/general/loader.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { DocumentRelocationPage } from 'src/app/dialog/document-relocation/document-relocation.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-departure',
  templateUrl: './departure.page.html',
  styleUrls: ['./departure.page.scss'],
})
export class DeparturePage implements OnInit {

  constructor(private socialSharing: SocialSharing,private iab: InAppBrowser,private callNumber: CallNumber,public router: Router, private _permissions: NgxPermissionsService, public loader: LoadingService, public modalController: ModalController, public _services: GeneralService) { }
  //public navParams: NavParams,
  public addReminder_: boolean = false;
  public addComment_: boolean = false;
  public userData: any = {};
  public reminder_data: any = {};
  public comment_data: any = {};
  public family: any[] = [];
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
  public departure: any = {
    documentDepartures: [],
    reminderDepartures: [],
    commentDepartures: [],
    extensionDepartures: []
  };
  public dataSourceP = [];
  public data: any = {};
  ngOnInit() {
    this.loader.loadingPresent();
    this.getCatalogos();
    //this.data = this.navParams.data;
    this.data = JSON.parse(localStorage.getItem('data_service'));
  }
  //***************************************************************************//
  //CONSULTA DE CATALOGOS//
  public ca_accountType = [];
  public ca_payment_Type = [];
  public ca_responsible = [];
  public ca_recurrence = [];
  public ca_statuspropertySection = [];
  public ca_propertySection = [];
  public ca_relation = [];
  public ca_repair = [];
  public SupplierCompany = []
  public ca_property = [];
  public ca_estatus: any[] = [];
  public ca_currency: any[] = [];
  public ca_requestType: any[] = [];
  public ca_accounttype: any[] = [];
  public ca_leaseTemplate: any[] = [];
  public ca_creditCard: any[] = [];
  public nacionality: any[] = [];
  public ca_document: any[] = [];
  public ca_asistance: any[] = [];
  public ca_supplier = [];
  async getCatalogos() {
    this.ca_statuspropertySection = await this._services.getCatalogueFrom('GetStatusPropertySection'); //
    //this.ca_estatus = await this._services.getCatalogueFrom('GetStatus');
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=16").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.ca_estatus = data.result;
      }
    }))
    this.ca_requestType = await this._services.getCatalogueFrom('GetRequestType');
    this.nacionality = await this._services.getCatalogueFrom('GetCountry');
    this.ca_document = await this._services.getCatalogueFrom('GetDocumentType');
    this.ca_propertySection = await this._services.getCatalogueFrom('GetPropertySection');
    this.ca_relation = await this._services.getCatalogueFrom('GetRelationship');
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    this.ca_property = await this._services.getCatalogueFrom('GetPropertyTypeHousing');
    this.ca_repair = await this._services.getCatalogueFrom('GetRepairType');
    this.ca_supplier = await this._services.getCatalogueFrom('GetSupplier');
    this.ca_asistance = await this._services.getCatalogueFrom('GetAssistanceWith');
    let duration = await this._services.getCatalogueFrom('GetDuration');
    this.ca_recurrence = duration.filter(function (E) {
      if (E.recurrence != null) {
        return true;
      }
    });
    // credit card se agrego
    this.ca_creditCard = await this._services.getCatalogueFrom('GetCreditCard');

    // credit card se agrego
    this.ca_accountType = await this._services.getCatalogueFrom('GetBankAccountType');
    this.ca_creditCard = await this._services.getCatalogueFrom('GetCreditCard');
    this.ca_creditCard.forEach(E => {
      E.checked = false;
    });
    this.ca_payment_Type = await this._services.getCatalogueFrom('GetPaymentType');
    this.ca_responsible = await this._services.getCatalogueFrom('GetResponsablePayment');
    this._services.service_general_get('Catalogue/GetSupplierCompany?id=2').subscribe(r => {
      if (r.success) {
        for (let i = 0; i < r.result.length; i++) {
          const element = r.result[i];
          this.SupplierCompany.push(element)
        }
      }
    });

    this._services.service_general_get('Catalogue/GetSupplierCompany?id=5').subscribe(r => {
      if (r.success) {
        for (let i = 0; i < r.result.length; i++) {
          const element = r.result[i];
          this.SupplierCompany.push(element)
        }
      }
    });
    this._services.service_general_get('RelocationServices/GetDepartureById?id=' + this.data.service[0].id).subscribe(data => {
      if (data.success) {
        console.log('DATA CONSULTA: ', data);
        this.departure = data.result;
        this.getServiceScope();
        this.getDataDependent();
        this.sortData();
        this.loader.loadingDismiss();
        let data_assistance = [];
        for (let i = 0; i < this.ca_asistance.length; i++) {
          const element = this.ca_asistance[i];
          this.ca_asistance[i].id_other = 1;
          if (this.ca_asistance[i].id == 4) {
            this.ca_asistance.splice(i, 1);
          }
        }
        for (let i = 0; i < this.departure.departureAssistanceWiths.length; i++) {
          const element = this.departure.departureAssistanceWiths[i];
          for (let j = 0; j < this.ca_asistance.length; j++) {
            if (element.completionDate != '' && element.completionDate != undefined && element.completionDate != null && element.assistanceWith == this.ca_asistance[j].id) {
              this.ca_asistance[j].check = true;
              this.ca_asistance[j].completionDate = element.completionDate;
              this.ca_asistance[j].other = element.otherSpecify;
              this.ca_asistance[j].departaureId = this.departure.id;
              this.ca_asistance[j].idDB = this.departure.departureAssistanceWiths[i].id;
              this.ca_asistance[j].assistanceWith = this.ca_asistance[j].id;
            }
          }

          if (this.departure.departureAssistanceWiths[i].assistanceWith == 4) {
            data_assistance.push({
              "assistance": "Other",
              "completionDate": element.completionDate,
              "createdBy": null,
              "createdDate": null,
              "id": 4,
              "check": true,
              "other": element.otherSpecify,
              "updateBy": null,
              "updatedDate": null
            })
          }
        }
        for (let i = 0; i < data_assistance.length; i++) {
          this.ca_asistance.push(data_assistance[i]);
        }
        this.get_dependent();
        this.getDataHousing();
        this.getPayment();
        this.loader.loadingDismiss();
      }
    });
  }
  //*************************************************************************//
  serviceScope:any = {
    documentcountries: []
  };
  //CONSULTA DE SCOPE SERVICE DOCUMENTS//
  getServiceScope() {
    let partnerId = Number(localStorage.getItem('partnerID'));
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.departure.workOrderServicesId}&client=${partnerId }`).subscribe(resp => {
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
    this._services.service_general_get('ServiceOrder/GetDeliverTo?wos=' + this.departure.workOrderServicesId).subscribe(r => {
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
    return this.departure.reminderDepartures.sort((a, b) => {
      return <any>new Date(a.reminderDate) - <any>new Date(b.reminderDate);
    });
  }
  //***************************************************************************//
  //CONSULTA DE  REQUEST PAYMENTS//
  public payment: any[] = [];
  getPayment() {
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.departure.workOrderServicesId).subscribe((data => {
      if (data.success) {
        console.log(data.result);
        this.payment = data.result.value.payments;
        console.log(this.payment);
      }
      //console.log(this.payment);
    }))
  }
  //***************************************************************************//
  //CONSULTA DEL DEPENDIENTE//
  public ca_dependent = [];
  get_dependent() {
    this._services.service_general_get('Catalogue/GetDependents?sr=' + Number(localStorage.getItem('srAd'))).subscribe(data => {
      if (data.success) {
        console.log('DATA CONSULTA: ', data);
        this.ca_dependent = data.result;
      }
    });
  }
  //***************************************************************************//
  //DATA TABLE HOUSING//
  public dataSourceHousing = [];
  getDataHousing() {
    this._services.service_general_get('HousingList/GetAllHousing?key=' + Number(this.data.workOrderId)).subscribe((data_housing) => { //this.area_orientation.workOrderServicesId
      if (data_housing.success) {
        console.log('DATA CONSULTA HOUSING LIST: ', data_housing);
        this.dataSourceHousing = data_housing.message;
        this.permanent_home(this.dataSourceHousing);
      }
    });
  }
  //***************************************************************************//
  //**PERMANENT HOME**//
  public permanentHome: any;
  public data_inspection = [];
  public data_repairs = [];
  public data_home = [];

  //VARIABLES PARA LEASER SUMMARY//
  data_contracts: any = {};
  paymentHousings = [];
  costSavingHomes = [];
  data_renewal: any = {}
  data_departure: any = {}
  data_land: any = {
    creditCardLandLordDetails: []
  };
  //VARIABLES PARA INSECTIONS & REPAIRS//
  data_move_in: any = {
    propertyReportSections: [],
    keyInventories: [],
    attendees: []
  };
  data_move_out: any = {
    propertyReportSections: [],
    keyInventories: [],
    attendees: []
  };

  permanent_home(data) {
    let permanentHome = data.filter(function (E) {
      if (E.status == "Permanent Home") {
        return true;
      }
    })
    console.log(permanentHome);
    this.data_home = permanentHome;
    for (let i = 0; i < permanentHome.length; i++) {
      this._services.service_general_get("HousingList/GetHousing?key=" + permanentHome[i].id).subscribe((data => {
        this.permanentHome = data.result;
        console.log('esta es la casa permanente: ', this.permanentHome);
        this.data_contracts = this.permanentHome.contractDetail;
        this.paymentHousings = this.permanentHome.paymentHousings;
        this.costSavingHomes = this.permanentHome.costSavingHomes;
        this.data_renewal = this.permanentHome.renewalDetailHome;
        this.data_departure = this.permanentHome.departureDetailsHome;
        this.data_land = this.permanentHome.landlordDetailsHome;
        if (this.data_land.creditCardLandLordDetails) {
          this.ca_creditCard.forEach(E => {
            for (let i = 0; i < this.data_land.creditCardLandLordDetails.length; i++) {
              if (this.data_land.creditCardLandLordDetails[i].creditCard == E.id) {
                E.checked = true;
              }
            }
          })
        }
        if (this.permanentHome.propertyReports) {
          for (let i = 0; i < this.permanentHome.propertyReports.length; i++) {
            if (this.permanentHome.propertyReports[i].propertyInspection == 1) {
              this.data_move_in = this.permanentHome.propertyReports[i];
            }
            if (this.permanentHome.propertyReports[i].propertyInspection == 2) {
              this.data_move_out = this.permanentHome.propertyReports[i];
            }
          }
          //console.log(this.data_move_in);
        }
        this.data_inspection = this.permanentHome.inspections;
        this.data_repairs = this.permanentHome.repairs;
        this.loader.loadingDismiss();
      }))
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
        data.data.departaureId = this.departure.id;
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
          this._services.service_general_delete('RelocationServices/DeleteDocumentD?id=' + id).subscribe(r => {
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
    this.departure.commentDepartures.push({
      "id": 0,
      "departaureId": this.departure.id,
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
    this.departure.reminderDepartures.push({
      "id": 0,
      "departaureId": this.departure.id,
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
          this._services.service_general_delete('RelocationServices/DeleteReminderD?id=' + id).subscribe(r => {
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
          this.departure.reminderDepartures.splice(i, 1);
        }
      }
    })
    this.modalController.dismiss();
    await modal.present();
  }
  //***************************************************************************//
  //FUNCIONES PARA TRADUCCION DE ID'S//
  getProperty_(id) {
    for (let i = 0; i < this.ca_property.length; i++) {
      if (this.ca_property[i].id == id) {
        return this.ca_property[i].propertyType;
      }
    }
  }
  getCurrency(id) {
    for (let i = 0; i < this.ca_currency.length; i++) {
      if (this.ca_currency[i].id == id) {
        return this.ca_currency[i].currency;
      }
    }
  }
  //Payment//
  get_Payment(id) {
    for (let i = 0; i < this.ca_payment_Type.length; i++) {
      if (this.ca_payment_Type[i].id == id) {
        return this.ca_payment_Type[i].paymentType;
      }
    }
  }
  //Responsable//
  getResponsable(id) {
    for (let i = 0; i < this.ca_responsible.length; i++) {
      if (this.ca_responsible[i].id == id) {
        return this.ca_responsible[i].responsable;
      }
    }
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
    this.departure.updateBy = this.userData.id;
    this.departure.updatedDate = new Date();
    this.departure.createdBy = this.userData.id;
    this.departure.createdDate = new Date();
    this.departure.documentDepartures = this.temporalDocument;
    this.temporalDocument = [];
    for (let i = 0; i < this.ca_asistance.length; i++) {
      const element = this.ca_asistance[i];
      this.ca_asistance[i].assistanceWith = this.ca_asistance[i].id;
      if (this.ca_asistance[i].idDB != undefined) {
        this.ca_asistance[i].id = this.ca_asistance[i].idDB;
      } else {
        this.ca_asistance[i].id = 0;
      }

      if (this.ca_asistance[i].check != true) {
        this.ca_asistance.splice(i, 1);
      } else {
        this.ca_asistance[i].departaureId = this.departure.id;
      }

    }
    this.departure.departureAssistanceWiths = this.ca_asistance;
    let data_comment_aux = this.departure.commentDepartures;
    this.departure.commentDepartures = [];
    for (let i = 0; i < data_comment_aux.length; i++) {
      if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
        this.departure.commentDepartures.push(data_comment_aux[i]);
      }
    }


    console.log("SAVED DATA: ", this.departure);
    this._services.service_general_put("RelocationServices/PutDeparture", this.departure).subscribe((data => {
      if (data.success) {
        console.log(data);
        this.general_messages({
          title: "Success",
          body: "Home finding was updated",
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
  //***************************************************************************//
  //FUNCIONES PARA MODALES DE LEASE SUMMARY//
  async contractDetails() {
    localStorage.setItem('contractDetails', JSON.stringify(this.data_contracts));
    const modal = await this.modalController.create({
      component: ContractDetailsPage,
      backdropDismiss: true,
    });

    modal.onDidDismiss().then((data: any) => {
      console.log(data);
      localStorage.removeItem('contractDetails');
      this.ionViewWillEnter();
    })
    this.modalController.dismiss();
    await modal.present();
  }
  //FUNCIONES PARA DEPARTURE DETAILS//
  async departureDetails() {
    localStorage.setItem('departure', JSON.stringify(this.data_departure));
    const modal = await this.modalController.create({
      component: DepartureDetailsPage,
      backdropDismiss: true,
    });

    modal.onDidDismiss().then((data: any) => {
      console.log(data);
      localStorage.removeItem('departure');
      this.ionViewWillEnter();
    })
    this.modalController.dismiss();
    await modal.present();
  }
  //FUNCIONES PARA MRENEWAL//
  async renewalDetails() {
    localStorage.setItem("renewal", JSON.stringify(this.data_renewal));
    const modal = await this.modalController.create({
      component: RenewalDetailsPage,
      backdropDismiss: true,
    });

    modal.onDidDismiss().then((data: any) => {
      console.log(data);
      localStorage.removeItem('renewal');
      this.ionViewWillEnter();
    })
    this.modalController.dismiss();
    await modal.present();
  }
  //FUNCIONES PARA PAYMENTS//
  async payments() {
    localStorage.setItem('id', JSON.stringify(this.permanentHome.id));
    localStorage.setItem('payment', JSON.stringify(this.paymentHousings));
    const modal = await this.modalController.create({
      component: PaymentsPage,
      backdropDismiss: true,
    });

    modal.onDidDismiss().then((data: any) => {
      console.log(data);
      localStorage.removeItem('payment');
      localStorage.removeItem('id');
      this.ionViewWillEnter();
    })
    this.modalController.dismiss();
    await modal.present();
  }
  //FUNCIONES PARA COST SAVINGS//
  async costSavings() {
    localStorage.setItem('id', JSON.stringify(this.permanentHome.id));
    localStorage.setItem('cost', JSON.stringify(this.costSavingHomes));
    const modal = await this.modalController.create({
      component: CostSavingsPage,
      backdropDismiss: true,
    });

    modal.onDidDismiss().then((data: any) => {
      console.log(data);
      localStorage.removeItem('cost');
      localStorage.removeItem('id');
      this.ionViewWillEnter();
    })
    this.modalController.dismiss();
    await modal.present();
  }
  //FUNCIONES PARA LAND LORD//
  async landLordDetails() {
    localStorage.setItem('data_land', JSON.stringify(this.data_land));
    const modal = await this.modalController.create({
      component: LandlordDetailsPage,
      backdropDismiss: true,
    });

    modal.onDidDismiss().then((data: any) => {
      console.log(data);
      localStorage.removeItem('data_land');
      this.ionViewWillEnter();
    })
    this.modalController.dismiss();
    await modal.present();
  }
  //***************************************************************************//
  //FUNCIONES PARA MODALES INSPECTION AND REPAIRS//
  async inspectionRepairs() {
    localStorage.setItem('id', JSON.stringify(this.permanentHome.id));
    localStorage.setItem('inspections', JSON.stringify(this.data_inspection));
    localStorage.setItem('repairs', JSON.stringify(this.data_repairs));
    const modal = await this.modalController.create({
      component: InspectionsRepairsPage,
      componentProps: {
        workOrderServicesId: this.departure.workOrderServicesId,
        supplierType: 3
      },
      backdropDismiss: true,
    });

    modal.onDidDismiss().then((data: any) => {
      console.log(data);
      localStorage.removeItem('inspections');
      localStorage.removeItem('repairs');
      localStorage.removeItem('id');
      this.ionViewWillEnter();
    })
    this.modalController.dismiss();
    await modal.present();
  }
  //FUNCIONES PARA MOVE IN//
  async moveIn() {
    localStorage.setItem('id', JSON.stringify(this.permanentHome.id));
    localStorage.setItem('idpropertyReport', JSON.stringify(this.data_move_in.id));
    localStorage.setItem('moveIn', JSON.stringify(this.data_move_in));
    const modal = await this.modalController.create({
      component: MoveInPage,
      componentProps: {
        "id": this.permanentHome.id,
        "createdDate": this.permanentHome.createdDate,
        "zip": this.permanentHome.zip,
        "address": this.permanentHome.address,
        "createdBy": this.permanentHome.createdBy
      },
      backdropDismiss: true,
    });

    modal.onDidDismiss().then((data: any) => {
      console.log(data);
      localStorage.removeItem('moveIn');
      localStorage.removeItem('idpropertyReport');
      localStorage.removeItem('id');
      this.ionViewWillEnter();
    })
    this.modalController.dismiss();
    await modal.present();
  }
  //FUNCIONES PARA MOVE OUT//
  async moveOut() {
    localStorage.setItem('id', JSON.stringify(this.permanentHome.id));
    localStorage.setItem('idpropertyReport', JSON.stringify(this.data_move_out.id));
    localStorage.setItem('moveOut', JSON.stringify(this.data_move_out));
    const modal = await this.modalController.create({
      component: MoveOutPage,
      componentProps: {
        "id": this.permanentHome.id,
        "createdDate": this.permanentHome.createdDate,
        "zip": this.permanentHome.zip,
        "address": this.permanentHome.address,
        "createdBy": this.permanentHome.createdBy
      },
      backdropDismiss: true,
    });

    modal.onDidDismiss().then((data: any) => {
      console.log(data);
      localStorage.removeItem('moveOut');
      localStorage.removeItem('idpropertyReport');
      localStorage.removeItem('id');
      this.ionViewWillEnter();
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
  //****************************************************************//
  Scroll(event) {
    this._services.onScroll(event);
  }
  //*********************************************//
  sendMessage() {
    let item = JSON.parse(localStorage.getItem('data_service'));;
    let immRel = 2;
    this.router.navigate(['assignee-taps/chat/' + item.serviceRecordId + '/' + immRel])
  }
  //*********************************************************************//
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
  viewDoc(doc){
    this.iab.create(this._services.url_images+doc,'_system')
  }
}
