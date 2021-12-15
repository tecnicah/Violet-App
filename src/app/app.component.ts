import { Component } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GeneralService } from './general/general.service';
//import { FCM } from '@ionic-native/fcm/ngx';
import { Device } from '@ionic-native/device/ngx';
import { NotificacionesPage } from './notificaciones/notificaciones.page';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private nativeStorage: NativeStorage,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public service: GeneralService,
    //private fcm: FCM,
    public fcm: FCM,
    private device: Device,
    public modalCtrl: ModalController
  ) {
    this.initializeApp();
  }

  splash: boolean = true;
  pushPayload: any;

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.changeDarkMode();
      if (this.platform.is('android')) {
        this.statusBar.backgroundColorByHexString('#9D3292');
        this.statusBar.styleDefault();
      } else if (this.platform.is('ios')) {
        this.statusBar.backgroundColorByHexString('#9D3292');
        this.statusBar.styleDefault();
        this.statusBar.overlaysWebView(true);
      }

      if (this.device.model == "iPhone10" ||
        this.device.model == "iPhone10,1" ||
        this.device.model == "iPhone10,2" ||
        this.device.model == "iPhone10,3" ||
        this.device.model == "iPhone10,4" ||
        this.device.model == "iPhone10,5" ||
        this.device.model == "iPhone10,6" ||
        this.device.model == "iPhone10,7" ||
        this.device.model == "iPhone10,8" ||
        this.device.model == "iPhone10,9" ||
        this.device.model == "iPhone10,10" ||
        this.device.model == "iPhone11" ||
        this.device.model == "iPhone11,1" ||
        this.device.model == "iPhone11,2" ||
        this.device.model == "iPhone11,3" ||
        this.device.model == "iPhone11,4" ||
        this.device.model == "iPhone11,5" ||
        this.device.model == "iPhone11,6" ||
        this.device.model == "iPhone11,7" ||
        this.device.model == "iPhone11,8" ||
        this.device.model == "iPhone11,9" ||
        this.device.model == "iPhone11,10") {
        this.service.padingios = true;
      } else {
        this.service.padingios = false;
      }

      setTimeout(() => {
        this.splash = false;
      }, 12000);

      this.fcm.requestPushPermission().then(permission => {
        console.log("has permission: ", permission);
      });

      this.fcm.getToken().then(token => {
        console.log("este es el token", token);
        this.nativeStorage.setItem('token', token).then(
          () => console.log('Stored item!'),
          error => console.error('Error storing item', error)
        )
        localStorage.setItem('token', token);
      })

      this.fcm.onTokenRefresh().subscribe(token => {
        console.log("refresh token", token);
        this.nativeStorage.setItem('token', token).then(
          () => console.log('Stored item!'),
          error => console.error('Error storing item', error)
        )
        localStorage.setItem('token', token);
      });

      this.fcm.onNotification().subscribe(data => {
        //localStorage.setItem("notificacion", data.toString());
        localStorage.setItem('data_notification', JSON.stringify(data));
        console.log("Esta es la data notificacion de entrada: ", data);
        if (data.wasTapped) {
          console.log("Received in background");
          this.openNotification(data);
        } else {
          console.log("Received in foreground");
          this.openNotification(data);
        };
      });


      this.fcm.getInitialPushPayload().then(data_playload => {
        console.log('getInitialPushPayload result: ', data_playload);
      });


    });
  }


  async openNotification(data_) {
    const modal = await this.modalCtrl.create({
      component: NotificacionesPage,
      componentProps: {
        text: data_.text,
        body: data_.body
      },
      cssClass: 'modal-general-confirm'
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
    })
    this.modalCtrl.dismiss();
    await modal.present();
  }

  changeDarkMode() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDark.matches) {
      document.body.classList.toggle('light');
    }
  }

}



