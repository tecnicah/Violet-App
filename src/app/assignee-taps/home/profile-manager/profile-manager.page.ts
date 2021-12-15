import { Component, OnInit } from '@angular/core';
import { NewMessaggePage } from '../../chat-premier/new-messagge/new-messagge.page';
import { ConfirmationPage } from 'src/app/dialog/confirmation/confirmation.page';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { DocumentProfileDocumentPage } from 'src/app/dialog/document-profile-document/document-profile-document.page';
import { AddEmergencyPage } from '../add-emergency/add-emergency.page';
import { AddVehiclePage } from '../add-vehicle/add-vehicle.page';
import { GeneralService } from 'src/app/general/general.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LoadingService } from 'src/app/general/loader.service';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AddOfficePage } from '../add-office/add-office.page';
import { AddCountryPage } from '../add-country/add-country.page';
import { AddTeamPage } from '../add-team/add-team.page';
import { AddAssignedTeamPage } from '../add-assigned-team/add-assigned-team.page';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-profile-manager',
  templateUrl: './profile-manager.page.html',
  styleUrls: ['./profile-manager.page.scss'],
})
export class ProfileManagerPage implements OnInit {


  constructor(private permissionsService: NgxPermissionsService, public service: GeneralService, private callNumber: CallNumber,
    public _services: GeneralService, public loader: LoadingService, public routerParams: ActivatedRoute,
    public router: Router, public modalController: ModalController, private iab: InAppBrowser) { }

  padingios: boolean = false;
  userData: any = {};
  profileConsultant;
  paymentInf;
  documentConsultant;
  vehicleConsultants;
  emergencyContacts;

  show_name_assignee: boolean = false;

  ionViewWillEnter() {
    console.log(window.screen.width);
    if (window.screen.width <= 500) {
      this.show_name_assignee = true;
    } else {
      this.show_name_assignee = false;
    }
    this.ngOnInit();
  }

  ca_country= [];
  ca_office = [];
  ca_accountType = [];
  ca_currency = [];
  async ngOnInit() {
    this.ca_country = await this._services.getCatalogueFrom('GetCountry');
    this.ca_office = await this._services.getCatalogueFrom('GetOffice');
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    this.ca_accountType = await this._services.getCatalogueFrom('GetBankAccountType');
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.permissionsService.loadPermissions([this.userData.role.id]);
    console.log('user', this.userData);
    this.catalog();

  }

   //CONSULTA CIUDAD//
   ca_city = [];
   getCity(){
     this._services.service_general_get('Catalogue/GetState?country=' + this.profileConsultant.country).subscribe((data => {
       if (data.success) {
           this.ca_city = data.result;
       }
     }))
   }

  back() {
    let back: any = document.getElementById('back');
    back.play()
    console.log(localStorage.getItem('back'));
    this.router.navigateByUrl('assignee-taps/home');
  }

  public country = [];
  catalog() {
    this.loader.loadingPresent();
    this.service.loader = true;
    let id = this.routerParams.snapshot.params.id;
    this._services.service_general_get('Profile/App/GetProfile/'+id).subscribe(r => {
      if (r.success) {
        console.log(r);
        this.profileConsultant = r.result;
        this.getCliente();
        this.getCity();
        console.log("ESTA ES LA INFORMACIÓN DEL PERFIL: ", this.profileConsultant);
        this.paymentInf = r.result.personalInformation.paymentInformationProfiles[0];
        this.documentConsultant = r.result.documentConsultantContactsConsultants;
        this.vehicleConsultants = r.result.vehicleConsultants;
        this.emergencyContacts = r.result.personalInformation.emergencyContacts;
        this.loader.loadingDismiss();
      }
    });
    this._services.service_general_get(`Catalogue/GetCountry`).subscribe(r => {
      if (r.success) {
        console.log(r);
        this.country = r.result;
      }
    });
  }

  nameCountry(id) {
    for (let i = 0; i < this.country.length; i++) {
      if (this.country[i].id == id) {
        return this.country[i].name;
      }
    }
    return '';
  }

  async addVehicle() {
    const modal = await this.modalController.create({
      component: AddVehiclePage,
      componentProps: { id: 0 }
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      if (data.data.success) {
        data.data.consultantContactsConsultant = this.profileConsultant.id;
        this.profileConsultant.vehicleConsultants.push(data.data);
        this.update_data();
      }
    })
    this.modalController.dismiss();
    // console.log(data);
    await modal.present();
  }

  async editVehicle(item, i) {
    const modal = await this.modalController.create({
      component: AddVehiclePage,
      componentProps: item
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      if (data.data.success) {
        this.profileConsultant.vehicleConsultants[i] = data.data;
        this.update_data();
      }
    })
    this.modalController.dismiss();
    // console.log(data);
    await modal.present();
  }


  async addContact() {
    let data = { id: 0 }
    const modal = await this.modalController.create({
      component: AddEmergencyPage,
      componentProps: data
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      if (data.data.success) {
        this.profileConsultant.personalInformation.emergencyContacts.push(data.data);
        this.update_data();
      }
    })
    this.modalController.dismiss();
    // console.log(data);
    await modal.present();
  }

