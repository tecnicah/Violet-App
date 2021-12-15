import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general/general.service';
import { ModalController, NavParams, ActionSheetController } from '@ionic/angular';
import { DocumentVehicleDialogPage } from 'src/app/dialog/document-vehicle-dialog/document-vehicle-dialog.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.page.html',
  styleUrls: ['./add-vehicle.page.scss'],
})
export class AddVehiclePage implements OnInit {

  public data_vehiculo: any = {
    id: 0,
    documentVehicleConsultants: [],
    photosVehicleConsultants: []
  };
  public data_recibida: any;
  public userData: any;
  public interior = [];
  public exterior = [];
  public safety = [];
  constructor(public actionSheetController: ActionSheetController, private camera: Camera, public _services: GeneralService, public modalController: ModalController, public navParams: NavParams) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.data_recibida = this.navParams.data;
    console.log(this.data_recibida);
    if (this.data_recibida.id != 0) {
      this.data_vehiculo = this.data_recibida;
      for (let i = 0; i < this.data_vehiculo.photosVehicleConsultants.length; i++) {
        if (this.data_vehiculo.photosVehicleConsultants[i].interior == true) {
          this.interior.push(this.data_vehiculo.photosVehicleConsultants[i]);
        }
        if (this.data_vehiculo.photosVehicleConsultants[i].exterior == true) {
          this.exterior.push(this.data_vehiculo.photosVehicleConsultants[i]);
        }
        if (this.data_vehiculo.photosVehicleConsultants[i].safety == true) {
          this.safety.push(this.data_vehiculo.photosVehicleConsultants[i]);
        }
      }
    }
    this.catalogos();
  }

  public ca_vehiculo = [];
  public ca_documentType = [];
  public ca_privacy = [];
  async catalogos() {
    this.ca_vehiculo = await this._services.getCatalogueFrom('GetVehicleType');
    this.ca_documentType = await this._services.getCatalogueFrom('GetDocumentType');
    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
  }

  save() {
    this.data_vehiculo.modal = null;
    this.data_vehiculo.success = true;
    console.log(this.data_vehiculo);
    this.modalController.dismiss(this.data_vehiculo);
  }

  public nuevos_documentos = [];
  async addDocument() {
    const modal = await this.modalController.create({
      component: DocumentVehicleDialogPage
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      if (data.data.success) {
        data.data.vehicleConsultant = this.data_vehiculo.id;
        data.data.city = null;
        this.data_vehiculo.documentVehicleConsultants.push(data.data);
      }
    })
    this.modalController.dismiss();
    await modal.present();
  }

  back() {
    this.modalController.dismiss();
  }


  //***************************************************************//
  async photo(a, b, c) {
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

          this.option(options, a, b, c);
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
          this.option(options, a, b, c);
        }
      }]
    });
    await actionSheet.present();
  }
  //**********************************************************************//
  option(options, a, b, c) {
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let data_photo = {
        "id": 0,
        "vehicleConsultant": this.data_vehiculo.id,
        "photo": imageData,
        "photoExtension": 'jpeg',
        "interior": a,
        "exterior": b,
        "safety": c,
        "createdBy": this.userData.id,
        "createdDate": new Date(),
        "updatedBy": this.userData.id,
        "updatedDate": new Date(),
        "b64": base64Image
      }
      this.interior = [];
      this.exterior = [];
      this.safety = [];
      this.data_vehiculo.photosVehicleConsultants.push(data_photo);
      for (let i = 0; i < this.data_vehiculo.photosVehicleConsultants.length; i++) {
        if (this.data_vehiculo.photosVehicleConsultants[i].interior == true) {
          this.interior.push(this.data_vehiculo.photosVehicleConsultants[i]);
        }
        if (this.data_vehiculo.photosVehicleConsultants[i].exterior == true) {
          this.exterior.push(this.data_vehiculo.photosVehicleConsultants[i]);
        }
        if (this.data_vehiculo.photosVehicleConsultants[i].safety == true) {
          this.safety.push(this.data_vehiculo.photosVehicleConsultants[i]);
        }
      }
    }, (err) => {
      // Handle error
    });
  }


}
