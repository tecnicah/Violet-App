import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/general/general.service';
import { ModalController, NavParams, ActionSheetController } from '@ionic/angular';
import { LoadingService } from 'src/app/general/loader.service';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-add-dependent',
  templateUrl: './add-dependent.page.html',
  styleUrls: ['./add-dependent.page.scss'],
})
export class AddDependentPage implements OnInit {

  constructor( private camera: Camera, public actionSheetController: ActionSheetController,public router: Router,
    public service: GeneralService,
    public navParams: NavParams,
    public modalController: ModalController,
    public loadingService: LoadingService,
    public loader:LoadingService) { }


  public data_:any = {
    id: 0,
    languageDependentInformations: [],
    assigneeInformationId: 0,
    email: '',
    ifOther: '',
    phone: '',
    photo: '',
    photoExtension: '',
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
  public relationship_catalogue = [];
  public gender_catalogue = [];
  public languages_catalogue = [];
  public country_catalogue = [];
  public schoolgrades_catalogue = [];
  async getCatalogos(){
    this.schoolgrades_catalogue = await this.service.getCatalogueFrom('GetGradeSchooling');
    this.country_catalogue = await this.service.getCatalogueFrom('GetCountry');
    this.languages_catalogue = await this.service.getCatalogueFrom('GetLanguages');
    this.gender_catalogue = await this.service.getCatalogueFrom('GetSex');
    this.relationship_catalogue = await this.service.getCatalogueFrom('GetRelationship');
    console.log(this.relationship_catalogue);
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
    if(this.data_.idiomas && this.data_.idiomas.length>0){
      for(let i = 0; i < this.data_.idiomas.length; i++){
        this.data_.languageDependentInformations.push({
          "dependent": 0,
          "language": this.data_.idiomas[i]
        })
      }
    }
    this.data_.assigneeInformationId = this.info_assignee.id
    console.log(this.data_);
    this.info_assignee.assigneeInformations[0].dependentInformations.push(this.data_);
    console.log(this.info_assignee);
    this.service.service_general_put("ServiceRecord/Update", this.info_assignee).subscribe((data => {
      if (data.success) {
        console.log(data);
        this.general_messages({
          title: "Success",
          body: "Dependent saved",
          success: true
        });
        this.loader.loadingDismiss();
        this.back();
      }
    }))
  }


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
  //***********************************************************//
  back(){
    let back: any = document.getElementById('back');
    back.play();
    this.modalController.dismiss();
  }
  //***********************************************************//
  //CALCULO DE EDAD//
  public calculateHowOld(){
    const my_bd:any = this.data_.birth;
    let newDate = new Date(my_bd)
    if( my_bd != null || my_bd != '' ) {
        var timeDiff = Math.abs(Date.now() - newDate.getTime());
        this.data_.age = Math.ceil((timeDiff / (1000 * 3600 * 24)) / 365);
    }else {
      this.data_.age = null;
    }
}
}