  async editEmergencia(item, i) {
    const modal = await this.modalController.create({
      component: AddEmergencyPage,
      componentProps: item
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      if (data.data.success) {
        this.profileConsultant.personalInformation.emergencyContacts[i] = data.data;
        this.update_data();
      }
    })
    this.modalController.dismiss();
    // console.log(data);
    await modal.present();
  }

  public temporalDocument = [];
  async docs() {
    const modal = await this.modalController.create({
      component: DocumentProfileDocumentPage
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      if (data.data.success) {
        data.data.consultantContactsService = this.profileConsultant.id;
        this.temporalDocument.push(data.data)
        this.update_data();
      }
    })
    this.modalController.dismiss();
    // console.log(data);
    await modal.present();
  }


  update_data() {
    this.loader.loadingPresent();
    this.profileConsultant.user = null;
    this.profileConsultant.documentConsultantContactsConsultants = [];
    this.profileConsultant.documentConsultantContactsConsultants = this.temporalDocument;
    this.profileConsultant.updatedBy = this.userData.id
    this.profileConsultant.updatedDate = new Date();
    if (this.profileConsultant.photo == null) {
      this.profileConsultant.photo = '';
      this.profileConsultant.photoExtension = '';
    }
    console.log("data a guardar: ", this.profileConsultant);

    this._services.service_general_put("Profile/UpdateProfile", this.profileConsultant).subscribe((data => {
      if (data.success) {
        console.log(data);
        this.general_messages({
          title: "Success",
          body: "Profile was updated",
          success: true
        });
        this.loader.loadingDismiss();
        this.ngOnInit();
      }
    }), (err) => {
      this.loader.loadingDismiss();
      console.log("error: ", err);
    })
  }

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

  viewDoc(doc) {
    this.iab.create(this.service.url_images + doc, '_system')
  }

  Scroll(event) {
    this.service.onScroll(event);
  }

  async call(number, message) {

    if (number != null && number != '' && number != undefined) {
      const modal = await this.modalController.create({
        component: ConfirmationPage,
        cssClass: 'modal-general-confirm',
        componentProps: {
          header: "Call",
          body: "Dial the " + message + "?",
          yesText: 'Yes',
          noText: 'No',
        }
      });

      modal.onDidDismiss().then((data) => {
        console.log(data);
        if (data.data) {
          this.callNumber.callNumber(number, true)
            .then(res => console.log('Launched dialer!', res))
            .catch(err => console.log('Error launching dialer', err));
        }
      })
      this.modalController.dismiss();

      await modal.present();
    }

  }

  async sendMessage(data) {
    console.log(data);
    const modal = await this.modalController.create({
      component: NewMessaggePage,
      componentProps: { id: data }
    });

    modal.onDidDismiss().then((data: any) => {
      console.log(data);
      if (data.data.id) {
      }
    })
    this.modalController.dismiss();
    await modal.present();
  }

  public ca_cliente = [];
  getCliente() {
    this._services.service_general_get('Profile/GetClients?user=' + this.profileConsultant.userId).subscribe((data => {
      if (data.success) {
        console.log("CLIENTE: ", data.result.value)
        this.ca_cliente = data.result.value;
      }
    }))
  }

  async addOffice() {
    const modal = await this.modalController.create({
      component: AddOfficePage
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      if(data.data.success){
        data.data.consultant = this.profileConsultant.id;
        this.profileConsultant.offices.push(data.data);
        this.update_data();
      }
    })
    this.modalController.dismiss();
    await modal.present();
  }


  async addCountry(){
    const modal = await this.modalController.create({
      component: AddCountryPage
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      if(data.data.success){
        data.data.consultant = this.profileConsultant.id;
        this.profileConsultant.countryServices.push(data.data);
        this.update_data();
      }
    })
    this.modalController.dismiss();
    await modal.present();
  }

  async addOperationLeader(){
    const modal = await this.modalController.create({
      component: AddTeamPage
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      if(data.data.success){
        data.data.createdBy = this.profileConsultant.id;
        this.profileConsultant.operationLeaderCreatedByNavigations.push(data.data);
        this.update_data();
      }
    })
    this.modalController.dismiss();
    await modal.present();
  }

  async addAssignedTea(){
    const modal = await this.modalController.create({
      component: AddAssignedTeamPage
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      if(data.data.success){
        data.data.createdBy = this.profileConsultant.id;
        this.profileConsultant.operationLeaderConsultantNavigations.push(data.data);
        this.update_data();
      }
    })
    this.modalController.dismiss();
    await modal.present();
  }

  getOffice(id){
    for(let i = 0; i < this.ca_office.length; i++){
      if(this.ca_office[i].id == id){
        return this.ca_office[i].office;
      }
    }
    return '';
  }

  getPhoto(id){
    for(let i = 0; i < this.ca_office.length; i++){
      if(this.ca_office[i].id == id){
        return this.ca_office[i].image;
      }
    }

    return '';
  }

  getCountry(id){
    for(let i = 0; i < this.ca_country.length; i++){
      if(this.ca_country[i].id == id){
        return this.ca_country[i].name;
      }
    }
    return '';
  }

}

