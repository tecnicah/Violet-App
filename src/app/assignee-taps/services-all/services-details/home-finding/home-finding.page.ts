import { Component, OnInit } from '@angular/core';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { ConfirmationPage } from 'src/app/dialog/confirmation/confirmation.page';
import { DocumentsDialogPage } from 'src/app/dialog/documents-dialog/documents-dialog.page';
import { NavParams, ModalController } from '@ionic/angular';
import { GeneralService } from 'src/app/general/general.service';
import { ContractDetailsPage } from '../dialogs/contract-details/contract-details.page';
import { DepartureDetailsPage } from '../dialogs/departure-details/departure-details.page';
import { RenewalDetailsPage } from '../dialogs/renewal-details/renewal-details.page';
import { PaymentsPage } from '../dialogs/payments/payments.page';
import { CostSavingsPage } from '../dialogs/cost-savings/cost-savings.page';
import { LandlordDetailsPage } from '../dialogs/landlord-details/landlord-details.page';
import { InspectionsRepairsPage } from '../dialogs/inspections-repairs/inspections-repairs.page';
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
  selector: 'app-home-finding',
  templateUrl: './home-finding.page.html',
  styleUrls: ['./home-finding.page.scss'],
})
export class HomeFindingPage implements OnInit {

  disabled: boolean = false;
  coordinatos: any = [];
  consultant: any = [];
  constructor(private socialSharing: SocialSharing, private iab: InAppBrowser,private callNumber: CallNumber, public router: Router, public loader: LoadingService, public modalController: ModalController, public _services: GeneralService, private permissionsService: NgxPermissionsService) { }
  //public navParams: NavParams,
  public addReminder_: boolean = false;
  public addComment_: boolean = false;
  public userData: any = {};
  public reminder_data: any = {};
  public comment_data: any = {};
  public show_name_assignee = true;
  public family: any[] = [];
  //***************************************************************************//
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
    if (this.userData.role.id == 4  || this.userData.role.id == 3 ) {
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
  //CONSULTA DE INFORMACION DEL DEPENDENT//
  public data_dependent:any;
  getDataDependent(){
    this._services.service_general_get('ServiceOrder/GetDeliverTo?wos=' + this.home_finding.workOrderServicesId).subscribe(r => {
      if (r.success) {
        this.data_dependent = r.result.value;
        console.log(this.data_dependent);
        this.loader.loadingDismiss();
      }
    })
  }
  //***************************************************************************//
  //CONSULTA DATA GLOBAL SERVICIO//
  public home_finding: any = {
    documentHomeFindings: [],
    reminderHomeFindings: [],
    commentHomeFindings: []
  };
  public dataSourceP = [];
  public data: any = {};
  ngOnInit() {
    this.loader.loadingPresent();
    this.getCatalogos();
    //this.data = this.navParams.data;
    this.data = JSON.parse(localStorage.getItem('data_service'));
    this._services.service_general_get('RelocationServices/GetHomeFindingById?id=' + this.data.service[0].id).subscribe(data => {
      if (data.success) {
        console.log('DATA CONSULTA: ', data);
        this.home_finding = data.result;
        this.getServiceScope();
        this.getDataDependent();
        this.sortData();
        this.get_dependent();
        this.getDataHousing();
        this.getPayment();
        this.loader.loadingDismiss();
      }
    });

  }
  //*********************************************//
  //SORT REMINDER//
  sortData() {
    return this.home_finding.reminderHomeFindings.sort((a, b) => {
      return <any>new Date(a.reminderDate) - <any>new Date(b.reminderDate);
    });
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
  async getCatalogos() {
    this.ca_statuspropertySection = await this._services.getCatalogueFrom('GetStatusPropertySection');
    //this.ca_estatus = await this._services.getCatalogueFrom('GetStatus');
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=21").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.ca_estatus = data.result;
      }
    }))
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    this.ca_requestType = await this._services.getCatalogueFrom('GetRequestType');
    this.ca_leaseTemplate = await this._services.getCatalogueFrom('GetLeaseTemplate');
    this.ca_creditCard = await this._services.getCatalogueFrom('GetCreditCard');
    this.nacionality = await this._services.getCatalogueFrom('GetCountry');
    this.ca_document = await this._services.getCatalogueFrom('GetDocumentType');
    this.ca_propertySection = await this._services.getCatalogueFrom('GetPropertySection');
    let duration = await this._services.getCatalogueFrom('GetDuration');
    this.ca_relation = await this._services.getCatalogueFrom('GetRelationship');
    this.ca_repair = await this._services.getCatalogueFrom('GetRepairType');
    this.ca_property = await this._services.getCatalogueFrom('GetPropertyTypeHousing');
    this.ca_recurrence = duration.filter(function (E) {
      if (E.recurrence != null) {
        return true;
      }
    });

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
    })


  }
  //*************************************************************************//
  serviceScope:any = {
    documentcountries: []
  };
  //CONSULTA DE SCOPE SERVICE DOCUMENTS//
  getServiceScope() {
    let partnerId = Number(localStorage.getItem('partnerID'));
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.home_finding.workOrderServicesId}&client=${partnerId }`).subscribe(resp => {
      if (resp.success) {
        console.log('Data ScopeService: ', resp);
        this.serviceScope = resp.result.value;
      }
    });
  }
  //***************************************************************************//
  //CONSULTA DE  REQUEST PAYMENTS//
  public payment: any[] = [];
  getPayment() {
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.home_finding.workOrderServicesId).subscribe((data => {
      if (data.success) {
        console.log(data.result);
        this.payment = data.result.value.payments;
        console.log(this.payment);
      }
      console.log(this.payment);
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
          console.log(this.data_move_in);
        }
        this.data_inspection = this.permanentHome.inspections;
        this.data_repairs = this.permanentHome.repairs;
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
        data.data.homeFindingId = this.home_finding.id;
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
          this._services.service_general_delete('RelocationServices/DeleteDocumentHF?id=' + id).subscribe(r => {
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
    this.home_finding.commentHomeFindings.push({
      "id": 0,
      "homeFindingId": this.home_finding.id,
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
    this.home_finding.reminderHomeFindings.push({
      "id": 0,
      "homeFindingId": this.home_finding.id,
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
          this._services.service_general_delete('RelocationServices/DeleteReminderHF?id=' + id).subscribe(r => {
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
          this.home_finding.reminderHomeFindings.splice(i, 1);
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

  getStatusName(statusId) {
    for (let i = 0; i < this.ca_estatus.length; i++) {
      const element = this.ca_estatus[i];
      if (element.id == statusId) {
        return element.status;
      }
    }
  }
  //***************************************************************************//
  //FUNCION PARA GUARDAR INFORMACION//
  save() {
    this.loader.loadingPresent();
    this.home_finding.updateBy = this.userData.id;
    this.home_finding.updatedDate = new Date();
    this.home_finding.createdBy = this.userData.id;
    this.home_finding.createdDate = new Date();
    this.home_finding.documentHomeFindings = this.temporalDocument;
    let data_comment_aux = this.home_finding.commentHomeFindings;
    this.home_finding.commentHomeFindings = [];
    for (let i = 0; i < data_comment_aux.length; i++) {
      if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
        this.home_finding.commentHomeFindings.push(data_comment_aux[i]);
      }
    }
    console.log("GUARDAR: ", this.home_finding);
    this.temporalDocument = [];
    this._services.service_general_put("RelocationServices/PutHomeFinding", this.home_finding).subscribe((data => {
      if (data.success) {
        console.log(data);
        this.general_messages({
          title: "Success",
          body: "Home finding was updated",
          success: true
        });
        this.loader.loadingDismiss();
        this.temporalDocument = [];
        this._services.loader = false;
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
        workOrderServicesId: this.home_finding.workOrderServicesId,
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
