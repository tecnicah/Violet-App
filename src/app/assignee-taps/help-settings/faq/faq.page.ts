import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/general/general.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  constructor(public service: GeneralService,
    public router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
  }
  
  back(){
    let back: any = document.getElementById('back');
    back.play()
    console.log(localStorage.getItem('back'));
    this.router.navigateByUrl(localStorage.getItem('back'));
  }
}
