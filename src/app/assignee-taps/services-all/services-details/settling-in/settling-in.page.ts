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
  selector: 'app-settling-in',
  templateUrl: './settling-in.page.html',
  styleUrls: ['./settling-in.page.scss'],
})
export class SettlingInPage implements OnInit {

  constructor(private socialSharing: SocialSharing, private iab: InAppBrowser,public loader: LoadingService, public router: Router,
    public modalController: ModalController, private callNumber: CallNumber,
    public _services: GeneralService, private _permissions: NgxPermissionsService) { }

  //public navParams: NavParams,
  calculo: any = {};
  vista: boolean = false;
  settlingin: any = {
    documentSettlingIns: [],
    reminderSettlingIns: [],
    commentSettlingIns: [],
    extensionSettlingIns: []
  };
  userData: any = {};
  cestatus: any[] = [];
  temporalDocument: any[] = [];
  table_payments: any[] = [];
  ca_requestType: any[] = [];
  caDocumentType: any[] = [];
  caCountry: any[] = [];
  cRequestType: any[] = [];
  allUser: any[] = [];
  CleaningCompanySupplier: any[] = [];
  ChildCareSupplier: any[] = [];
  ChildPArtner: any[] = [];
  CleaningCompanyPartner: any[] = [];
  cr: string = "Reply";
  dataSource: any[] = [];
  data: any = {};

  addComment_: boolean = false;
  comment_data: any = {};
  reminder_data: any = {};
  addReminder_: boolean = false;
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
    this.coordinatorData = JSON.parse(localStorage.getItem('relocationCoordinators'));
    this.consultantData = JSON.parse(localStorage.getItem('relocationSupplierPartners'));
    if (this.__userlog__.role.id == 4 || this.__userlog__.role.id == 3) {
      this.disabled = true;
      this.getConsultant();
      this.getCoordinator();
    }

  }

  ngOnInit() {
    //this.data = this.navParams.data;
    this.data = JSON.parse(localStorage.getItem('data_service'));
    this.loader.loadingPresent();
    this._services.service_general_get('RelocationServices/GetSettlingInById?id=' + this.data.service[0].id).subscribe((data => {
      if (data.success) {
        this.settlingin = data.result;
        this.getServiceScope();
        this.getDataDependent();
        this.sortData();
        this.get_supplierPartner();
        this.vista = true;
        console.log(this.settlingin);
        this.get_payment();
        this.loader.loadingDismiss();
      }
    }))
    this.catalogos();
    this.loader.loadingDismiss();
  }
  //*********************************************//
  serviceScope:any = {
    documentcountries: []
  };
  //CONSULTA DE SCOPE SERVICE DOCUMENTS//
  getServiceScope() {
    let partnerId = Number(localStorage.getItem('partnerID'));
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.settlingin.workOrderServicesId}&client=${partnerId }`).subscribe(resp => {
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
    this._services.service_general_get('ServiceOrder/GetDeliverTo?wos=' + this.settlingin.workOrderServicesId).subscribe(r => {
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
    return this.settlingin.reminderSettlingIns.sort((a, b) => {
      return <any>new Date(a.reminderDate) - <any>new Date(b.reminderDate);
    });
  }

  async catalogos() {
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=14").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.cestatus = data.result;
      }
    }))
    //this.cestatus = await this._services.getCatalogueFrom('GetStatus');
    this._services.service_general_get('User').subscribe(r => {
      this.allUser = r.result;
    })
    this.documentoscatalogos();
  }

  //***************************************************************************//
  //FUNCION PARA AGREGAR REPLICA//
  addComment() {
    this.settlingin.commentSettlingIns.push({
      "id": 0,
      "settlingInId": this.settlingin.id,
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
    this.settlingin.reminderSettlingIns.push({
      "id": 0,
      "settlingInId": this.settlingin.id,
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
          this._services.service_general_delete('RelocationServices/DeleteReminderSI?id=' + id).subscribe(r => {
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
          this.settlingin.predecisionOrientationId.splice(i, 1);
        }
      }
    })
    this.modalController.dismiss();
    await modal.present();
  }

  get_payment() {
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.settlingin.workOrderServicesId).subscribe((data => {
      if (data.success) {
        console.log(data.result);
        this.calculo = data.result.value;
        this.calculo.total = this.calculo.ammountSubTotal + this.calculo.managementFeeSubTotal + this.calculo.wireFeeSubTotal + this.calculo.advanceFeeSubTotal;
        this.table_payments = data.result.value.payments;
        console.log(this.table_payments);
      }
      console.log(this.table_payments);
    }))
  }

  async documentoscatalogos() {
    this.caDocumentType = await this._services.getCatalogueFrom('GetDocumentType');
    this.caCountry = await this._services.getCatalogueFrom('GetCountry');

  }

  //**CONSULTA SUPPLIER PARTNER**//
  get_supplierPartner() {
    this._services.service_general_get("SupplierPartnerProfile/GetSupplierPartnerServiceByServices?workOrderService=" + this.settlingin.workOrderServicesId + "&supplierType=1&serviceLine=2").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.CleaningCompanySupplier = data.result.value;
      }
    }))
  }

  //***************************************************************************//
  //FUNCION PARA AGREGAR DOCUMENTOS//
  async addDocument() {
    const modal = await this.modalController.create({
      component: DocumentRelocationPage,
      componentProps: { id: 1 },
      backdropDismiss: true,
    });

    modal.onDidDismiss().then((data: any) => {
      console.log(data);
      if (data.data.success) {
        data.data.settlingInId = this.settlingin.id;
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
          this._services.service_general_delete('RelocationServices/DeleteDocumentSI?id=' + id).subscribe(r => {
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
  //FUNCION PARA GUARDAR INFORMACION//
  save() {
    this.loader.loadingPresent();
    console.log("SAVE INFORMATION: ", this.settlingin);
    this.settlingin.documentSettlingIns = this.temporalDocument;
    this.settlingin.updateBy = this.userData.id;
    this.settlingin.updatedDate = new Date();
    this.settlingin.createdBy = this.userData.id;
    this.settlingin.createdDate = new Date();
    this.settlingin.authoDateExtension = new Date();
    this.settlingin.authoAcceptanceDateExtension = new Date();


    let data_comment_aux = this.settlingin.commentSettlingIns;
    this.settlingin.commentSettlingIns = [];

    for (let i = 0; i < data_comment_aux.length; i++) {
      if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
        this.settlingin.commentSettlingIns.push(data_comment_aux[i]);
      }
    }

    console.log(this.settlingin);
    this._services.service_general_put("RelocationServices/PutSettlingIn", this.settlingin).subscribe((data => {
      if (data.success) {
        console.log(data);
        this.general_messages({
          title: "Success",
          body: "Settling In was updated",
          success: true
        });
        this.loader.loadingDismiss();
        this.temporalDocument = [];
        this.ionViewWillEnter();
      }
    }))
  }

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
  //*****************************************************************//
  viewDoc(doc){
    this.iab.create(this._services.url_images+doc,'_system')
  }
}
