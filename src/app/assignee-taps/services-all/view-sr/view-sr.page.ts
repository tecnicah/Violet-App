import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { GeneralService } from 'src/app/general/general.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ConfirmationPage } from 'src/app/dialog/confirmation/confirmation.page';
import { ReportOfTheDayPage } from '../report-of-the-day/report-of-the-day.page';
import { AddActivitieItemPage } from '../add-activitie-item/add-activitie-item.page';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { RequestAdditionalTimePage } from '../request-additional-time/request-additional-time.page';
import { LoadingService } from 'src/app/general/loader.service';
import { BundlePage } from 'src/app/dialog/bundle/bundle.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-view-sr',
  templateUrl: './view-sr.page.html',
  styleUrls: ['./view-sr.page.scss'],
})
export class ViewSrPage implements OnInit {

  constructor(public router: Router, public ToastCtrl: ToastController,
    public service: GeneralService,
    public modalController: ModalController,
    public rutaActiva: ActivatedRoute,
    private callNumber: CallNumber,
    public loadingService: LoadingService,
    public navCtrl: NavController,
    private socialSharing: SocialSharing, ) { }

  userData: any = {};
  dataSR: any = {};
  coordinator: any = {
    name: "",
    lastName: "",
    motherLastName: "",
    phoneNumber: ""
  };
  immRel: number = 1;
  caCounty: any[] = [];
  services: any[] = [];
  caStatus: any[] = [];
  ca_partner: any[] = [];
  ca_policy: any[] = [];
  deliveryTo: any[] = [];
  userFilter: any = {
    statusId: '',
    deliveredToId: ''
  }
  userFilters: any = {
    homeHost: 1
  };
  dataSourceReport: any[] = [];
  dataActivityItems: any[] = [];
  apointments: any[] = [];
  caCity: any[] = [];

  ngOnInit() {
    this.getData();
    this.userData = JSON.parse(localStorage.getItem('userData'));
    console.log("user: ", this.userData);
  }

  public show_name_assignee: boolean = false;
  ionViewWillEnter() {
    console.log(window.screen.width);
    if (window.screen.width <= 500) {
      this.show_name_assignee = true;
    } else {
      this.show_name_assignee = false;
    }
    console.log(this.rutaActiva.snapshot.params.id);
    localStorage.setItem('srAd', this.rutaActiva.snapshot.params.id);
    console.log(this.rutaActiva.snapshot.params.id);
    this.userData = JSON.parse(localStorage.getItem('userData'));
    console.log(this.userData);
    this.getData();
    this.catalogos();
  }

  async catalogos() {
    this.caCounty = await this.service.getCatalogueFrom('GetCountry');
    this.caStatus = await this.service.getCatalogueFrom('GetStatusWorkOrder');
    console.log(this.caStatus);
    this.ca_partner = await this.service.getCatalogueFrom('GetPartner');
    this.ca_policy = await this.service.getCatalogueFrom('GetPolicyType');
    this.caCity = await this.service.getCatalogueFrom('GetCity');
    this.service.service_general_get(`ServiceRecord/GetApplicant/${this.dataSR.id}`)
      .subscribe((response: any) => {
        console.log(response);
        if (response.success) {

          this.deliveryTo = response.applicant.value;
        }

      }, (error: any) => {

        console.error('Error (GetApplicant) => ', error);

      });
  }

  imm:boolean = false;
  rel:boolean = true;
  getData() {
    this.loadingService.loadingPresent();
    this.service.service_general_get(`ServiceRecord/GetServiceRecordById?id=${this.rutaActiva.snapshot.params.id}&user=${this.userData.id}`)
      .subscribe((response: any) => {
        if (response.success) {
          console.log(response);
          this.dataSR = response.result;
          //imm
          if(this.userData.role.id == 3 && this.userData.profileUsers[0].supplierType == 3){
            this.immRel = 1;
            this.imm = true;
          }else{
            this.imm = false;
          }
          //rel
          if(this.userData.role.id == 3 && this.userData.profileUsers[0].supplierType == 1){
            this.immRel = 2;
            this.rel = true;
          }else{
            this.rel = false;
          }
          this.geIMREL();
          this.getClient();
          this.loadingService.loadingDismiss();
        }
      })

    this.service.service_general_get('Appointment/GetAppointmentByServiceRecordId?id=' + this.rutaActiva.snapshot.params.id).subscribe(r => {
      console.log(r);
      if (r.success) {
        console.log("Supplier appointments: ", r);
        this.apointments = r.result.value;
        this.loadingService.loadingDismiss();
      }
    })
    this.loadingService.loadingDismiss();
  }

  geIMREL() {
    this.getCoordinator();
    this.getServices();
    this.activityItems();
    this.getReport();
  }

