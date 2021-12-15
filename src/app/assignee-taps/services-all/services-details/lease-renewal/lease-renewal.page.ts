import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/general/loader.service';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/general/general.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { ModalController } from '@ionic/angular';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { DocumentsDialogPage } from 'src/app/dialog/documents-dialog/documents-dialog.page';
import { ConfirmationPage } from 'src/app/dialog/confirmation/confirmation.page';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { MoveOutPage } from '../dialogs/move-out/move-out.page';
import { MoveInPage } from '../dialogs/move-in/move-in.page';
import { InspectionsRepairsPage } from '../dialogs/inspections-repairs/inspections-repairs.page';
import { LandlordDetailsPage } from '../dialogs/landlord-details/landlord-details.page';
import { CostSavingsPage } from '../dialogs/cost-savings/cost-savings.page';
import { PaymentsPage } from '../dialogs/payments/payments.page';
import { RenewalDetailsPage } from '../dialogs/renewal-details/renewal-details.page';
import { DepartureDetailsPage } from '../dialogs/departure-details/departure-details.page';
import { ContractDetailsPage } from '../dialogs/contract-details/contract-details.page';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { DocumentRelocationPage } from 'src/app/dialog/document-relocation/document-relocation.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-lease-renewal',
  templateUrl: './lease-renewal.page.html',
  styleUrls: ['./lease-renewal.page.scss'],
})
export class LeaseRenewalPage implements OnInit {

  calculo: any = {};
  settlingin: any = { documentLeaseRenewals: [], reminderLeaseRenewals: [], commentLeaseRenewals: [] };
  user: any = {};
  cestatus: any[] = [];
  temporalDocument: any[] = [];
  table_payments: any[] = [];
  caDocumentType: any[] = [];
  caCountry: any[] = [];
  cr: string = "Reply";
  dataSourcePayment: any[] = [];
  displayedColumnsPayment: string[] = ['Payment', 'Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence', 'action'];

  mostrarTarjeta: any = {
    contractDetails: false,
    paymenType: false,
    costSaving: false,
    renewalDetails: false,
    departureDetails: false,
    landLord: false,
    repairs: false,
    move_in: false,
    move_out: false
  };
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

  public data: any;
  public addReminder_: boolean = false;
  public addComment_: boolean = false;
  public reminder_data: any = {};
  public comment_data: any = {};
  public userData: any = {};
  public disabled: boolean = false;

  constructor(private socialSharing: SocialSharing, public loader: LoadingService, private iab: InAppBrowser,
    public router: Router,private callNumber: CallNumber, 
    public modalController: ModalController,
    public _services: GeneralService,
    private permissionsService: NgxPermissionsService) { }

  public show_name_assignee = true;
  public coordinatos: any = [];
  public consultant: any = [];

