import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ActionSheetController } from '@ionic/angular';
import { GeneralService } from 'src/app/general/general.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { LoadingService } from 'src/app/general/loader.service';
import { GeneralMensagePage } from '../general-mensage/general-mensage.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ConfirmationPage } from '../confirmation/confirmation.page';

@Component({
  selector: 'app-report-event',
  templateUrl: './report-event.page.html',
  styleUrls: ['./report-event.page.scss'],
})
export class ReportEventPage implements OnInit {

  public addComment_: boolean = false;
  public comment_data: any = {};
  public userData: any = {};
  public report: any = {
    id: 0,
    idReport: 0,
    assignedPhotos: [],
    commentReportAnEvents: [],
    supplierConsultantPhotos: []
  };

  public __userlog__: any = JSON.parse(localStorage.getItem('userData'));
  public type_user: any;
  public show_status_event : boolean = false;
  public disabled : boolean = false;
  constructor(public actionSheetController: ActionSheetController, private camera: Camera, public loader: LoadingService, public modalController: ModalController, public _services: GeneralService, public navParams: NavParams) { }


  ionViewWillEnter() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    const user_rol: string[] = [this.__userlog__.role.id];
    this.type_user = user_rol;

    console.log("Data recibida al modal Report An Event: ", this.navParams.data);
    if (this.navParams.data.id != 0) {
      this.report = this.navParams.data;
      console.log(this.report);
    } else {
      this.report.idReport = this.navParams.data.idReport;
      console.log(this.report);
    }
    this.getCatalogs();
  }

  ngOnInit() {
  }
  //***********************************************************************************//
  public catalog_severity = [];
  public statusReport = [];
  public status_event = [];
  async getCatalogs() {
    this.catalog_severity = await this._services.getCatalogueFrom('GetSeverity');
    this.statusReport = await this._services.getCatalogueFrom('GetStatusReportAnEvent');
    this.status_event = await this._services.getCatalogueFrom('GetEvent');
  }
  //***************************************************************************//
  //FUNCION PARA AGREGAR REPLICA//
  public temporalComment = [];
  addComment() {
    this.temporalComment.push({
      "id": 0,
      "reportAnEventId": this.report.id,
      "comment": this.comment_data.comments,
      "userId": this.userData.id,
      "createdBy": this.userData.id,
      "createdDate": new Date(),
      "updatedBy": this.userData.id,
      "updatedDate": new Date(),
      "user": this.userData
    })
    this.addComment_ = false;
    this.comment_data.comments = '';
  }
  //***********************************************************************************//
  back() {
    let back: any = document.getElementById('back');
    back.play();
    this.modalController.dismiss();
  }
  //***********************************************************************************//
  save() {
    this.report.success = true;
    this.report.commentReportAnEvents = this.temporalComment;
    if (this.report.id != 0) {
      this.updateData();
    } else {
      //this.postData();
      this.modalController.dismiss(this.report);
    }
  }
  //***********************************************************************************//
  //FUNCION PARA GUARDAR INFORMACION//
  postData() {
    this.loader.loadingPresent();
    
    this.report.commentReportAnEvents = [];
    this.report.commentReportAnEvents = this.temporalComment;
    let data_comment_aux = this.report.commentReportAnEvents;
    this.report.commentReportAnEvents = [];

    for (let i = 0; i < data_comment_aux.length; i++) {
      if (data_comment_aux[i].comment != null && data_comment_aux[i].comment != undefined && data_comment_aux[i].comment.trim() != '') {
        this.report.commentReportAnEvents.push(data_comment_aux[i]);
      }
    }

    this.report.modal = '';
    console.log(this.report);

    this._services.service_general_post_with_url("RelocationServices/Add/ReportAnEvent", this.report).subscribe((data => {
      if (data.success) {
        console.log(data);
        this.general_messages({
          title: "Success",
          body: "Report an Event was saved",
          success: true
        });
        this.modalController.dismiss();
        this.loader.loadingDismiss();
        this.temporalComment = [];
        this.ionViewWillEnter();
      }
    }), (err) =>{
      console.log("err al insertar put report: ", err);
    })
  }
  //***********************************************************************************//
  //FUNCION PARA GUARDAR INFORMACION (EDICION)//
  updateData() {
    this.loader.loadingPresent();
    
    this.report.commentReportAnEvents = [];
    this.report.commentReportAnEvents = this.temporalComment;
    let data_comment_aux = this.report.commentReportAnEvents;
    this.report.commentReportAnEvents = [];

    for (let i = 0; i < data_comment_aux.length; i++) {
      if (data_comment_aux[i].comment != null && data_comment_aux[i].comment != undefined && data_comment_aux[i].comment.trim() != '') {
        this.report.commentReportAnEvents.push(data_comment_aux[i]);
      }
    }

    this.report.modal = '';
    console.log(this.report);

    this._services.service_general_put("RelocationServices/Edit/ReportAnEvent", this.report).subscribe((data => {
      if (data.success) {
        console.log(data);
        this.general_messages({
          title: "Success",
          body: "Report an Event was updated",
          success: true
        });
        this.modalController.dismiss();
        this.loader.loadingDismiss();
        this.temporalComment = [];
        this.ionViewWillEnter();
      }
    }), (err) =>{
      console.log("err al actualizar put report: ", err);
    })
  }
  //***********************************************************************************//
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
  //*************************************************************************************//
   async photo(type) {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }

          this.option(options, type);
        }
      }, {
        text: 'Galery',
        icon: 'images',
        handler: () => {
          const options: CameraOptions = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }
          this.option(options, type);
        }
      }]
    });
    await actionSheet.present();
  }
  //**********************************************************************//
  public interior = [];
  option(options, type) {
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let data_photo = {
              "id": 0,
              "reportAnEventId": this.report.id,
              "photoPath": imageData,
              "photoExtension": 'jpeg',
              "photoName": new Date(),
              "b64": base64Image,
              "createdBy": this.userData.id,
              "createdDate": new Date(),
              "updateBy": this.userData.id,
              "updatedDate": new Date()
      }
      if(type == 1){
        this.report.assignedPhotos.push(data_photo);
      }else if(type == 2){
        this.report.supplierConsultantPhotos.push(data_photo);
      }

      console.log("PHOTOS: ", this.report);
    }, (err) => {
      console.log("error: ", err);
    });
  }
  //**************************************************************************************//
  statusAssignee(item){
    console.log(item);
  }
  //**************************************************************************************//
  //*************************************************************************************//
  async deletePhoto(item, i){
    const modal = await this.modalController.create({
      component: ConfirmationPage,
      cssClass: 'modal-general-confirm',
      componentProps: {
        header: "Delete",
        body: "Do you want delete this Photo?",
        yesText: 'Yes, delete',
        noText: 'No, continue',
      }
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
      if (data.data) {
        if (item.id != 0) {
          this._services.service_general_delete('RelocationServices/Photo/SupplierConsultant?id=' + item.id).subscribe(r => {
            if (r.success) {
              this.general_messages({
                title: "Success",
                body: "Photo was deleted",
                success: true
              });
              this.modalController.dismiss();
            }
          })

        } else {
          this.report.supplierConsultantPhotos.splice(i, 1);
        }
      }
    })
    this.modalController.dismiss();
    await modal.present();
  }
}