  getCoordinator() {
    let id = 0;
    if (this.immRel == 1) {
      if (this.dataSR.immigrationCoodinators.length > 0) {
        id = this.dataSR.immigrationCoodinators[0].coordinatorId;
      }
    }

    if (this.immRel == 2) {
      if (this.dataSR.relocationCoordinators.length > 0) {
        id = this.dataSR.relocationCoordinators[0].coordinatorId;
      }
    }

    this.service.service_general_get('Profile/GetProfile/' + id).subscribe((data => {
      if (data.success) {
        console.log(data.result);
        console.log("coordinator: ", data.result);
        this.coordinator = data.result;
      }
    }));
  }

  getCountry(id) {
    for (let i = 0; i < this.caCounty.length; i++) {
      const element = this.caCounty[i];
      if (element.id == id) {
        return element.name;
      }
    }
  }

  getReport() {
    this.service.service_general_get('ReportDay/GetActivityReports?sr=' + Number(this.dataSR.id) + '&serviceLine=' + this.immRel).subscribe((data => {
      //this._services.service_general_get('ReportDay/GetActivityReports?sr='+Number(this.SO_ID)).subscribe((data => {
      if (data.success) {
        console.log('DATA CONSULTA: REPORTES ', data);
        this.dataSourceReport = data.view;
        console.log(this.dataSourceReport);
      }
    }));
  }

  async addReport() {


    const modal = await this.modalController.create({
      component: ReportOfTheDayPage,
      componentProps: {
        data: { sr: this.dataSR.id, i: this.dataSourceReport.length, id: 0 },
      }
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.ionViewWillEnter();
    })
    this.modalController.dismiss();
    await modal.present();
  }

  async editReport(data) {


    const modal = await this.modalController.create({
      component: ReportOfTheDayPage,
      componentProps: {
        data: { sr: this.dataSR.id, i: data.id, id: data.id },
      }
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.ionViewWillEnter();
    })
    this.modalController.dismiss();
    await modal.present();
  }

  async rat() {


    const modal = await this.modalController.create({
      component: RequestAdditionalTimePage,
      componentProps: {
        data: { sr: this.dataSR.id, sl: this.immRel },
      }
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.ionViewWillEnter();
    })
    this.modalController.dismiss();
    await modal.present();
  }

  activityItems(): void {
    const params: string = `?service_record_id=${this.dataSR.id}&service_line_id=${this.immRel}`;
    console.log('Consultando en ===> ', `Task/GetAllTask${params}`);
    this.service.service_general_get(`Task/GetAllTask${params}`).subscribe((response: any) => {
      console.log('Res ===> ', response);
      if (response.success) {
        this.dataActivityItems = response.result.value;
        console.log('this.activitie ==> ', this.dataActivityItems);
      }
    }, (error: any) => {
      console.error('Error (Task/GetAllTask) ==> ', error);
    });
  }

  async addActionItem() {


    const modal = await this.modalController.create({
      component: AddActivitieItemPage,
      componentProps: {
        data: { sr: this.dataSR.id, i: this.dataSourceReport.length, id: 0, sl: this.immRel },
      }
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.ionViewWillEnter();
    })
    this.modalController.dismiss();
    await modal.present();
  }

  async editActionItem(id) {


    const modal = await this.modalController.create({
      component: AddActivitieItemPage,
      componentProps: {
        data: { sr: this.dataSR.id, i: this.dataSourceReport.length, id: id, sl: this.immRel },
      }
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.ionViewWillEnter();
    })
    this.modalController.dismiss();
    await modal.present();
  }

  async deleteActivitie(id) {

    const modal = await this.modalController.create({
      component: ConfirmationPage,
      cssClass: 'modal-general-confirm',
      componentProps: {
        header: "Delete",
        body: "Delete activity item?",
        yesText: 'Yes, delete',
        noText: 'No, continue',
      }
    });

    modal.onDidDismiss().then((data) => {
      console.log(data, id);
      if (data.data) {
        this.loadingService.loadingPresent();
        this.service.service_general_get('Task/DeleteDocumentTask?id=' + id).subscribe(r => {
          if (r.success) {
            this.general_messages({
              title: "Success",
              body: "Delete Acivity item",
              success: true
            });
          }
        })
        this.ionViewWillEnter();
        this.loadingService.loadingDismiss();
      }
    })
    this.modalController.dismiss();

    await modal.present();


  }

  getDeliveredSR() {
    this.service.service_general_get(`ServiceRecord/GetApplicant/${this.dataSR.id}`)
      .subscribe((response: any) => {
        console.log(response);
        if (response.success) {
          this.deliveryTo = response.applicant.value;
        }

      }, (error: any) => {

        console.error('Error (GetApplicant) => ', error);

      });
  }

