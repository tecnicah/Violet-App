import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { GeneralService } from 'src/app/general/general.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.page.html',
  styleUrls: ['./resources.page.scss'],
})
export class ResourcesPage implements OnInit {

  userData: any = {};

  constructor(public router: Router,
    public service: GeneralService,
    public modalController: ModalController) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  ionViewWillEnter(){
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  countyCityInfo(){
    localStorage.setItem('back','assignee-taps/resources');
    this.router.navigateByUrl('assignee-taps/resources/country-city-info');
  }
  currencyExchangeInfo() {
    localStorage.setItem('back','assignee-taps/resources');
    this.router.navigateByUrl('assignee-taps/resources/currency-exchange');
  }
  mapsInfo() {
    localStorage.setItem('back','assignee-taps/resources');
    this.router.navigateByUrl('assignee-taps/resources/maps');
  }
  timeZoneInfo() {
    localStorage.setItem('back','assignee-taps/resources');
    this.router.navigateByUrl('assignee-taps/resources/time-zone');
  }
  unitConverterInfo() {
    localStorage.setItem('back','assignee-taps/resources');
    this.router.navigateByUrl('assignee-taps/resources/unit-converter');
  }
  weatherInfo() {
    localStorage.setItem('back','assignee-taps/resources');
    this.router.navigateByUrl('assignee-taps/resources/weather');
  }

  translate(){
    localStorage.setItem('back','assignee-taps/resources');
    // this.router.navigateByUrl('assignee-taps/resources/translate');
  }

  back(){
    let back: any = document.getElementById('back');
    back.play()
    console.log(localStorage.getItem('back'));
    this.router.navigateByUrl('/assignee-taps/home');
  }

  supplierList(){
    localStorage.setItem('back',"assignee-taps/resources");
    this.router.navigateByUrl('assignee-taps/resources/supplier-list');
  }

  Scroll(event) {
    this.service.onScroll(event);
  }
}
