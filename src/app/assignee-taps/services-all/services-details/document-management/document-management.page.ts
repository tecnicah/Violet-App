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
  selector: 'app-document-management',
  templateUrl: './document-management.page.html',
  styleUrls: ['./document-management.page.scss'],
})
export class DocumentManagementPage implements OnInit {

  public addReminder_: boolean = false;
  public addComment_: boolean = false;
  public userData: any = {};
  public temporalDocument = [];
  public reminder_data: any = {};
  public comment_data: any = {};
  public ca_city: any;
  public ca_payment: any;
  public ca_applicant: any;
  public show_name_assignee = true;
  public ca_suplier: any;
  disabled: boolean = false;
  coordinatos: any = [];
  consultant: any = [];
  constructor(private socialSharing: SocialSharing,private iab: InAppBrowser,private callNumber: CallNumber, public router: Router, public loader: LoadingService, public modalController: ModalController, public _services: GeneralService, private permissionsService: NgxPermissionsService) { }
  //public navParams: NavParams, 
  //**************************************************************************************************//
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
    let coordi = JSON.parse(localStorage.getItem('immigrationCoodinators'));
    let consult = JSON.parse(localStorage.getItem('immigrationSupplierPartners'));

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
  //**************************************************************************************************//
  //CONSULTA DATA GLOBAL SERVICIO//
  public data: any = {};
  public DocumentType: any;
  public DocumentData: any = {
    documentLocalDocumentations: [],
    reminderDocumentManagements: [],
    commentDocumentManagements: []
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
    this._services.service_general_get('ImmigrationServices/GetDocumentManagementById?id=' + this.data.id_server)
      .subscribe(async (response: any) => {
        console.log(response);
        if (response.success) {
          console.log(response.result);
          this.DocumentData = response.result;
          this.getServiceScope();
          this.getDataDependent();
          this.sortData();
          this.get_supplierPartner();
          await this._services.service_general_get("ImmigrationServices/GetLocalOrDocumentation?applicantId=" + this.data.deliveredToId + '&category=' + this.data.categoryId + '&service_order_id=' + Number(this.data.workOrderId) + '&type_service=' + this.data.type).subscribe((data => {
            if (data.success) {
              console.log(data);
              this.information_Document_Management = data.result.value.standalone;
              if (this.information_Document_Management.length == 0) {
                this.information_Document_Management = data.result.value.bundle;
              }
              this.comment_DM = this.information_Document_Management[0].commentDocumentManagements;

              for (let i = 0; i < this.comment_DM.length; i++) {
                if (this.DocumentData.commentDocumentManagements.length < this.comment_DM.length) {
                  this.DocumentData.commentDocumentManagements.push(this.comment_DM[i]);
                } else {
                  return true;
                }
              }
              this.reminder_DM = this.information_Document_Management[0].reminderDocumentManagements;
              this.id_reminder = this.information_Document_Management[0].documentManagement[0].id;
              this.deliverTo = this.information_Document_Management[0].documentManagement[0].relationship;
              this.name = this.information_Document_Management[0].documentManagement[0].applicantName;
              this.workOrderServicesId = this.information_Document_Management[0].documentManagement[0].workOrderServicesId;
              this.DocumentData.reminderDocumentManagements = this.reminder_DM;
              for (let i = 0; i < this.information_Document_Management.length; i++) {
                let information_card = this.information_Document_Management[i].documentManagement;
                console.log("INFORMATION CARD: ", information_card);
                for (let j = 0; j < information_card.length; j++) {
                  this.data_card_id.push(this.information_Document_Management[i].documentManagement[j].id);
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
  }
  //**************************************************************************//
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
  //**************************************************************************//
  //SORT REMINDER//
  sortData() {
    return this.DocumentData.reminderDocumentManagements.sort((a, b) => {
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
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=5").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.ca_estatus = data.result;
      }
    }))
    this.ca_country = await this._services.getCatalogueFrom("GetCountry");
    this._services.service_general_get("Catalogue/GetDocumentType/1").subscribe((data => {
      if (data.success) {
        this.ca_document_type = data.result;
      }
    }))
    //this.ca_document_type = await this._services.getCatalogueFrom("GetDocumentType/1");
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
    this.DocumentData.commentDocumentManagements.push({
      "id": 0,
      "documentManagementId": this.DocumentData.id,
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
      componentProps: { id: 2 },
      backdropDismiss: true,
    });

    modal.onDidDismiss().then((data: any) => {
      console.log(data);
      if (data.data.success) {
        data.data.documentManagementId = this.information_Document_Management[k].documentManagement[i].id;
        console.log("result: ", data.data);
        this.information_Document_Management[k].documentManagement[i].documentDocumentManagements.push(data.data);
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
          console.log(this.information_Document_Management[i].documentManagement[k].documentDocumentManagements);
          this.information_Document_Management[i].documentManagement[k].documentDocumentManagements.splice(j, 1);
        } else {
          this._services.service_general_delete("ImmigrationServices/DeleteDocumentDM?id=" + id).subscribe((data => {
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
    this.DocumentData.reminderDocumentManagements.push({
      "id": 0,
      "documentManagementId": this.DocumentData.id,
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
          this._services.service_general_delete('ImmigrationServices/DeleteReminderDM?id=' + id).subscribe(r => {
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
          this.DocumentData.reminderDocumentManagements.splice(i, 1);
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
      for (let j = 0; j < aux_data.reminderDocumentManagements.length; j++) {
        aux_data.reminderDocumentManagements[j].documentManagementId = this.data_card_id[i];
        if (aux_data.reminderDocumentManagements[j].id === 0) {
          a.push({
            "id": 0,
            "documentManagementId": this.data_card_id[i],
            "reminderDate": aux_data.reminderDocumentManagements[j].reminderDate,
            "reminderComments": aux_data.reminderDocumentManagements[j].reminderComments,
            "createdBy": this.userData.id,
            "createdDate": new Date()
          })
        } else {
          a.push({
            "id": aux_data.reminderDocumentManagements[j].id,
            "documentManagementId": this.data_card_id[0],
            "reminderDate": aux_data.reminderDocumentManagements[j].reminderDate,
            "reminderComments": aux_data.reminderDocumentManagements[j].reminderComments,
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
      let information_card = this.information_Document_Management[i].documentManagement;
      console.log("INFORMATION CARD: ", information_card);
      for (let j = 0; j < information_card.length; j++) {
        this.information_Document_Management[i].documentManagement[j].commentDocumentManagements = this.DocumentData.commentDocumentManagements;
        this.information_Document_Management[i].documentManagement[j].reminderDocumentManagements = aux_reminder[i];
        this.information_Document_Management[i].documentManagement[j].authoDate = this.DocumentData.authoDate;
        this.information_Document_Management[i].documentManagement[j].authoAcceptanceDate = this.DocumentData.authoAcceptanceDate;
        this.information_Document_Management[i].documentManagement[j].name = this.name;
        this.information_Document_Management[i].documentManagement[j].hostCountryId = this.DocumentData.hostCountryId;
        this.information_Document_Management[i].documentManagement[j].hostCityId = this.DocumentData.hostCityId;
        this.information_Document_Management[i].documentManagement[j].updateBy = this.userData.id;
        this.information_Document_Management[i].documentManagement[j].createdBy = this.userData.id;
        this.information_Document_Management[i].documentManagement[j].createdDate = this.DocumentData.createdDate;
        this.information_Document_Management[i].documentManagement[j].updatedDate = new Date();
        this.information_Document_Management[i].documentManagement[j].city = this.information_Document_Management[i].documentManagement[j].hostCityId;
        this.information_Document_Management[i].documentManagement[j].country = this.information_Document_Management[i].documentManagement[j].hostCountryId;
        this.information_Document_Management[i].documentManagement[j].comment = "";
        data_to_send.push(this.information_Document_Management[i].documentManagement[j]);
      }
    }

    for (let i = 0; i < data_to_send.length; i++) {
      let doc = data_to_send[i].documentDocumentManagements;
      for (let j = 0; j < doc.length; j++) {
        if (doc[j].id != 0) {
          data_to_send[i].documentDocumentManagements.splice(j, 1);
        }
      }
    }

    for (let i = 0; i < data_to_send.length; i++) {
      let comment = data_to_send[i].commentDocumentManagements;
      data_to_send[i].commentDocumentManagements = [];
      for (let j = 0; j < comment.length; j++) {
        if (comment[j].reply != null && comment[j].reply != undefined && comment[j].reply.trim() != '') {
          comment[j].user.profileUsers = [];
          data_to_send[i].commentDocumentManagements.push(comment[j]);
        }
      }
    }

    console.log(data_to_send);
    this._services.service_general_put("ImmigrationServices/PutDocumentManagement", data_to_send).subscribe((data => {
      console.log("guardar db: ", data);
      if (data.success) {
        this.general_messages({
          title: "Success",
          body: "Document Management was updated",
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

  //****************************************************************//
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
  //*********************************************************************//
  viewDoc(doc){
    this.iab.create(this._services.url_images+doc,'_system')
  }
}
