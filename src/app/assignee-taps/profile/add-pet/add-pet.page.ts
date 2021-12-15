import { Component, OnInit } from '@angular/core';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/general/general.service';
import { NavParams, ModalController, ActionSheetController } from '@ionic/angular';
import { LoadingService } from 'src/app/general/loader.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.page.html',
  styleUrls: ['./add-pet.page.scss'],
})
export class AddPetPage implements OnInit {

  constructor(private camera: Camera, public actionSheetController: ActionSheetController,public router: Router,
    public service: GeneralService,
    public navParams: NavParams,
    public modalController: ModalController,
    public loader: LoadingService) { }


  public data_:any = {
   id:0,
   photoExtension: '',
   photo: '',
  };
  public userData:any;
  public sr:any;
  public info_assignee:any;
  //***************************************************************//
  ionViewWillEnter() {
    this.info_assignee = this.navParams.data.data;
    console.log("assignee", this.info_assignee);
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.sr = localStorage.getItem('sr');
    this.getCatalogos();
  }
  //***************************************************************//
  ngOnInit() {
  }
  //***************************************************************//
  public pettype_catalogue = [];
  public CaBreed = [];
  public petsize_catalogue = [];
  public weightmeasure_catalogue = [];
  async getCatalogos(){
    this.weightmeasure_catalogue = await this.service.getCatalogueFrom('GetWeightMeasure');
    this.pettype_catalogue = await this.service.getCatalogueFrom('GetPetType');
    this.petsize_catalogue = await this.service.getCatalogueFrom('GetSize');
  }
  //***************************************************************//
  public GetBreed() {
    this.service.service_general_get("Catalogue/GetBreed?id=" + this.data_.petTypeId).subscribe((data => {
      if (data.success) {
        this.CaBreed = data.result;
      }
    }))
  }
  //***************************************************************//
  async photo() {
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

          this.option(options);
        }
      }, {
        text: 'Gallery',
        icon: 'images',
        handler: () => {
          const options: CameraOptions = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }
          this.option(options);
        }
      }]
    });
    await actionSheet.present();
  }
  //**********************************************************************//
  option(options) {
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let name = new Date().toISOString();
      this.data_.photoExtension = 'jpeg';
      this.data_.photo = imageData;
      this.data_.b64 = base64Image;
      document.getElementById('imagen').setAttribute('src',''+this.data_.b64)
    }, (err) => {
      // Handle error
    });
  }
  //***************************************************************//
  save(){
    this.loader.loadingPresent();
    this.data_.assigneeInformationId  = this.info_assignee.id;
    console.log(this.data_);
  
    this.info_assignee.assigneeInformations[0].petsNavigation.push(this.data_);
    console.log(this.info_assignee);
    this.service.service_general_put("ServiceRecord/Update", this.info_assignee).subscribe((data => {
      if (data.success) {
        console.log(data);
        this.general_messages({
          title: "Success",
          body: "Pet saved",
          success: true
        });
        this.loader.loadingDismiss();
        this.back();
      }
    }))
    
  }
  //***************************************************************//
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
  //***************************************************************//
  back(){
    let back: any = document.getElementById('back');
    back.play();
    this.modalController.dismiss();
  }
  //***************************************************************//
  public calculateHowOld(){
    const my_bd:any = this.data_.birthDate;
    let newDate = new Date(my_bd)
    if( my_bd != null || my_bd != '' ) {
        var timeDiff = Math.abs(Date.now() - newDate.getTime());
        this.data_.age = Math.ceil((timeDiff / (1000 * 3600 * 24)) / 365);
    }else {
      this.data_.age = null;
    }
}
}
