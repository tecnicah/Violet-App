import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general/general.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-time-zone',
  templateUrl: './time-zone.page.html',
  styleUrls: ['./time-zone.page.scss'],
})
export class TimeZonePage implements OnInit {
  dataZone;
  AllZone: any[] =[]
  order: string = 'timezone';


  constructor(public router: Router,
    public service: GeneralService,
    private http: HttpClient) { }

  Scroll(event) {
    this.service.onScroll(event);
  }

  ngOnInit() {
    this.getZone();
  }
  back(){
    let back: any = document.getElementById('back');
    back.play()
    this.router.navigateByUrl(localStorage.getItem('back'));
  }
  getZone() {
    this.dataZone = this.http.get(`http://worldtimeapi.org/api/timezone"`).subscribe(resp => {
      let zone = resp;
      // console.log('zone', zone);
    });
    this.http.get(`http://worldtimeapi.org/api/timezone/America/New_York`).subscribe(rny => {
      this.AllZone.push(rny);
    });
    this.http.get(`http://worldtimeapi.org/api/timezone/America/Argentina/Buenos_Aires`).subscribe(rba => {
      this.AllZone.push(rba);
    });
    this.http.get(`http://worldtimeapi.org/api/timezone/America/Mexico_City`).subscribe(rmx => {
      this.AllZone.push(rmx);
    });
    this.http.get(`http://worldtimeapi.org/api/timezone/Asia/Dubai`).subscribe(rdb => {
      this.AllZone.push(rdb);
    });
    this.http.get(`http://worldtimeapi.org/api/timezone/Asia/Hong_Kong
    `).subscribe(rhk => {
      this.AllZone.push(rhk);
    });
    // this.http.get(`http://worldtimeapi.org/api/timezone/Atlantic/Canary
    // `).subscribe(rca => {
    //   this.AllZone.push(rca);
    // });
    this.http.get(`http://worldtimeapi.org/api/timezone/Australia/Sydney
    `).subscribe(rsy => {
      this.AllZone.push(rsy);
    });
    this.http.get(`http://worldtimeapi.org/api/timezone/Europe/London
    `).subscribe(rlo => {
      this.AllZone.push(rlo);
    });
    this.http.get(`http://worldtimeapi.org/api/timezone/Europe/Rome
    `).subscribe(rro => {
      this.AllZone.push(rro);
    });
    this.http.get(`http://worldtimeapi.org/api/timezone/Indian/Cocos
    `).subscribe(rcoc => {
      this.AllZone.push(rcoc);
      console.log('zonas', this.AllZone);
    });
    console.log('zonas', this.AllZone);
  }

}
