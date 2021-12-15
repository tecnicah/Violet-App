import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, IonSlides } from '@ionic/angular';
import { GeneralService } from 'src/app/general/general.service';
import { ViewChild } from '@angular/core';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-country-city-info',
  templateUrl: './country-city-info.page.html',
  styleUrls: ['./country-city-info.page.scss'],
})
export class CountryCityInfoPage implements OnInit {

  constructor(public router: Router,
    public service: GeneralService,
    public modalController: ModalController) { }

  userData: any = {};
  @ViewChild(IonSlides) slides: IonSlides;
  slideOptsOne = {
    slidesPerView: 1,
    autoplay:true
   };

  goToSlide() {
    this.slides.slideTo(3, 500);
  }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.getData();
  }

  public cities_ = [];
  getData(){
    this.service.service_general_get('CountryAdminCenter/'+this.userData.id+'/Country-City-Info').subscribe( r => {
      if(r.success){
          console.log(r.result.value);
          this.cities_ = r.result.value;
      }
    })
  }

  back(){
    let back: any = document.getElementById('back');
    back.play()
    console.log(localStorage.getItem('back'));
    this.router.navigateByUrl(localStorage.getItem('back'));
  }

  Scroll(event) {
    this.service.onScroll(event);
  }

}
