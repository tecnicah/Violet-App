import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general/general.service';
import { ModalController, NavParams } from '@ionic/angular';
import { LoadingService } from 'src/app/general/loader.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ConfirmationPage } from '../confirmation/confirmation.page';

@Component({
  selector: 'app-participantes',
  templateUrl: './participantes.page.html',
  styleUrls: ['./participantes.page.scss'],
})
export class ParticipantesPage implements OnInit {

  constructor(private socialSharing: SocialSharing, public loader: LoadingService, public navParams: NavParams, public modalController: ModalController, public _services: GeneralService) { }

  //*********************************************************************************************//
  public participantes = [];
  public cadena_text:string = '';
  public userData : any ;
  public homeCountry : any
  ionViewWillEnter(){
    this.userData = JSON.parse(localStorage.getItem('userData'));
    let data = this.navParams.data;
     if(data.serviceLine == 1){
       this.cadena_text = 'Immigration Team';
       this.homeCountry = this.userData.assigneeInformations[0].homeCountryId;
     }else{
      this.cadena_text = 'Relocation Team';
      this.homeCountry = this.userData.assigneeInformations[0].hostCountry;
     }
    this._services.service_general_get(`ChatImmigrationRelocation/GetUsersTeam?conversation=${data.idConversacion}`).subscribe(response => {
      if (response.success) {
        console.log(response.result.value);
        this.participantes = response.result.value
      }
    });
    this.getCatalogos();
  }
  //*********************************************************************************************//
  ngOnInit() {
    
  }
  //*********************************************************************************************//
  public country = [];
  async getCatalogos(){
    this.country = await this._services.getCatalogueFrom('GetCountry');
  }
  //*********************************************************************************************//
  //GET NAME COUNTRY//
  getName(id){
    for (let i = 0; i < this.country.length; i++) {
      if(this.country[i].id == id){
         return this.country[i].name;
      }
    }
  }
  //*********************************************************************************************//
  myBackButton() {
    let back: any = document.getElementById('back');
    back.play();
    this.modalController.dismiss();
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
          body: "Send message to" + message + "?",
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

}