  ionViewWillEnter() {
    if (window.screen.width <= 500) {
      this.show_name_assignee = true;
    } else {
      this.show_name_assignee = false;
    }
    this.loader.loadingPresent();
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.permissionsService.loadPermissions([this.userData.role.id]);
    if (this.userData.role.id == 4 || this.userData.role.id == 3) {
      this.disabled = true;
    }

    this.ngOnInit();
    let coordi = JSON.parse(localStorage.getItem('immigrationCoodinators'));
    let consult = JSON.parse(localStorage.getItem('immigrationSupplierPartners'));

    this.coordinatos = []
    for (let i = 0; i < coordi.length; i++) {
      const element = coordi[i];
      this._services.service_general_get('Catalog/GetUser/' + element.coordinatorId).subscribe(r => {
        if (r.success) {
          this.coordinatos.push(r.result.value);
        }
      })
    }

    this.consultant = [];
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

  public applicant = [];
  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.catalogos();
    console.log('data user', this.userData);
    this.data = JSON.parse(localStorage.getItem('data_service'));
    console.log("data que recibe modal: ", this.data);

    this._services.service_general_get('ServiceRecord/GetApplicant/' + this.data.serviceRecordId).subscribe(r => {
      if (r.success) {
        this.applicant = r.applicant.value;
      }
    })

    this._services.service_general_get('Catalogue/GetDocumentType/1').subscribe((data => {
      if (data.success) {
        this.caDocumentType = data.result;
        console.log(this.caDocumentType);
      }
    }));
    this._services.service_general_get('RelocationServices/GetLeaseRenewalById?id=' + this.data.service[0].id).subscribe((data => {
      if (data.success) {
        this.settlingin = data.result;
        for(let i=0; i<this.settlingin.commentLeaseRenewals.length; i++){
          this.settlingin.commentLeaseRenewals[i].role = this.settlingin.commentLeaseRenewals[i].creationByNavigation.role.role;
          this.settlingin.commentLeaseRenewals[i].name = this.settlingin.commentLeaseRenewals[i].creationByNavigation.name;
          this.settlingin.commentLeaseRenewals[i].avatar = this.settlingin.commentLeaseRenewals[i].creationByNavigation.avatar;
        }
        this.getDataDependent();
        console.log(this.settlingin);
        this.get_payment();
        this.getDataHousing();
        this.loader.loadingDismiss();
      }
    }))
    this.loader.loadingDismiss();
  }
  //*************************************************************************//
  serviceScope:any = {
    documentcountries: []
  };
  //CONSULTA DE SCOPE SERVICE DOCUMENTS//
  getServiceScope() {
    let partnerId = Number(localStorage.getItem('partnerID'));
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.settlingin.workOrderServices}&client=${partnerId }`).subscribe(resp => {
      if (resp.success) {
        console.log('Data ScopeService: ', resp);
        this.serviceScope = resp.result.value;
      }
    });
  }
  //***************************************************************************************//
  //CONSULTA DE INFORMACION DEL DEPENDENT//
  public data_dependent:any;
  getDataDependent(){
    this._services.service_general_get('ServiceOrder/GetDeliverTo?wos=' + this.settlingin.workOrderServices).subscribe(r => {
      if (r.success) {
        this.data_dependent = r.result.value;
        console.log(this.data_dependent);
        this.loader.loadingDismiss();
      }
    })
  }
  //***************************************************************************************//
  //CONSULTA DE CATALOGOS//
  public ca_creditCard = [];
  public ca_property = [];
  public ca_currency = [];
  public ca_recurrence = [];
  public ca_payment_Type = [];
  public ca_responsible = [];
  public ca_accountType = [];
  public ca_propertySection = [];
  public ca_statuspropertySection = [];
  public ca_repair = [];
  public ca_relation = [];
  public SupplierCompany = [];
  async catalogos() {
    this.ca_repair = await this._services.getCatalogueFrom('GetRepairType');
    this.ca_relation = await this._services.getCatalogueFrom('GetRelationship');
    this.ca_statuspropertySection = await this._services.getCatalogueFrom('GetStatusPropertySection');
    //this.cestatus = await this._services.getCatalogueFrom('GetStatus');
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=22").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.cestatus = data.result;
      }
    }))
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    this.ca_creditCard = await this._services.getCatalogueFrom('GetCreditCard');
    this.ca_property = await this._services.getCatalogueFrom('GetPropertyTypeHousing');
    let duration = await this._services.getCatalogueFrom('GetDuration');
    this.ca_payment_Type = await this._services.getCatalogueFrom('GetPaymentType');
    this.ca_responsible = await this._services.getCatalogueFrom('GetResponsablePayment');
    this.ca_accountType = await this._services.getCatalogueFrom('GetBankAccountType');
    this.ca_propertySection = await this._services.getCatalogueFrom('GetPropertySection');
    this.ca_recurrence = duration.filter(function (E) {
      if (E.recurrence != null) {
        return true;
      }
    });

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
  //***************************************************************//
  //CONSULTA DE REQUEST PAYMENT//
  public payment = [];
  get_payment() {
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.settlingin.workOrderServices).subscribe((data => {
      if (data.success) {
        this.payment = data.result.value.payments;
        console.log(data);
      }
    }))
  }
  //***************************************************************//
  //FUNCION PARA AGREGAR COMENTARIOS//
  public temporalComment = [];
  addComment() {
    this.temporalComment.push({
      "id": 0,
      "leaseRenewal": this.settlingin.id,
      "comment": this.comment_data.comments,
      "userId": this.userData.id,
      "creationBy": this.userData.id,
      "createdDate": new Date(),
      "updatedBy": this.userData.id,
      "updatedDate": new Date(),
      "user": this.userData
    })
    this.addComment_ = false;
    this.comment_data.comments = '';
  }
  //***************************************************************//
  //METODO PARA ELIMINAR DOCUMENTOS//
  async DeleteOnlineof(id, i) {
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
          this._services.service_general_delete('RelocationServices/DeleteDocumentLeaseRenewal?id=' + id).subscribe(r => {
            if (r.success) {
              this.general_messages({
                title: "Success",
                body: "The document was deleted",
                success: true
              });
              this.ngOnInit();
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
  //METODO PARA AGREGAR DOCUMENTOS//
  async addDocument() {
    const modal = await this.modalController.create({
      component: DocumentRelocationPage,
      backdropDismiss: true,
    });

    modal.onDidDismiss().then((data: any) => {
      console.log(data);
      if (data.data.success) {
        data.data.leaseRenewal = this.settlingin.id;
        data.data.comment = "";
        this.temporalDocument.push(data.data);
      }
    })
    this.modalController.dismiss();
    await modal.present();
  }
  //METODO PARA OBTENER EL NOMBRE DEL DOCUMENTO//
  documentType(id) {
    for (let i = 0; i < this.caDocumentType.length; i++) {
      if (this.caDocumentType[i].id == id) {
        return this.caDocumentType[i].documentType;
      }
    }
  }
  //METODO PARA OBTENER EL NOMBRE DEL PAIS//
  countryOrigin(id) {
    for (let i = 0; i < this.caCountry.length; i++) {
      if (this.caCountry[i].id == id) {
        return this.caCountry[i].name;
      }
    }
  }
  //***************************************************************//
  //METODOS PARA REMINDER//
  addReminder() {
    this.settlingin.reminderLeaseRenewals.push({
      "id": 0,
      "leaseRenewal": this.settlingin.id,
      "reminderDate": this.reminder_data.reminderDate,
      "reminderComments": this.reminder_data.reminderComments,
      "createdBy": this.userData.id,
      "createdDate": new Date()
    })
    this.reminder_data.reminderDate = null;
    this.reminder_data.reminderComments = '';
    this.addReminder_ = false;
  }
  //METODO PARA ELIMINAR REMINDER//
  async deletereminder(id, i) {
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
          this._services.service_general_delete('RelocationServices/DeleteReminderLeaseRenewal?id=' + id).subscribe(r => {
            if (r.success) {
              this.general_messages({
                title: "Success",
                body: "The reminder was deleted",
                success: true
              });
              this.ngOnInit();
            }
          })

        } else {
          this.settlingin.reminderLeaseRenewals.splice(i, 1);
        }
      }
    })
    this.modalController.dismiss();
    await modal.present();
  }
  //**************************************************************//
  //CONSULTA LA CASA PERMANENTE//
  public dataSourceHousing: any;
  getDataHousing() {
    this._services.service_general_get('HousingList/GetAllHousing?key=' + Number(this.data.workOrderId)).subscribe((data_housing) => {
      if (data_housing.success) {
        console.log('DATA CONSULTA HOUSING LIST: ', data_housing);
        this.dataSourceHousing = data_housing.message;
        this.permanent_homet(this.dataSourceHousing);
      }
    });
  }
  //**************************************************************//
  //CONSULTA DE CASA PERMANENTE//
  //**PERMANENT HOME**//
  permanentHome: any;
  data_inspection = [];
  data_repairs = [];
  data_home = [];
  permanent_homet(data) {
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
  //**************************************************************//
  //DEPENDENT//
  public ca_dependent = [];
  get_dependent() {
    this._services.service_general_get('Catalogue/GetDependents?sr=' + Number(this.data.sr)).subscribe(data => {
      if (data.success) {
        console.log('DATA CONSULTA: ', data);
        this.ca_dependent = data.result;
      }
    });
  }
  //**************************************************************//
  getProperty_(id) {
    for (let i = 0; i < this.ca_property.length; i++) {
      if (this.ca_property[i].id == id) {
        return this.ca_property[i].propertyType;
      }
    }
  }
  //**************************************************************//
  //Currency//
  getCurrency(id) {
    for (let i = 0; i < this.ca_currency.length; i++) {
      if (this.ca_currency[i].id == id) {
        return this.ca_currency[i].currency;
      }
    }
  }
  //**************************************************************//
  //Recurrencia//
  getRecurrence(id) {
    for (let i = 0; i < this.ca_recurrence.length; i++) {
      if (this.ca_recurrence[i].id == id) {
        return this.ca_recurrence[i].recurrence;
      }
    }
  }
  //**************************************************************//
  //Payment//
  getPayment(id) {
    for (let i = 0; i < this.ca_payment_Type.length; i++) {
      if (this.ca_payment_Type[i].id == id) {
        return this.ca_payment_Type[i].paymentType;
      }
    }
  }
  //**************************************************************//
  //Responsable//
  getResponsable(id) {
    for (let i = 0; i < this.ca_responsible.length; i++) {
      if (this.ca_responsible[i].id == id) {
        return this.ca_responsible[i].responsable;
      }
    }
  }
  //**************************************************************//
  //DEPENDENT//
  getDependent(id) {
    for (let i = 0; i < this.ca_dependent.length; i++) {
      if (this.ca_dependent[i].id == id) {
        return this.ca_dependent[i].name;
      }
    }
  }
  //**************************************************************//
  //ACCOUNT//
  getAccount(id) {
    for (let i = 0; i < this.ca_accountType.length; i++) {
      if (this.ca_accountType[i].id == id) {
        return this.ca_accountType[i].accountType;
      }
    }
  }
  //**************************************************************//
  //Seccion property//
  getProperty(id) {
    for (let i = 0; i < this.ca_propertySection.length; i++) {
      if (this.ca_propertySection[i].id == id) {
        return this.ca_propertySection[i].propertySection;
      }
    }
  }
  //Seccion property//
  getCondicion(id) {
    for (let i = 0; i < this.ca_statuspropertySection.length; i++) {
      if (this.ca_statuspropertySection[i].id == id) {
        return this.ca_statuspropertySection[i].status;
      }
    }
  }
  //RELATION SHIP//  
  getReltion(id) {
    for (let i = 0; i < this.ca_relation.length; i++) {
      if (this.ca_relation[i].id == id) {
        return this.ca_relation[i].relationship;
      }
    }
  }
  //Repair//  
  getRepair(id) {
    for (let i = 0; i < this.ca_repair.length; i++) {
      if (this.ca_repair[i].id == id) {
        return this.ca_repair[i].repairType;
      }
    }
  }
  //Supplier//  
  getSupplier(id) {
    for (let i = 0; i < this.SupplierCompany.length; i++) {
      if (this.SupplierCompany[i].int == id) {
        return this.SupplierCompany[i].supplierCompany;
      }
    }
  }
  //Aplicant//  
  getAplicant(id) {
    for (let i = 0; i < this.applicant.length; i++) {
      if (this.applicant[i].dependentId == id) {
        return this.applicant[i].name;
      }
    }
  }
  //**************************************************************//
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
  //**************************************************************//
  //METODO PARA GUARDAR INFORMACION//
  save() {
    this.loader.loadingPresent();
    this.settlingin.updateBy = this.user.id;
    this.settlingin.updatedDate = new Date();
    this.settlingin.documentLeaseRenewals = this.temporalDocument;
    this.settlingin.commentLeaseRenewals = [];
    this.settlingin.commentLeaseRenewals = this.temporalComment;
    let data_comment_aux = this.settlingin.commentLeaseRenewals;
    this.settlingin.commentLeaseRenewals = [];

    for (let i = 0; i < data_comment_aux.length; i++) {
      if (data_comment_aux[i].comment != null && data_comment_aux[i].comment != undefined && data_comment_aux[i].comment.trim() != '') {
        this.settlingin.commentLeaseRenewals.push(data_comment_aux[i]);
      }
    }


    console.log(this.settlingin);
    this.temporalDocument = [];
    this._services.service_general_put("RelocationServices/PutLeaseRenewal", this.settlingin).subscribe((data => {
      if (data.success) {
        console.log(data);
        this.general_messages({
          title: "Success",
          body: "Lease Renewal was updated",
          success: true
        });
        this.temporalComment = [];
        this.temporalDocument = [];
        this.loader.loadingDismiss();
        this.ngOnInit();
      }
    }), (err) => {
      console.log("error: ", err);
    })
    this.loader.loadingDismiss();
  }
  //**************************************************************//
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
      this.ngOnInit();
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
      this.ngOnInit();
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
      this.ngOnInit();
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
      this.ngOnInit();
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
      this.ngOnInit();
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
      this.ngOnInit();
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
        workOrderServicesId: this.settlingin.workOrderServices,
        supplierType: 3
      },
      backdropDismiss: true,
    });

    modal.onDidDismiss().then((data: any) => {
      console.log(data);
      localStorage.removeItem('inspections');
      localStorage.removeItem('repairs');
      localStorage.removeItem('id');
      this.ngOnInit();
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
      this.ngOnInit();
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
      this.ngOnInit();
    })
    this.modalController.dismiss();
    await modal.present();
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
