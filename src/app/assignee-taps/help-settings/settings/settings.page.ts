import {
  Component,
  OnInit
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';
import {
  Router
} from '@angular/router';
import {
  ModalController
} from '@ionic/angular';
import {
  GeneralMensagePage
} from 'src/app/dialog/general-mensage/general-mensage.page';
import {
  GeneralService
} from 'src/app/general/general.service';
import {
  LoadingService
} from 'src/app/general/loader.service';
import {
  MustMatch
} from './_helpers/must-match.valitator';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(public formBuilder: FormBuilder,
    public modalController: ModalController,
    public service: GeneralService,
    public router: Router,
    public loadingService: LoadingService) {}

  registerForm: any;
  toogle_notificaciones:any; 
  userData: any = {};
  submitted: boolean = true;

  

  ngOnInit() {
    this.toogle_notificaciones = localStorage.getItem("notificaciones_push");
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.registerForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  ionViewWillEnter() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.ngOnInit();
    console.log(this.userData);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    console.log(this.registerForm);
    this.loadingService.loadingPresent();
    this.service.service_general_put('User/Change_password?email=' + this.userData.email + '&password=' + this.registerForm.get('password').value, null).subscribe(r => {
      if (r.success) {
        this.loadingService.loadingDismiss();
        this.general_messages({
          title: "Success",
          body: "Password modified successfully",
          success: true
        });
        this.userData.reset = false;
        localStorage.removeItem('userData');
        localStorage.setItem('userData', JSON.stringify(this.userData));
        console.log(JSON.parse(localStorage.getItem('userData')));
      } else {
        this.loadingService.loadingDismiss();
        this.general_messages({
          title: "Error",
          body: "Password not modified",
          success: false
        });
      }
    })
  }

  async general_messages(data) {
    const modal = await this.modalController.create({
      component: GeneralMensagePage,
      cssClass: 'modal-general-mensage',
      backdropDismiss: true,
      componentProps: data
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
    })
    this.modalController.dismiss();

    await modal.present();
  }

  back() {
    let back: any = document.getElementById('back');
    back.play()
    console.log(localStorage.getItem('back'));
    this.router.navigateByUrl(localStorage.getItem('back'));
  }

  notificacion(e) {
    console.log(e);
     

    if (e.detail.checked) {
      localStorage.setItem('notificaciones_push', 'true');
      this.service.service_general_get("Notification/Push-Notifications/" + this.userData.id + "/" + e.detail.checked).subscribe((data => {
        if (data.success) {
          console.log("data: ", data);
        }
      }));
    } else {
      localStorage.setItem('notificaciones_push', 'false');
      this.service.service_general_get("Notification/Push-Notifications/" + this.userData.id + "/" + e.detail.checked).subscribe((data => {
        if (data.success) {
          console.log("data: ", data);
        }
      }));
    }
  }

}