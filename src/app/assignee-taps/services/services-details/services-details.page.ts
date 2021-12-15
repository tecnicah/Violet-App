import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { GeneralService } from 'src/app/general/general.service';
import { DocumentsDialogPage } from 'src/app/dialog/documents-dialog/documents-dialog.page';
import { ServiceRatingPage } from 'src/app/dialog/service-rating/service-rating.page';

@Component({
  selector: 'app-services-details',
  templateUrl: './services-details.page.html',
  styleUrls: ['./services-details.page.scss'],
})
export class ServicesDetailsPage implements OnInit {

  constructor(public router: Router,
    public service: GeneralService,
    public modalController: ModalController) { }

    userData: any = {};
  ngOnInit() {
  }

  ionViewWillEnter(){
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }
  
  back(){
    let back : any = document.getElementById('back');
    back.play();
    this.modalController.dismiss();
  }

  async documentDialog(){
    const modal = await this.modalController.create({
      component: DocumentsDialogPage,
      backdropDismiss: true,
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.ionViewWillEnter();
    })
    this.modalController.dismiss();
    
    await modal.present();

    
  }

  async rating(data){
    const modal = await this.modalController.create({
      component: ServiceRatingPage,
      cssClass: 'modal-rating',
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
