import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { GeneralService } from 'src/app/general/general.service';
import { LoadingService } from 'src/app/general/loader.service';
import { EditProfilePage } from './edit-profile/edit-profile.page';
import { HousingSpecificationsPage } from './housing-specifications/housing-specifications.page';
import { ImmigrationProfilePage } from './immigration-profile/immigration-profile.page';
import { AddDependentPage } from './add-dependent/add-dependent.page';
import { AddPetPage } from './add-pet/add-pet.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public service: GeneralService,
    public router: Router,
    public modalController: ModalController,
    public loadingService: LoadingService) { }

  userData: any = {};
  info: any = {};
  relationship_catalogue: any[] = [];
  country_catalogue: any[] = [];
  CaBreed: any[] = [];
  pettype_catalogue: any[] = [];
  petsize_catalogue: any[] = [];
  hs: any;
  hs_boolean: boolean = false;
  immPrf: any = {};
  immPrf_boolean: boolean = false;
  allSR: any;

  ngOnInit() {
  }

  Scroll(event) {
    this.service.onScroll(event);
  }
  show_name_assignee : boolean = false;
  ionViewWillEnter() {
    console.log(window.screen.width);
    if(window.screen.width <= 500 ){
       this.show_name_assignee = true;
    }else{
      this.show_name_assignee = false;
    }
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.loadingService.loadingPresent();
    if (Number(localStorage.getItem('sr')) != 0) {
      this.service.service_general_get(`ServiceRecord/GetServiceRecordById?id=${localStorage.getItem('sr')}&user=${this.userData.id}`).subscribe(r => {
        console.log(r);
        if (r.success) {
          this.allSR = r.result;
          this.loadingService.loadingDismiss();
          let userData = JSON.parse(localStorage.getItem('userData'));
              userData.assigneeInformations[0] = r.result.assigneeInformations[0];
              localStorage.setItem('userData', JSON.stringify(userData));
          this.info = r.result.assigneeInformations[0];
          this.pet_Type();
          if(r.result.immigrationProfiles.length > 0){
            for (let i = 0; i < r.result.immigrationProfiles[0].dependentImmigrationInfos.length; i++) {
              const element = r.result.immigrationProfiles[0].dependentImmigrationInfos[i];
              for (let j = 0; j < this.info.dependentInformations.length; j++) {
                const e = this.info.dependentInformations[j];
                if (element.name == e.name) {
                  this.info.dependentInformations[j].documents = element.documentDependentImmigrationInfos;
                }
              }
            }
          }
          
          this.loadingService.loadingDismiss();
        }
      })
      this.catalogos();
    } else {
      this.service.service_general_get(`ServiceRecord/GetServiceRecordById?id=${localStorage.getItem('srAd')}&user=${localStorage.getItem('userId')}`).subscribe(r => {
        console.log(r);
        if (r.success) {
          this.allSR = r.result;

          this.info = r.result.assigneeInformations[0];
          this.pet_Type();
          this.loadingService.loadingDismiss();
          if (r.result.immigrationProfiles.length > 0) {
            for (let i = 0; i < r.result.immigrationProfiles[0].dependentImmigrationInfos.length; i++) {
              const element = r.result.immigrationProfiles[0].dependentImmigrationInfos[i];
              for (let j = 0; j < this.info.dependentInformations.length; j++) {
                const e = this.info.dependentInformations[j];
                if (element.name == e.name) {
                  this.info.dependentInformations[j].documents = element.documentDependentImmigrationInfos;
                }
              }
            }
          }
          console.log(this.info);
          this.loadingService.loadingDismiss();
          this.catalogos();
        }
      })
    }
    this.housingSpe();
    this.immProfile();
    this.loadingService.loadingDismiss();
  }

  housingSpe() {
    /*this.service.service_general_get('HousingSpecification/GetHousingSpecitifcationByServiceRecord?sr='+localStorage.getItem('sr')).subscribe(r=>{
      console.log(r);
      if(r.success){
        this.hs = r.result;
        this.hs_boolean = true;
      }
    })*/
  }

  immProfile() {
    if (Number(localStorage.getItem('sr')) != 0) {
      this.service.service_general_get('ImmigrationProfile/GetImmigrationProfile?sr=' + localStorage.getItem('sr')).subscribe(r => {
        console.log(r);
        if (r.success) {
          this.immPrf = r.result.value;
          if (this.immPrf != null) {
            this.immPrf_boolean = true;
          }
        }
      })
    } else {
      this.service.service_general_get('ImmigrationProfile/GetImmigrationProfile?sr=' + localStorage.getItem('srAd')).subscribe(r => {
        console.log(r);
        if (r.success) {
          this.immPrf = r.result.value;
          if (this.immPrf != null) {
            this.immPrf_boolean = true;
          }
        }
      })
    }
  }

  back() {
    console.log("back");
    let back: any = document.getElementById('back');
    back.play()
    let ruta = localStorage.getItem('back');
    /*if(ruta != undefined && ruta != null){
      this.router.navigateByUrl(ruta);
    }else{
      this.router.navigateByUrl('/assignee-taps/home');
    }*/
    this.router.navigateByUrl('/assignee-taps/home');
  }

  async catalogos() {
    this.relationship_catalogue = await this.service.getCatalogueFrom('GetRelationship');
    this.country_catalogue = await this.service.getCatalogueFrom('GetCountry');
    this.pettype_catalogue = await this.service.getCatalogueFrom('GetPetType');
    this.petsize_catalogue = await this.service.getCatalogueFrom('GetSize');
  }

  pet_Type(){
    for (let i = 0; i < this.info.petsNavigation.length; i++) {
      const element = this.info.petsNavigation[i];
      this.service.service_general_get("Catalogue/GetBreed?id=" + element.petTypeId).subscribe((data => {
        if (data.success) {
          this.CaBreed[i] = data.result;
        }
      }))
    }
  }

  getRelationShip(id) {
    for (let i = 0; i < this.relationship_catalogue.length; i++) {
      const element = this.relationship_catalogue[i];
      if (id == element.id) {
        return element.relationship;
      }
    }
  }

  getYears(date_in: any): number {

    const date_init = new Date(date_in),
      date_today = new Date();

    let diff = (date_init.getTime() - date_today.getTime()) / 1000;
    diff /= (60 * 60 * 24);

    return Math.abs(Math.round(diff / 365.25));

  }

  getNationality(id) {
    for (let i = 0; i < this.country_catalogue.length; i++) {
      const element = this.country_catalogue[i];
      if (element.id == id) {
        return element.name;
      }
    }
  }

  getPetType(id) {
    for (let i = 0; i < this.pettype_catalogue.length; i++) {
      const element = this.pettype_catalogue[i];
      if (id == element.id) {
        return element.petType;
      }
    }
  }

  GetBreed(id, i) {
    if (this.CaBreed[i]) {
      for (let j = 0; j < this.CaBreed[i].length; j++) {
        const element = this.CaBreed[i][j];
        if (id == element.id) {
          return element.breed;
        }
      }
    }
  }

  getSize(id) {
    for (let i = 0; i < this.petsize_catalogue.length; i++) {
      const element = this.petsize_catalogue[i];
      if (id == element.id) {
        return element.size;
      }
    }
  }

  async edit(a, data, i) {
    const modal = await this.modalController.create({
      component: EditProfilePage,
      backdropDismiss: true,
      componentProps: {
        type: a,
        data: data,
        allData: this.info,
        allSR: this.allSR,
        pos: i
      }
    })

    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.ionViewWillEnter();
    })

    await modal.present();
  }

  async housing(a) {
    const modal = await this.modalController.create({
      component: HousingSpecificationsPage,
      backdropDismiss: true,
      componentProps: a
    })

    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.housingSpe();
    })

    await modal.present();
  }

  async immigrationProfile(a) {
    if(this.immPrf_boolean == false){
      return true;
    }
    const modal = await this.modalController.create({
      component: ImmigrationProfilePage,
      backdropDismiss: true,
      componentProps: this.immPrf
    })

    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.immProfile();
    })

    await modal.present();
  }

  async addDependent(){
    const modal = await this.modalController.create({
      component: AddDependentPage,
      componentProps: {data:this.allSR}
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.ionViewWillEnter();
    })
    this.modalController.dismiss();
    // console.log(data);
    await modal.present();
  }

  async addPet(){
    const modal = await this.modalController.create({
      component: AddPetPage,
      componentProps: {data:this.allSR}
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.ionViewWillEnter();
    })
    this.modalController.dismiss();
    // console.log(data);
    await modal.present();
  }

}