  getDelname(id) {
    if (this.deliveryTo == undefined || this.deliveryTo == null) {
      this.getDeliveredSR();
    } else {
      for (let i = 0; i < this.deliveryTo.length; i++) {
        const element = this.deliveryTo[i];
        if (id == element.dependentId) {
          return element.name;
        }
      }
      return '';
    }
  }

  getServices() {
    this.service.service_general_get('ServiceRecord/GetServices/' + this.dataSR.id + '?type=' + this.immRel).subscribe(r => {
      if (r.success) {
        console.log("GET SERVICES BY SERVICE RECORD:  ", r);

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

        r.map.value.all = [];

        for (let i = 0; i < r.map.value.home.length; i++) {
          r.map.value.home[i].type = 1;
          r.map.value.all.push(r.map.value.home[i]);
        }
        for (let i = 0; i < r.map.value.host.length; i++) {
          r.map.value.host[i].type = 2;
          r.map.value.all.push(r.map.value.host[i]);
        }
        console.log(r.map.value);
        this.services = r.map.value;
        console.log(this.services);
      }
    })
  }

  

  viewAssineInfo() {
    localStorage.setItem('srAd', this.dataSR.id);
    localStorage.setItem('userId', this.dataSR.assigneeInformations[0].userId);
    localStorage.setItem('back', 'assignee-taps/services-all/view-sr/' + this.dataSR.id);
    this.router.navigateByUrl('assignee-taps/profile')
  }


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
          body: "Send message to " + message + "?",
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

  public calculateHowOld(bd) {

    const my_bd: any = new Date(bd);

    if (my_bd != null || my_bd != '') {

      const date_init = new Date(my_bd.getFullYear(), my_bd.getMonth(), my_bd.getDate()),
        date_today = new Date();

      let diff = (date_init.getTime() - date_today.getTime()) / 1000;
      diff /= (60 * 60 * 24);

      return Math.abs(Math.round(diff / 365.25));

    } else {

      return null;

    }

  }

  back() {
    let back: any = document.getElementById('back');
    back.play()
    console.log(localStorage.getItem('back'));
    this.router.navigateByUrl('assignee-taps/services-all');
  }

  getCountryName(id) {
    for (let i = 0; i < this.caCounty.length; i++) {
      if (this.caCounty[i].id == id) {
        return this.caCounty[i].name;
      }
    }
  }

