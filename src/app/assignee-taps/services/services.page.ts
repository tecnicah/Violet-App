import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BundlePage } from 'src/app/dialog/bundle/bundle.page';
import { GeneralService } from 'src/app/general/general.service';
import { LoadingService } from 'src/app/general/loader.service';
import { ServicesDetailsPage } from './services-details/services-details.page';


@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {

  constructor(public router: Router,
    public service: GeneralService,
    public modalController: ModalController,
    public loadingService: LoadingService) { }

  servicesType: number;
  services: any[] = [];
  country_catalogue: any[] = [];
  userData: any = {};
  caDependet: any[] = [];
  caCity: any[] = [];
  caStatus: any[] = [];
  filtes: any = {
    status: null,
    deliveryTo: null
  };

  ngOnInit() {
    this.servicesType = 1;
  }

  Scroll(event) {
    this.service.onScroll(event);
  }

  public show_name_assignee: boolean = false;
  ionViewWillEnter() {
    console.log(window.screen.width);
    if (window.screen.width <= 500) {
      this.show_name_assignee = true;
    } else {
      this.show_name_assignee = false;
    }
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.userData = this.userData.assigneeInformations[0];
    this.catalogos();
    this.change();
  }

  async catalogos() {
    this.country_catalogue = await this.service.getCatalogueFrom('GetCountry');
    this.caDependet = await this.service.getCatalogueFrom('GetDependents?sr=' + localStorage.getItem('sr'));
    this.caCity = await this.service.getCatalogueFrom('GetCity');
    this.caStatus = await this.service.getCatalogueFrom('GetStatus');
  }

  change() {
    this.loadingService.loadingPresent();
    this.service.service_general_get('ServiceRecord/GetServices/' + localStorage.getItem('sr') + '?type=' + this.servicesType + '&status=' + this.filtes.status + '&deliverTo=' + this.filtes.deliveryTo).subscribe(r => {
      console.log(r);
      if (r.success) {
        r.map.value.home.forEach(E => {
          if (E.serviceType == "Bundled") {
            let number_services = E.service_name;
            E.service_name = 'Bundle No ' + number_services;
          }
        });
        r.map.value.home.forEach(E => {
          if (E.serviceType == "Package") {
            let number_services = E.service_name;
            E.service_name = 'Package No ' + number_services;
          }
        });

        r.map.value.host.forEach(E => {
          if (E.serviceType == "Bundle") {
            let number_services = E.service_name;
            E.service_name = 'Bundle' + number_services;
          }
        });

        r.map.value.host.forEach(E => {
          if (E.serviceType == "Package") {
            let number_services = E.service_name;
            E.service_name = 'Package' + number_services;
          }
        });
        this.services = r.map.value;
      }
      this.loadingService.loadingDismiss();
    })
  }

  getNationality(id) {
    for (let i = 0; i < this.country_catalogue.length; i++) {
      const element = this.country_catalogue[i];
      if (element.id == id) {
        return element.name;
      }
    }
  }

  getCity(id) {
    for (let i = 0; i < this.caCity.length; i++) {
      const element = this.caCity[i];
      if (element.id == id) {
        return element.city;
      }
    }
  }

  getName(id) {
    for (let i = 0; i < this.caDependet.length; i++) {
      const element = this.caDependet[i];
      if (element.id == id) {
        return element.name;
      }
    }

    return '';
  }

  serviceDetail(a) {
    switch (a.dialog_type) {
      case 1:
        this.entryvisa(a);
        break;
    }
  }

  back() {
    let back: any = document.getElementById('back');
    back.play()
    console.log(localStorage.getItem('back'));
    this.router.navigateByUrl(localStorage.getItem('back'));
  }

  async entryvisa(a) {
    const modal = await this.modalController.create({
      component: ServicesDetailsPage,
      backdropDismiss: true,
      componentProps: a
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.ionViewWillEnter();
    })
    this.modalController.dismiss();

    await modal.present();
  }

  switchModal(item, type) {
    if (item.serviceType == "Bundled" || item.serviceType == "Package") {
      this.open_bundle(item, type);
    } else {
      this.open_service(item, type);
    }
  }

  async open_bundle(item, type) {
    if (type == 1) {
      item.homecountry = this.getNationality(this.userData.homeCountryId);
      item.homecity = this.getCity(this.userData.homeCityId);
    } else {
      item.homecountry = this.getNationality(this.userData.hostCountryId);
      item.homecity = this.getCity(this.userData.hostCityId);
    }
    item.type = type;
    const modal = await this.modalController.create({
      component: BundlePage,
      backdropDismiss: true,
      componentProps: item
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.ionViewWillEnter();
    })
    this.modalController.dismiss();
    await modal.present();
  }


  async open_service(item, type) {

    if (type == 1) {
      item.homecountry = this.getNationality(this.userData.homeCountryId);
      item.homecity = this.getCity(this.userData.homeCityId);
    } else {
      item.homecountry = this.getNationality(this.userData.hostCountryId);
      item.homecity = this.getCity(this.userData.hostCityId);
    }
    item.type = type;
    localStorage.removeItem('data_service');
    let ModalToOpen;
    console.log(item);
    switch (item.dialog_type) {
      case 1:
        //ModalToOpen = EntryVisaPage;
        localStorage.setItem('data_service', JSON.stringify(item));
        this.router.navigateByUrl('assignee-taps/entry');

        break;

      case 2:
        //ModalToOpen = WorkPermitPage;
        localStorage.setItem('data_service', JSON.stringify(item));
        this.router.navigateByUrl('assignee-taps/work');
        break;

      case 3:
        //ModalToOpen = VisaRegistrationPage;
        localStorage.setItem('data_service', JSON.stringify(item));
        this.router.navigateByUrl('assignee-taps/visa');
        break;

      case 4:
        //ModalToOpen = RecidencyPermitPage;
        localStorage.setItem('data_service', JSON.stringify(item));
        this.router.navigateByUrl('assignee-taps/recidency');
        break;

      case 5:
        //ModalToOpen = DocumentManagementPage;
        localStorage.setItem('data_service', JSON.stringify(item));
        this.router.navigateByUrl('assignee-taps/document');
        break;

      case 6:
        //ModalToOpen = LocalDocumentationPage;
        localStorage.setItem('data_service', JSON.stringify(item));
        this.router.navigateByUrl('assignee-taps/local');
        break;

      case 7:
        //ModalToOpen = CorporateAssiatancePage;
        localStorage.setItem('data_service', JSON.stringify(item));
        this.router.navigateByUrl('assignee-taps/corporate');
        break;

      case 8:
        //ModalToOpen = RenewalPage;
        localStorage.setItem('data_service', JSON.stringify(item));
        this.router.navigateByUrl('assignee-taps/renewal');
        break;

      case 9:
        //ModalToOpen = NotificationPage;
        localStorage.setItem('data_service', JSON.stringify(item));
        this.router.navigateByUrl('assignee-taps/noti');
        break;

      case 10:
        //ModalToOpen = LegalReviewPage;
        localStorage.setItem('data_service', JSON.stringify(item));
        this.router.navigateByUrl('assignee-taps/legal');
        break;

      case 12:
        //ModalToOpen = PredecisionOrientatonPage;
        localStorage.setItem('data_service', JSON.stringify(item));
        this.router.navigateByUrl('assignee-taps/predecision');
        break;

      case 13:
        //ModalToOpen = AreaOrientationPage;
        localStorage.setItem('data_service', JSON.stringify(item));
        this.router.navigateByUrl('assignee-taps/area');
        break;

      case 14:
        //ModalToOpen = SettlingInPage;
        localStorage.setItem('data_service', JSON.stringify(item));
        this.router.navigateByUrl('assignee-taps/settling');
        break;

      case 15:
        //ModalToOpen = SchoolSearchPage;
        localStorage.setItem('data_service', JSON.stringify(item));
        this.router.navigateByUrl('assignee-taps/school');
        break;

      case 16:
        //ModalToOpen = DeparturePage;
        localStorage.setItem('data_service', JSON.stringify(item));
        this.router.navigateByUrl('assignee-taps/departure');
        break;

      case 17:
        //ModalToOpen = TemporaryHousingPage;
        localStorage.setItem('data_service', JSON.stringify(item));
        this.router.navigateByUrl('assignee-taps/temporary');
        break;

      case 18:
        //ModalToOpen = RentalFurnitureCoordinationPage;
        localStorage.setItem('data_service', JSON.stringify(item));
        this.router.navigateByUrl('assignee-taps/rental');
        break;

      case 19:
        //ModalToOpen = TransportationPage;
        localStorage.setItem('data_service', JSON.stringify(item));
        this.router.navigateByUrl('assignee-taps/transport');
        break;

      case 20:
        //ModalToOpen = AirportTransportationPage;
        localStorage.setItem('data_service', JSON.stringify(item));
        this.router.navigateByUrl('assignee-taps/airport');
        break;

      case 21:
        //ModalToOpen = HomeFindingPage;
        localStorage.setItem('data_service', JSON.stringify(item));
        this.router.navigateByUrl('assignee-taps/homeFind');
        break;


      case 22:
        //ModalToOpen = HomeFindingPage;
        localStorage.setItem('data_service', JSON.stringify(item));
        this.router.navigateByUrl('assignee-taps/leaseRenewal');
        break;

      case 23:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.router.navigateByUrl('assignee-taps/homeSale');
        break;

      case 24:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.router.navigateByUrl('assignee-taps/homePurchanse');
        break;

      case 25:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.router.navigateByUrl('assignee-taps/propertyManagement');
        break;

      case 26:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.router.navigateByUrl('assignee-taps/Others');
        break;

      case 27:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.router.navigateByUrl('assignee-taps/tenancy');
        break;

      case 28:
        localStorage.setItem('data_service', JSON.stringify(item));
        this.router.navigateByUrl('assignee-taps/OthersImmigration');
        break;
    }

    /*
    const modal = await this.modalController.create({
      component: ModalToOpen,
      backdropDismiss: true,
      componentProps: item
    });
  
    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.ionViewWillEnter();
    })
    this.modalController.dismiss();
    await modal.present();
    */
  }

  /*
  async open_service(item, type) {
  
    if (type == 1) {
      item.homecountry = this.getNationality(this.userData.homeCountryId);
      item.homecity = this.getCity(this.userData.homeCityId);
    } else {
      item.homecountry = this.getNationality(this.userData.hostCountryId);
      item.homecity = this.getCity(this.userData.hostCityId);
    }
  
    item.type = type;
  
    let ModalToOpen;
    switch (item.dialog_type) {
      case 1:
        ModalToOpen = EntryVisaPage;
        break;
  
      case 2:
        ModalToOpen = WorkPermitPage;
        break;
  
      case 3:
        ModalToOpen = VisaRegistrationPage;
        break;
  
      case 4:
        ModalToOpen = RecidencyPermitPage;
        break;
  
      case 5:
        ModalToOpen = DocumentManagementPage;
        break;
  
      case 6:
        ModalToOpen = LocalDocumentationPage;
        break;
  
      case 7:
        ModalToOpen = CorporateAssiatancePage;
        break;
  
      case 8:
        ModalToOpen = RenewalPage;
        break;
  
      case 9:
        ModalToOpen = NotificationPage;
        break;
  
      case 10:
        ModalToOpen = LegalReviewPage;
        break;
  
      case 12:
        ModalToOpen = PredecisionOrientatonPage;
        break;
  
      case 13:
        ModalToOpen = AreaOrientationPage;
        break;
  
      case 14:
        ModalToOpen = SettlingInPage;
        break;
  
      case 15:
        ModalToOpen = SchoolSearchPage;
        break;
  
      case 16:
        ModalToOpen = DeparturePage;
        break;
  
      case 17:
        ModalToOpen = TemporaryHousingPage;
        break;
  
      case 18:
        ModalToOpen = RentalFurnitureCoordinationPage;
        break;
  
      case 19:
        ModalToOpen = TransportationPage;
        break;
  
      case 20:
        ModalToOpen = AirportTransportationPage;
        break;
  
      case 21:
        ModalToOpen = HomeFindingPage;
        break;
    }
  
    const modal = await this.modalController.create({
      component: ModalToOpen,
      backdropDismiss: true,
      componentProps: item
    });
  
    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.ionViewWillEnter();
    })
    this.modalController.dismiss();
    await modal.present();
  }
  */


}
