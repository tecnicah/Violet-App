import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general/general.service';
import { ModalController, NavParams } from '@ionic/angular';
import { ConfirmationPage } from 'src/app/dialog/confirmation/confirmation.page';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { DocumentsDialogPage } from 'src/app/dialog/documents-dialog/documents-dialog.page';
import { LoadingService } from 'src/app/general/loader.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { DocumentRelocationPage } from 'src/app/dialog/document-relocation/document-relocation.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-area-orientation',
  templateUrl: './area-orientation.page.html',
  styleUrls: ['./area-orientation.page.scss'],
})
export class AreaOrientationPage implements OnInit {

  constructor(private socialSharing: SocialSharing,private iab: InAppBrowser,private callNumber: CallNumber,public router: Router, private _permissions: NgxPermissionsService, public loader: LoadingService, public modalController: ModalController, public _services: GeneralService) { }
  // public navParams: NavParams,
  public addReminder_: boolean = false;
  public addComment_: boolean = false;
  public userData: any = {};
  public reminder_data: any = {};
  public comment_data: any = {};
  public dataSourceHousing: any[] = [];
  public dataSourceSchool: any[] = [];
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
  public area: any = {
    documentAreaOrientations: [],
    reminderAreaOrientations: [],
    commentAreaOrientations: [],
    extensionAreaOrientations: []
  };
  public data: any = {};
  public ca_visaType = [];
  ngOnInit() {
    this.loader.loadingPresent();
    this.getCatalogos();
    //this.data = this.navParams.data;
    this.data = JSON.parse(localStorage.getItem('data_service'));
    this._services.service_general_get(`RelocationServices/GetAreaOrientationById?id=${this.data.service[0].id}`)
      .subscribe((response: any) => {
        console.log(response);
        if (response.success) {
          console.log(response.result);
          this.loader.loadingDismiss();
          this.area = response.result;
          this.getServiceScope();
          this.getDataDependent();
          this.sortData();
          this.getPayment();
          this.loader.loadingDismiss();
        }
      }, (error: any) => {
        console.error('Error => ', error);
        this.loader.loadingDismiss();
      });
    this.getDataHousing();
    this.getDataSchool();
    this.loader.loadingDismiss();
  }
  //*********************************************//
  serviceScope:any = {
    documentcountries: []
  };
  //CONSULTA DE SCOPE SERVICE DOCUMENTS//
  getServiceScope() {
    let partnerId = Number(localStorage.getItem('partnerID'));
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.area.workOrderServicesId}&client=${partnerId }`).subscribe(resp => {
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
    this._services.service_general_get('ServiceOrder/GetDeliverTo?wos=' + this.area.workOrderServicesId).subscribe(r => {
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
    return this.area.reminderAreaOrientations.sort((a, b) => {
      return <any>new Date(a.reminderDate) - <any>new Date(b.reminderDate);
    });
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
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=13").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.ca_estatus = data.result;
      }
    }))
  }
  //***************************************************************************//
  //CONSULTA DE  HOUSING LIST//
  getDataHousing() {
    this._services.service_general_get('HousingList/GetAllHousing?key=' + Number(this.data.workOrderId)).subscribe((data_housing => {//this.area_orientation.workOrderServicesId
      if (data_housing.success) {
        console.log('DATA CONSULTA HOUSING LIST: ', data_housing);
        this.dataSourceHousing = data_housing.message;
      }
    }));
  }
  //***************************************************************************//
  getDataSchool() {
    this._services.service_general_get('SchoolsList/GetAllSchool?sr=' + Number(localStorage.getItem('srAd'))).subscribe((data_schooling_list => {//this.area_orientation.workOrderServicesId
      console.log('DATA CONSULTA SCHOOLING LIST: ', data_schooling_list);
      if (data_schooling_list.success) {
        this.dataSourceSchool = data_schooling_list.message;
      }
    }));
  }
  //***************************************************************************//
  //CONSULTA DE  REQUEST PAYMENTS//
  public payment: any[] = [];
  getPayment() {
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.area.workOrderServicesId).subscribe((data => {
      if (data.success) {
        console.log(data.result);
        this.payment = data.result.value.payments;
        console.log(this.payment);
      }
      console.log(this.payment);
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
        data.data.areaOrientationId = this.area.id;
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
          this._services.service_general_delete('RelocationServices/DeleteDocumentAO?id=' + id).subscribe(r => {
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
    this.area.commentAreaOrientations.push({
      "id": 0,
      "areaOrientationId": this.area.id,
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
    this.area.reminderAreaOrientations.push({
      "id": 0,
      "areaOrientationId": this.area.id,
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
          this._services.service_general_delete('RelocationServices/DeleteReminderAO?id=' + id).subscribe(r => {
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
          this.area.reminderAreaOrientations.splice(i, 1);
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
  //GRADE//
  getGrade(id) {
    for (let i = 0; i < this.ca_grade.length; i++) {
      if (this.ca_grade[i].id == id) {
        return this.ca_grade[i].grade;
      }
    }
  }
  //***************************************************************************//
  //AGREGAR HIJO//
  addChild(e, pos) {
    console.log(e);
    if (this.area.schoolingAreaOrientations.length > 0) {
      if (e.detail.checked) {
        this.area.schoolingAreaOrientations[pos].active = true;
      } else {
        this.area.schoolingAreaOrientations[pos].active = false;
      }
    } else {
      this.general_messages({
        title: "Success",
        body: "No data child",
        success: true
      });
    }
  }
  //***************************************************************************//
  //DELETE CHILD//
  deleteChild(pos) {
    this.area.schoolingAreaOrientations[pos].active = false;
    this.general_messages({
      title: "Success",
      body: "Child was deleted",
      success: true
    });
  }
  //***************************************************************************//
  //FUNCION PARA GUARDAR INFORMACION//
  save() {
    this.loader.loadingPresent();
    console.log("SAVE INFORMATION: ", this.area);
    this.area.documentAreaOrientations = this.temporalDocument;
    this.area.updateBy = this.userData.id;
    this.area.updatedDate = new Date();
    this.area.createdBy = this.userData.id;
    this.area.createdDate = new Date();
    this.area.authoDateExtension = new Date();
    this.area.authoAcceptanceDateExtension = new Date();


    let data_comment_aux = this.area.commentAreaOrientations;
    this.area.commentAreaOrientations = [];

    for (let i = 0; i < data_comment_aux.length; i++) {
      if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
        this.area.commentAreaOrientations.push(data_comment_aux[i]);
      }
    }

    console.log(this.area);
    this._services.service_general_put("RelocationServices/PutAreaOrientation", this.area).subscribe((data => {
      if (data.success) {
        console.log(data);
        this.general_messages({
          title: "Success",
          body: "Area Orientation was updated",
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
  //**********************************************************************//
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
  //*********************************************************************//
  viewDoc(doc){
    this.iab.create(this._services.url_images+doc,'_system')
  }
}
