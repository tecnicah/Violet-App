import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/general/general.service';

@Component({
  selector: 'app-compliance-policies',
  templateUrl: './compliance-policies.page.html',
  styleUrls: ['./compliance-policies.page.scss'],
})
export class CompliancePoliciesPage implements OnInit {

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
