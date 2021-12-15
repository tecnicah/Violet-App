import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { GeneralService } from 'src/app/general/general.service';
import { LoadingService } from 'src/app/general/loader.service';

@Component({
  selector: 'app-housing-specifications',
  templateUrl: './housing-specifications.page.html',
  styleUrls: ['./housing-specifications.page.scss'],
})
export class HousingSpecificationsPage implements OnInit {

  constructor(public modalController: ModalController,
    public _service: GeneralService,
    public navParams: NavParams,
    public loadingService: LoadingService) { }

  userData: any = {};
  amenities: any[] = [];
  caContracType: any[] = [];
  caPropertyType: any[] = [];
  caNumbers: any[] = [];
  caCurrency: any[] = [];
  caSize: any[] = [];
  caMetric: any[] = [];
  info: any = {};

  ngOnInit() {
  }
  
  ionViewWillEnter(){
    this.info = this.navParams.data;
    this.info.modal = "";
    console.log(this.info);
    this.userData = JSON.parse(localStorage.getItem('userData'));

    this.catalogs();
  }

  async catalogs(){
    this.amenities     = await this._service.getCatalogueFrom('GetAmenity');
    this.caContracType = await this._service.getCatalogueFrom('GetContractType');
    this.caPropertyType= await this._service.getCatalogueFrom('GetPropertyTypeHousing');
    this.caCurrency    = await this._service.getCatalogueFrom('GetCurrency');
    this.caSize        = await this._service.getCatalogueFrom('GetSize');
    this.caMetric      = await this._service.getCatalogueFrom('GetMetric');

    for (let i = 0; i < 11; i++) {
      this.caNumbers.push(i);      
    }

    for (let j = 0; j < this.amenities.length; j++) {
      for (let i = 0; i < this.info.relHousingAmenities.length; i++) {
        if(this.info.relHousingAmenities[i].amenitieId == this.amenities[j].id){
          this.amenities[j].check = true;
        }     
      }      
    }
  }
  
  back(){
    let back : any = document.getElementById('back');
    back.play();
    this.modalController.dismiss();
  }

  save(){
    this.loadingService.loadingPresent();
    let amenities = [];
    for (let i = 0; i < this.amenities.length; i++) {
      const element = this.amenities[i];
      if(element.check){
        amenities.push({
          amenitieId: element.id,
          housingSpecificationId: this.info.id
        })
      }      
    }
    this.info.relHousingAmenities = amenities;
    console.log(this.info);
    if (this.info.id == 0) {
      console.log("nuevo");
      this._service.service_general_post_with_url('HousingSpecification/CreateHousingSpecification', this.info).subscribe(r => {
        console.log(r);
        if(r.success){
          this.general_messages({
            title: "Success",
            body: "Recorded information",
            success: true
          });
        }
        this.loadingService.loadingDismiss();
      })
    } else {
      console.log("edit");
      this._service.service_general_put('HousingSpecification/PutCreateHousingSpecification', this.info).subscribe(r => {
        console.log(r);
        if(r.success){
          this.general_messages({
            title: "Success",
            body: "Edited information",
            success: true
          });
        }
        this.loadingService.loadingDismiss();
      })
    }
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
