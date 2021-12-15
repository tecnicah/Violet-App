import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { GeneralService } from 'src/app/general/general.service';
import { GeneralMensagePage } from '../general-mensage/general-mensage.page';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  loginform : any;

  constructor(public modalController: ModalController, 
              public formBuilder : FormBuilder,
              public service: GeneralService) { }

  ngOnInit() {
    this.loginform = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,Validators.email
      ]))
    });
  }

  getErrorMessage() {
    if(this.loginform.get('email').hasError('email')){
      return 'Not a valid email';
    }

    if(this.loginform.get('email').hasError('required')){
      return 'Email required';
    }

  }

  changePassword(){
    console.log(this.loginform.get('email').value);

      this.service.loader = true;
  
      this.service.service_general_put(`User/Recovery_password?email=${ this.loginform.get('email').value }`, this.loginform.value)
        .subscribe( (response:any) => {
  
          if( response.success ) {
  
            this.service.loader = false;
            this.general_messages({
              title: "Password recovered",
              body: "A new password has been sent to your email."
            });
  
          } else {
            this.service.loader = false;
            this.general_messages({
              title: "Error",
              body: "Please try later or use support contact #COD135"
            });
          }
  
        }, (error:any) => {
  
          console.log('Erro ===> ', error);
  
          this.service.loader = false;
  
        });
  
    }

    async general_messages(data){
      const modal = await this.modalController.create({
        component: GeneralMensagePage,
        cssClass: 'modal-general-mensage',
        backdropDismiss: true,
        componentProps: data
      });

      modal.onDidDismiss().then((data) => {
        console.log(data);
        this.modalController.dismiss();
      })
      
      await modal.present();

      
    }
}
