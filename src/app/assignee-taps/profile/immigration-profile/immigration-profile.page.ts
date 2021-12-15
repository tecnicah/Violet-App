import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ConfirmationPage } from 'src/app/dialog/confirmation/confirmation.page';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { GeneralService } from 'src/app/general/general.service';
import { LoadingService } from 'src/app/general/loader.service';

@Component({
  selector: 'app-immigration-profile',
  templateUrl: './immigration-profile.page.html',
  styleUrls: ['./immigration-profile.page.scss'],
})
export class ImmigrationProfilePage implements OnInit {

  constructor(public modalController: ModalController,
    public _service: GeneralService,
    public navParams: NavParams,
    public loadingService: LoadingService) { }

    userData: any = {};
    info: any;
    caVisa: any[] = [];
    caHighestLevelEducation: any[] = [];
    caLanguages: any[] = [];
    caProficiency: any[] = [];
    caCurrency:any[]=[];
    caRelation:any[]=[];

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.catalogos();
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.info = this.navParams.data;
    this.info.modal = null;
    console.log(this.info);
  }

  async catalogos(){
    this.caVisa                  = await this._service.getCatalogueFrom('GetVisaCategory');
    this.caHighestLevelEducation = await this._service.getCatalogueFrom('GetHighestLevelEducation');
    this.caLanguages             = await this._service.getCatalogueFrom('GetLanguages');
    this.caProficiency           = await this._service.getCatalogueFrom('GetProficiency');
    this.caCurrency           = await this._service.getCatalogueFrom('GetCurrency');
    this._service.service_general_get("ServiceRecord/GetApplicant/"+localStorage.getItem('sr')).subscribe((data => {
      console.log(data);
      if(data.success){
        this.caRelation = data.applicant.value;
        console.log(this.caRelation);
      }
    }))
  }

  addSchool(){
    this.info.educationalBackgrounds.push({
      degree: "",
      endDate: "",
      fieldStudy: "",
      id: 0,
      immigrationProfileId: this.info.id,
      institution: "",
      listProfessionalLicenses: "",
      startDate: "",
    })
  }

  async deleteSchool(i){
    const modal = await this.modalController.create({
      component: ConfirmationPage,
      cssClass: 'modal-general-confirm',
      componentProps: {
        header: "Delete",
        body: "Are you sure delete this item?",
        yesText: 'Yes,delete',
        noText: 'No, cancel',
      }
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
      if(data.data){
        this.info.educationalBackgrounds.splice(i,1);
      }
    })
        
    this.modalController.dismiss();
    
    await modal.present();
  }

  addLanguage(){
    this.info.lenguageProficiencies.push({
      comments: "",
      id: 0,
      immigrationProfileId: this.info.id,
      languageId: 0,
      proficiencyId: 0
    })
  }

  async removeLanguage(i){
    const modal = await this.modalController.create({
      component: ConfirmationPage,
      cssClass: 'modal-general-confirm',
      componentProps: {
        header: "Delete",
        body: "Are you sure delete this item?",
        yesText: 'Yes,delete',
        noText: 'No, cancel',
      }
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
      if(data.data){
        this.info.lenguageProficiencies.splice(i,1);
      }
    })
        
    this.modalController.dismiss();
    
    await modal.present();
    
  }

  back(){
    let back : any = document.getElementById('back');
    back.play();
    this.modalController.dismiss();
  }

  save(){
    console.log("Informacion a guardar: ",this.info );

    this.loadingService.loadingPresent();
    this._service.service_general_put('ImmigrationProfile/UpdateImmigrationProfileProvisional', this.info).subscribe(data => {
      console.log(data);
      this.loadingService.loadingDismiss();
      this.general_messages({
        title: "Success",
        body: "Edited information",
        success: true
      });
    })
  }

  async general_messages(data){
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
}
