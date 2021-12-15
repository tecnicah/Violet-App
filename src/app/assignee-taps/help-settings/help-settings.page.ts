import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ConfirmationPage } from 'src/app/dialog/confirmation/confirmation.page';
import { GeneralService } from 'src/app/general/general.service';
import { AssigneeTapsPage } from '../assignee-taps.page';
import { TipsPage } from '../tips/tips.page';

@Component({
  selector: 'app-help-settings',
  templateUrl: './help-settings.page.html',
  styleUrls: ['./help-settings.page.scss'],
})
export class HelpSettingsPage implements OnInit {

  constructor(public service: GeneralService,
    public router: Router,
    public tabs: AssigneeTapsPage,
    public modalController: ModalController) { }
    userData: any = {};

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  Scroll(event) {
    this.service.onScroll(event);
  }
  
  ionViewWillEnter(){
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  faq(){
    localStorage.setItem('back',"assignee-taps/help-settings");
    this.router.navigateByUrl('assignee-taps/help-settings/faq');
  }

  policies(){
    localStorage.setItem('back',"assignee-taps/help-settings");
    this.router.navigateByUrl('assignee-taps/help-settings/compliance-policies');
  }

  whyPremier(){
    localStorage.setItem('back',"assignee-taps/help-settings");
    this.router.navigateByUrl('assignee-taps/help-settings/why-premier');
  }
  
  settings(){
    localStorage.setItem('back',"assignee-taps/help-settings");
    this.router.navigateByUrl('assignee-taps/help-settings/settings');
  }

  async logout(){

    const modal = await this.modalController.create({
      component: ConfirmationPage,
      cssClass: 'modal-general-confirm',
      componentProps: {
        header: "Logout",
        body: "Are you sure you want to log out?",
        yesText: 'Yes,log out',
        noText: 'No, continue',
      }
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
      if(data.data){
        //localStorage.removeItem('userData');
        localStorage.clear();
        localStorage.setItem("first",'1');
        this.tabs.ionViewWillEnter();
      }
    })
    this.modalController.dismiss();
    
    await modal.present();

  }

  async tips(){
      const modal = await this.modalController.create({
        component: TipsPage,
        backdropDismiss: true
      })
  
      modal.onDidDismiss().then((data) => {
        console.log(data);
        this.ionViewWillEnter();
      })
      
      await modal.present();
    }

}
