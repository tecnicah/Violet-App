import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../general/general.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-assignee-taps',
  templateUrl: './assignee-taps.page.html',
  styleUrls: ['./assignee-taps.page.scss'],
})
export class AssigneeTapsPage implements OnInit {
  userData : any = {};
  public serviceline_conversation: number = 1;
  constructor(public statusBar: StatusBar,public router: Router, public _services: GeneralService, private localNotifications: LocalNotifications) {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this._services.retrieveMappedObject().subscribe((receivedObj: any) => {
      console.log(receivedObj);
      this.localNotifications.schedule({
        text: 'New Chat'
      });
      this.hide = true;
      if(this.userData.role.id != 4){
        this.get_Chats();
      }
    });
   }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  ionViewWillEnter(){
    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#9D3292');
    this.statusBar.styleDefault();
    this.getNotificaciones();
    if(localStorage.getItem('userData')){
      this.userData = JSON.parse(localStorage.getItem('userData'));
    }else{
      let play: any = document.getElementById('success');
      play.play();
      this.router.navigateByUrl('');
    }
  }

  //***********************************************************//
  //CONSULTA CHAT//
  public numberChat:Number = 1;
  public table_contacts:any[]= [];
  public hide:boolean = false;
  public chatPremier : boolean = false;
  get_Chats(){
    this._services.service_general_get('Chat/GetChatNotification/'+this.userData.id).subscribe(n => {
      if(n.success){
        this.table_contacts = n.result.value;
        console.log(this.table_contacts);
        if(this.table_contacts.length > 0 ){
          this.chatPremier = true;
        }
      }
    })
  }
  //***********************************************************//
  //CONSULTA NOTIFICACIONES//
  public ca_notification:any;
  public hideNotificacion : boolean = false;
  getNotificaciones(){
    let numero_notificaciones = [];
    this._services.service_general_get('Notification/GetNotificationCenter/' + this.userData.id).subscribe((data => { //this.area_orientation.workOrderServicesId
      if (data.success) {
        console.log('DATA CONSULTA NOTIFICACIONES: ', data);
        //this.ca_notification = data.result.value;
        numero_notificaciones = data.result.value;
        for(let i = 0; i < numero_notificaciones.length; i++){
           if(numero_notificaciones[i].view == false){
             this.ca_notification++;
           }
        }
        if(this.ca_notification > 0){
          this.hideNotificacion = true;
        }
        console.log(this.ca_notification);
      }
    }));
  }
}
