import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { GeneralService } from 'src/app/general/general.service';
import { LoadingService } from 'src/app/general/loader.service';

@Component({
  selector: 'app-bundle',
  templateUrl: './bundle.page.html',
  styleUrls: ['./bundle.page.scss'],
})
export class BundlePage implements OnInit {

  constructor(public modalController: ModalController,
    public _service: GeneralService, public loader: LoadingService,
    public navParams: NavParams, public router: Router) { }



  ngOnInit() {
  }

  public services_bundle = [{
    services: []
  }];

  ionViewWillEnter() {
    this.loader.loadingPresent();
    console.log(this.navParams.data);
    let WordOrderId = this.navParams.data.workOrderId;
    this._service.service_general_get("ServiceOrder/GetBundledService?wo=" + WordOrderId).subscribe((data => {
      console.log(data);
      if (data.success) {
        for (let i = 0; i < data.result.value.length; i++) {
          const element = data.result.value[i];
          for (let j = 0; j < element.services.length; j++) {
            element.authoTime = new Date(element.services[j].autho);
          }
        }
        this.services_bundle = data.result.value;
        this.loader.loadingDismiss
        console.log(this.services_bundle);
      }
    }))
    this.loader.loadingDismiss();
  }

  back() {
    let back: any = document.getElementById('back');
    back.play();
    this.modalController.dismiss();
  }

  openService(item) {
    item.homecountry = this.navParams.data.homecountry;
    item.homecity = this.navParams.data.homecity;
    item.type = this.navParams.data.type;
    console.log("data del servicio elegido: ", item);
    console.log("data recibida en modal: ", this.navParams.data);
    switch (item.categoryId) {
      case 1:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.modalController.dismiss();
        this.router.navigateByUrl('assignee-taps/entry');
        break;

      case 2:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.modalController.dismiss();
        this.router.navigateByUrl('assignee-taps/work');
        break;

      case 3:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.modalController.dismiss();
        this.router.navigateByUrl('assignee-taps/visa');
        break;

      case 4:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.modalController.dismiss();
        this.router.navigateByUrl('assignee-taps/recidency');
        break;

      case 5:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.modalController.dismiss();
        this.router.navigateByUrl('assignee-taps/document');
        break;

      case 6:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.modalController.dismiss();
        this.router.navigateByUrl('assignee-taps/local');
        break;

      case 7:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.modalController.dismiss();
        this.router.navigateByUrl('assignee-taps/corporate');
        break;

      case 8:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.modalController.dismiss();
        this.router.navigateByUrl('assignee-taps/renewal');
        break;

      case 9:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.modalController.dismiss();
        this.router.navigateByUrl('assignee-taps/noti');
        break;

      case 10:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.modalController.dismiss();
        this.router.navigateByUrl('assignee-taps/legal');
        break;

      case 12:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.modalController.dismiss();
        this.router.navigateByUrl('assignee-taps/predecision');
        break;

      case 13:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.modalController.dismiss();
        this.router.navigateByUrl('assignee-taps/area');
        break;

      case 14:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.modalController.dismiss();
        this.router.navigateByUrl('assignee-taps/settling');
        break;

      case 15:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.modalController.dismiss();
        this.router.navigateByUrl('assignee-taps/school');
        break;

      case 16:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.modalController.dismiss();
        this.router.navigateByUrl('assignee-taps/departure');
        break;

      case 17:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.modalController.dismiss();
        this.router.navigateByUrl('assignee-taps/temporary');
        break;

      case 18:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.modalController.dismiss();
        this.router.navigateByUrl('assignee-taps/rental');
        break;

      case 19:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.modalController.dismiss();
        this.router.navigateByUrl('assignee-taps/transport');
        break;

      case 20:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.modalController.dismiss();
        this.router.navigateByUrl('assignee-taps/airport');
        break;

      case 21:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.modalController.dismiss();
        this.router.navigateByUrl('assignee-taps/homeFind');
        break;

      case 22:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.modalController.dismiss();
        this.router.navigateByUrl('assignee-taps/leaseRenewal');
        break;

      case 23:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.modalController.dismiss();
        this.router.navigateByUrl('assignee-taps/homeSale');
        break;

      case 24:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.modalController.dismiss();
        this.router.navigateByUrl('assignee-taps/homePurchanse');
        break;

      case 25:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.modalController.dismiss();
        this.router.navigateByUrl('assignee-taps/propertyManagement');
        break;

      case 26:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.modalController.dismiss();
        this.router.navigateByUrl('assignee-taps/Others');
        break;

      case 27:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.modalController.dismiss();
        this.router.navigateByUrl('assignee-taps/tenancy');
        break;

      case 28:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.modalController.dismiss();
        this.router.navigateByUrl('assignee-taps/OthersImmigration');
        break;
    }
  }
}


