import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { GeneralService } from 'src/app/general/general.service';
import { DocumentsDialogPage } from 'src/app/dialog/documents-dialog/documents-dialog.page';
import { ConfirmationPage } from 'src/app/dialog/confirmation/confirmation.page';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { LoadingService } from 'src/app/general/loader.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-local-documentation',
  templateUrl: './local-documentation.page.html',
  styleUrls: ['./local-documentation.page.scss'],
})
export class LocalDocumentationPage implements OnInit {

  public addReminder_: boolean = false;
  public addComment_: boolean = false;
  public userData: any = {};
  public temporalDocument = [];
  public reminder_data: any = {};
  public comment_data: any = {};
  public ca_city: any;
  public ca_payment: any;
  public ca_applicant: any;
  public ca_suplier: any;
  public disabled: boolean = false;
  public __userlog__: any = JSON.parse(localStorage.getItem('userData'));
  public type_user: any;
  public coordinatorData: any;
  public consultantData: any;
  public show_name_assignee = true;
  constructor(private socialSharing: SocialSharing, private iab: InAppBrowser,private callNumber: CallNumber,public router: Router, private _permissions: NgxPermissionsService, public loader: LoadingService, public modalController: ModalController, public _services: GeneralService) { }
  //public navParams: NavParams,
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
    this.ngOnInit();
    const user_rol: string[] = [this.__userlog__.role.id];
    this.type_user = user_rol;
    this._permissions.loadPermissions(user_rol);
    this.coordinatorData = JSON.parse(localStorage.getItem('immigrationCoodinators'));
    this.consultantData = JSON.parse(localStorage.getItem('immigrationSupplierPartners'));
    if (this.__userlog__.role.id == 4 || this.__userlog__.role.id == 3) {
      this.disabled = true;
      this.getConsultant();
      this.getCoordinator();
    }
  }
  //**************************************************************************************************//
  //CONSULTA DATA GLOBAL SERVICIO//
  public data: any = {};
  public DocumentType = [];
  public DocumentData: any = { 
    documentLocalDocumentations: [],
    reminderLocalDocumentations: [],
    commentLocalDocumentations: []
  };
  public document: any[] = [];
  public comment_DM: any[] = [];
  public reminder_DM: any[] = [];
  public information_Document_Management: any;
  public id_reminder: any;
  public data_card_id: any = []
  public deliverTo: any;
  public name: any;
  public workOrderServicesId: any;
  ngOnInit() {
    this.loader.loadingPresent();
    this.getCatalogos();
    //this.data = this.navParams.data;
    this.data = JSON.parse(localStorage.getItem('data_service'));
    this._services.service_general_get('ImmigrationServices/GetLocalDocumentationById?id=' + this.data.id_server)
      .subscribe(async (response: any) => {
        console.log(response);
        if (response.success) {
          console.log(response.result);
          this.DocumentData = response.result;
          this.getDataDependent();
          this.getServiceScope();
          this.sortData();
          this.get_supplierPartner();
          await this._services.service_general_get("ImmigrationServices/GetLocalOrDocumentation?applicantId=" + this.data.deliveredToId + '&category=' + this.data.categoryId + '&service_order_id=' + Number(this.data.workOrderId) + '&type_service=' + this.data.type).subscribe((data => {
            if (data.success) {
              console.log(data);
              this.information_Document_Management = data.result.value.standalone;
              if (this.information_Document_Management.length == 0) {
                this.information_Document_Management = data.result.value.bundle;
              }
              this.comment_DM = this.information_Document_Management[0].commentLocalDocumentations;

              for (let i = 0; i < this.comment_DM.length; i++) {
                if (this.DocumentData.commentLocalDocumentations.length < this.comment_DM.length) {
                  this.DocumentData.commentLocalDocumentations.push(this.comment_DM[i]);
                } else {
                  return true;
                }
              }
              this.reminder_DM = this.information_Document_Management[0].reminderLocalDocumentations;
              this.id_reminder = this.information_Document_Management[0].localDocumentation[0].id;
              this.deliverTo = this.information_Document_Management[0].localDocumentation[0].relationship;
              this.name = this.information_Document_Management[0].localDocumentation[0].applicantName;
              this.workOrderServicesId = this.information_Document_Management[0].localDocumentation[0].workOrderServicesId;
              this.DocumentData.reminderLocalDocumentations = this.reminder_DM;
              for (let i = 0; i < this.information_Document_Management.length; i++) {
                let information_card = this.information_Document_Management[i].localDocumentation;
                console.log("INFORMATION CARD: ", information_card);
                for (let j = 0; j < information_card.length; j++) {
                  this.data_card_id.push(this.information_Document_Management[i].localDocumentation[j].id);
                }
              }
            }
            this.get_payment();
            this._services.service_general_get("ServiceRecord/GetApplicant/" + this.data.sr).subscribe((data => {
              console.log(data);
              if (data.success) {
                this.ca_applicant = data.applicant.value;
                console.log(this.ca_applicant);
              }
            }))
          }));
          this.loader.loadingDismiss();
        }
      }, (error: any) => {
        console.error('Error => ', error);
      });
    this.loader.loadingDismiss();
  }
  //*********************************************//
  //CONSULTA DE INFORMACION DEL DEPENDENT//
  public data_dependent:any;
  getDataDependent(){
    this._services.service_general_get('ServiceOrder/GetDeliverTo?wos=' + this.DocumentData.workOrderServicesId).subscribe(r => {
      if (r.success) {
        this.data_dependent = r.result.value;
        console.log(this.data_dependent);
      }
    })
  }
  //*********************************************//
  //SORT REMINDER//
  sortData() {
    return this.DocumentData.reminderLocalDocumentations.sort((a, b) => {
      return <any>new Date(a.reminderDate) - <any>new Date(b.reminderDate);
    });
  }
  //***********************************************************************************************************************//
  //**CONSULTA SUPPLIER PARTNER**//
  get_supplierPartner() {
    this._services.service_general_get("SupplierPartnerProfile/GetConsultantContactsService?supplierType=3").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.ca_suplier = data.result.value;
      }
    }))
  }
  //**************************************************************************************************//
  //CONSULTA DE CATALOGOS//
  public ca_estatus = [];
  public ca_country = [];
  public ca_requestType = [];
  public ca_document_type = [];
  async getCatalogos() {
    this.ca_requestType = await this._services.getCatalogueFrom('GetRequestType');
    //this.ca_estatus = await this._services.getCatalogueFrom("GetStatus");
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=6").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.ca_estatus = data.result;
      }
    }))
    this.ca_country = await this._services.getCatalogueFrom("GetCountry");
    //this.ca_document_type = await this._services.getCatalogueFrom("GetDocumentType");
    this._services.service_general_get("Catalogue/GetDocumentType/1").subscribe((data => {
      if (data.success) {
        this.ca_document_type = data.result;
      }
    }))
  }
  //**************************************************************************************************//
  //FUNCION PARA CONSULTAR LOS REQUEST PAYMENT//
  payment = [];
  get_payment() {
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.DocumentData.workOrderServicesId).subscribe((data => {
      if (data.success) {
        this.payment = data.result.value.payments;
        console.log(data);
      }
    }))
  }
  //**************************************************************************************************//
  //FUNCION PARA AGREGAR REPLICA//
  addComment() {
    this.DocumentData.commentLocalDocumentations.push({
      "id": 0,
      "localDocumentationId": this.DocumentData.id,
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
  //FUNCION PARA AGREGAR DOCUMENTOS//
  async addDocument(k, i) {
    const modal = await this.modalController.create({
      component: DocumentsDialogPage,
      componentProps: {id: 2},
      backdropDismiss: true,
    });

    modal.onDidDismiss().then((data: any) => {
      console.log(data);
      if (data.data.success) {
        data.data.localDocumentationId = this.information_Document_Management[k].localDocumentation[i].id;
        console.log("result: ", data.data);
        this.information_Document_Management[k].localDocumentation[i].documentLocalDocumentations.push(data.data);
        console.log("Documentos: ", this.information_Document_Management);

      }
    })
    this.modalController.dismiss();
    await modal.present();
  }
  //**************************************************************************************************//
  //FUNCION PARA ELIMINAR DOCUMENTOS//
  async deleteDocument(i, k, j, id) {
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
        if (id == 0) {
          console.log(this.information_Document_Management[i].localDocumentation[k].documentLocalDocumentations);
          this.information_Document_Management[i].localDocumentation[k].documentLocalDocumentations.splice(j, 1);
        } else {
          this._services.service_general_delete("ImmigrationServices/DeleteDocumentLD?id=" + id).subscribe((data => {
            if (data.success) {
              this.general_messages({
                title: "Success",
                body: "The document was deleted",
                success: true
              });
              this.ionViewWillEnter();
            }
          }))
        }
      }
    })
    this.modalController.dismiss();
    await modal.present();
  }
  //**************************************************************************************************//
  //FUNCION PARA AGREGAR REPLICA//
  addReminder() {
    this.DocumentData.reminderLocalDocumentations.push({
      "id": 0,
      "localDocumentationId": this.DocumentData.id,
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
          this._services.service_general_delete('ImmigrationServices/DeleteReminderLD?id=' + id).subscribe(r => {
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
          this.DocumentData.reminderLocalDocumentations.splice(i, 1);
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
    let data_to_send = [];
    let aux_reminder = [];
    console.log("INFO GENERAL: ", this.DocumentData);
    let aux_data = this.DocumentData;
    console.log(this.data_card_id);
    var a = [];
    for (let i = 0; i < this.data_card_id.length; i++) {
      for (let j = 0; j < aux_data.reminderLocalDocumentations.length; j++) {
        aux_data.reminderLocalDocumentations[j].localDocumentationId = this.data_card_id[i];
        if (aux_data.reminderLocalDocumentations[j].id === 0) {
          a.push({
            "id": 0,
            "localDocumentationId": this.data_card_id[i],
            "reminderDate": aux_data.reminderLocalDocumentations[j].reminderDate,
            "reminderComments": aux_data.reminderLocalDocumentations[j].reminderComments,
            "createdBy": this.userData.id,
            "createdDate": new Date()
          })
        } else {
          a.push({
            "id": aux_data.reminderLocalDocumentations[j].id,
            "localDocumentationId": this.data_card_id[0],
            "reminderDate": aux_data.reminderLocalDocumentations[j].reminderDate,
            "reminderComments": aux_data.reminderLocalDocumentations[j].reminderComments,
            "createdBy": this.userData.id,
            "createdDate": new Date()
          })
        }
      }
      aux_reminder.push(a);
      a = [];
    }

    console.log(aux_reminder);
    for (let i = 0; i < this.information_Document_Management.length; i++) {
      let information_card = this.information_Document_Management[i].localDocumentation;
      console.log("INFORMATION CARD: ", information_card);
      for (let j = 0; j < information_card.length; j++) {
        this.information_Document_Management[i].localDocumentation[j].commentLocalDocumentations = this.DocumentData.commentLocalDocumentations;
        this.information_Document_Management[i].localDocumentation[j].reminderLocalDocumentations = aux_reminder[i];
        this.information_Document_Management[i].localDocumentation[j].authoDate = this.DocumentData.authoDate;
        this.information_Document_Management[i].localDocumentation[j].authoAcceptanceDate = this.DocumentData.authoAcceptanceDate;
        this.information_Document_Management[i].localDocumentation[j].name = this.name;
        this.information_Document_Management[i].localDocumentation[j].hostCountryId = this.DocumentData.hostCountryId;
        this.information_Document_Management[i].localDocumentation[j].hostCityId = this.DocumentData.hostCityId;
        this.information_Document_Management[i].localDocumentation[j].updateBy = this.userData.id;
        this.information_Document_Management[i].localDocumentation[j].createdBy = this.userData.id;
        this.information_Document_Management[i].localDocumentation[j].createdDate = this.DocumentData.createdDate;
        this.information_Document_Management[i].localDocumentation[j].updatedDate = new Date();
        this.information_Document_Management[i].localDocumentation[j].city = this.information_Document_Management[i].localDocumentation[j].hostCityId;
        this.information_Document_Management[i].localDocumentation[j].country = this.information_Document_Management[i].localDocumentation[j].hostCountryId;
        this.information_Document_Management[i].localDocumentation[j].comment = "";
        data_to_send.push(this.information_Document_Management[i].localDocumentation[j]);
      }
    }

    for (let i = 0; i < data_to_send.length; i++) {
      let doc = data_to_send[i].documentLocalDocumentations;
      for (let j = 0; j < doc.length; j++) {
        if (doc[j].id != 0) {
          data_to_send[i].documentLocalDocumentations.splice(j, 1);
        }
      }
    }

    for (let i = 0; i < data_to_send.length; i++) {
      let comment = data_to_send[i].commentLocalDocumentations;
      data_to_send[i].commentLocalDocumentations = [];
      for (let j = 0; j < comment.length; j++) {
        if (comment[j].reply != null && comment[j].reply != undefined && comment[j].reply.trim() != '') {
          comment[j].user.profileUsers = [];
          data_to_send[i].commentLocalDocumentations.push(comment[j]);
        }
      }
    }

    console.log(data_to_send);
    this._services.service_general_put("ImmigrationServices/PutLocalDocumentation", data_to_send).subscribe((data => {
      console.log("guardar db: ", data);
      if (data.success) {
        this.general_messages({
          title: "Success",
          body: "Local Documentation was updated",
          success: true
        });
        this.loader.loadingDismiss();
        this.ionViewWillEnter();
      }
    }), (err) => {
      console.log("Error al guardar data: ", err);
    })
  }
  //**************************************************************************************************//
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
  getDocumentNAme(Id) {
    for (let i = 0; i < this.ca_document_type.length; i++) {
      const element = this.ca_document_type[i];
      if (element.id == Id) {
        return element.documentType;
      }
    }
  }
  //************************************************************//
  Scroll(event) {
    this._services.onScroll(event);
  }
  //************************************************************//
  sendMessage(){
    let item =JSON.parse(localStorage.getItem('data_service'));;
    let immRel = 1;
    this.router.navigate(['assignee-taps/chat/'+item.serviceRecordId+'/'+immRel])
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
  //*******************************************************************//
  serviceScope: any = {
    documentcountries: []
  };
  //CONSULTA DE SCOPE SERVICE DOCUMENTS//
  getServiceScope() {
    let partnerId = Number(localStorage.getItem('partnerID'));
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.DocumentData.workOrderServicesId}&client=${partnerId}`).subscribe(resp => {
      if (resp.success) {
        console.log('Data ScopeService: ', resp);
        this.serviceScope = resp.result.value;
      }
    });
  }
  //*****************************************************************//
  viewDoc(doc){
    this.iab.create(this._services.url_images+doc,'_system')
  }
}