  getCityName(id) {
    for (let i = 0; i < this.caCity.length; i++) {
      if (this.caCity[i].id == id) {
        return this.caCity[i].city;
      }
    }
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

  switchModal(item, type) {
    if (item.serviceType == "Bundled" || item.serviceType == "Package") {
      this.open_bundle(item, type);
    } else {
      this.open_service(item, type);
    }
  }

  async open_bundle(item, type) {
    if (type == 1) {
      item.homecountry = this.getCountryName(this.dataSR.assigneeInformations[0].homeCountryId);
      item.homecity = this.getCityName(this.dataSR.assigneeInformations[0].homeCityId);
    } else {
      item.homecountry = this.getCountryName(this.dataSR.assigneeInformations[0].hostCountry);
      item.homecity = this.getCityName(this.dataSR.assigneeInformations[0].hostCityId);
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
      item.homecountry = this.getCountryName(this.dataSR.assigneeInformations[0].homeCountryId);
      item.homecity = this.getCityName(this.dataSR.assigneeInformations[0].homeCityId);
    } else {
      item.homecountry = this.getCountryName(this.dataSR.assigneeInformations[0].hostCountry);
      item.homecity = this.getCityName(this.dataSR.assigneeInformations[0].hostCityId);
    }
    item.type = type;
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

  switchModalAll(item) {
    if (item.serviceType == "Bundled") {
      this.open_bundle(item, item.type);
    } else {
      this.open_service_(item);
    }
  }

  async open_service_(item) {
    console.log('funcion all country')
    if (item.type == 1) {
      item.homecountry = this.getCountryName(this.dataSR.assigneeInformations[0].homeCountryId);
      item.homecity = this.getCityName(this.dataSR.assigneeInformations[0].homeCityId);
    } else {
      item.homecountry = this.getCountryName(this.dataSR.assigneeInformations[0].hostCountry);
      item.homecity = this.getCityName(this.dataSR.assigneeInformations[0].hostCityId);
    }

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
        this.router.navigateByUrl('assignee-taps/Others');
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

  getpartner(id) {
    for (let i = 0; i < this.ca_partner.length; i++) {
      if (this.ca_partner[i].id == id) {
        return this.ca_partner[i].coordinator
      }
    }
  }

  getCliente(id) {
    for (let i = 0; i < this.info.length; i++) {
      if (this.info[i].id == id) {
        return this.info[i].name;
      }
    }
  }

  getPolicy(id) {
    for (let i = 0; i < this.ca_policy.length; i++) {
      if (this.ca_policy[i].id == id) {
        return this.ca_policy[i].policyType;
      }
    }
  }

  info = [];
  getClient() {
    this.service.service_general_get('Catalogue/GetClient/' + this.dataSR.partnerId).subscribe((response: any) => {
      console.log('Res ===> ', response);
      this.info = response.result.value;
    })
  }

  async startAppoitment(i, appoi) {
    // console.log('modal', i);
    console.log('modal', appoi);
    let split_fecha = appoi.date.split("T");
    let fecha = split_fecha[0];
    let split_mes_dia = fecha.split("-");
    let fecha_actual_dia = new Date().getDate();
    let fecha_actual_mes = new Date().getMonth()+1;
    let fecha_actual_year = new Date().getFullYear();
    let date_appointment = new Date(split_mes_dia[0], split_mes_dia[1]-1, split_mes_dia[2]);
    
    if(Number(date_appointment[0]) == fecha_actual_year){
      if(Number(date_appointment[1]) == fecha_actual_mes){
        if(Number(date_appointment[1]) == fecha_actual_mes){
           console.log("Se inicia el appointment");
           this.iniciarAppointment(i, appoi);
        }
        else{
          console.log("No se inicia el appointment")
          this.messageAppointment();
        }
      }else{
        console.log("No se inicia el appointment");
        this.messageAppointment();
      }
    }else{
      console.log("No se inicia el appointment");
      this.messageAppointment();
    }
    /*
    const modal = await this.modalController.create({
      component: ConfirmationPage,
      cssClass: 'modal-general-confirm',
      componentProps: {
        header: "Start appoitment",
        body: "Are you sure you want start appoitment?",
        yesText: 'Yes, start',
        noText: 'No, continue',
      }
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      if (data.data) {
        this.service.service_general_post_with_url('Appointment/App/Start/' + appoi.id + '/' + this.userData.id, '').subscribe(r => {
          if (r.success) {
            console.log(r);
            this.general_messages({
              title: "Success",
              body: "Inserted Data",
              success: true
            });
            this.ionViewWillEnter();
          }
        })
      }
    })
    this.modalController.dismiss();
    // console.log(data);
    await modal.present();
    */

  }

  async messageAppointment(){
    const toast = await this.ToastCtrl.create({
      header: 'Start Appointment',
      message: 'Unable to start appointment',
      position: 'top',
      cssClass: 'toast_',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await toast.present();
  }


  async iniciarAppointment(i, appoi){
    const modal = await this.modalController.create({
      component: ConfirmationPage,
      cssClass: 'modal-general-confirm',
      componentProps: {
        header: "Start appoitment",
        body: "Are you sure you want start appoitment?",
        yesText: 'Yes, start',
        noText: 'No, continue',
      }
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      if (data.data) {
        this.service.service_general_post_with_url('Appointment/App/Start/' + appoi.id + '/' + this.userData.id, '').subscribe(r => {
          if (r.success) {
            console.log(r);
            this.general_messages({
              title: "Success",
              body: "Inserted Data",
              success: true
            });
            this.ionViewWillEnter();
          }
        })
      }
    })
    this.modalController.dismiss();
    // console.log(data);
    await modal.present();
  }

  async endAppoitment(i, endAppoi) {
    // /api/Appointment/App/End/{report}/{appointment}/{user}
    console.log('modal', endAppoi);
    const modal = await this.modalController.create({
      component: ConfirmationPage,
      cssClass: 'modal-general-confirm',
      componentProps: {
        header: "End appoitment",
        body: "Are you sure you want end appoitment?",
        yesText: 'Yes, end',
        noText: 'No, continue',
      }
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      if (data.data) {
        this.service.service_general_put('Appointment/App/End/' + endAppoi.report + '/' + endAppoi.id + '/' + this.userData.id, '').subscribe(r => {
          if (r.success) {
            console.log(r);
            this.general_messages({
              title: "Success",
              body: "Inserted Data",
              success: true
            });
            this.ionViewWillEnter();
          }
        })
      }
    })
    this.modalController.dismiss();
    // console.log(data);
    await modal.present();
  }

  Scroll(event) {
    this.service.onScroll(event);
  }

  sendMessage() {
    console.log("Switch: ", this.immRel);
    let sr = this.rutaActiva.snapshot.params.id;
    this.router.navigate(['assignee-taps/chat/' + sr + '/' + this.immRel])
  }
}
