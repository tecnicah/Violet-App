import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { ForgotPasswordPage } from '../dialog/forgot-password/forgot-password.page';
import { GeneralMensagePage } from '../dialog/general-mensage/general-mensage.page';
import { GeneralService } from '../general/general.service';
import { TipsPage } from '../assignee-taps/tips/tips.page';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { LoadingService } from '../general/loader.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    show_password: boolean = false;
    loginform: any;
    resertform: any;

    constructor(public formBuilder: FormBuilder, private nativeStorage: NativeStorage,
        public modalController: ModalController,
        public service: GeneralService,
        public router: Router,
        public Keyboard: Keyboard,
        public loadingService: LoadingService,
        public platform: Platform) { }

    type: string = "password";
    show_header: boolean = false;

    ngOnInit() {
        if (this.platform.is('android')) {
            this.show_header = false;
        } else if (this.platform.is('ios')) {
            this.show_header = true;
        }

        this.loginform = this.formBuilder.group({
            password: new FormControl('', Validators.required),
            email: new FormControl('', Validators.compose([
                Validators.required, Validators.email
            ]))
        });

        this.resertform = this.formBuilder.group({
            email: new FormControl('', Validators.compose([
                Validators.required, Validators.email
            ]))
        });
    }

    ionViewWillEnter() {
        if (localStorage.getItem('userData')) {
            this.router.navigateByUrl('assignee-taps/home');
        }
    }

    getErrorMessage() {
        if (this.loginform.get('email').hasError('email')) {
            return 'Not a valid email';
        }

        if (this.loginform.get('email').hasError('required')) {
            return 'Email required';
        }

    }

    getErrorMessagereset() {
        if (this.resertform.get('email').hasError('email')) {
            return 'Not a valid email';
        }

        if (this.resertform.get('email').hasError('required')) {
            return 'Email required';
        }

    }

    onClick() {
        if (this.type == "password") {
            let unlock: any = document.getElementById('unlock');
            unlock.play();
            this.type = "text";
        } else {
            let lock: any = document.getElementById('lock');
            lock.play();
            this.type = "password";
        }
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: ForgotPasswordPage,
            backdropDismiss: true
        });
        return await modal.present();
    }


    login() {
        console.log(this.loginform.value);
        localStorage.setItem('credenciales', JSON.stringify(this.loginform.value));
        this.loadingService.loadingPresent();
        this.service.service_general_post_with_url('User/Login?' + 'email=' + this.loginform.get('email').value + '&password=' + this.loginform.get('password').value, this.loginform.value)
            .subscribe((response: any) => {

                if (response.success) {
                    console.log(response);
                    let play: any = document.getElementById('success');

                    /*if (//response.result.role.id != 19 && 
                        //response.result.role.id !=  4 &&
                        response.result.role.id != 200
                        //response.result.role.id !=  2 &&
                        //response.result.role.id !=  1
                    ) {

                        this.general_messages({
                            title: "Access denied",
                            body: "Doesn't have permission to access",
                            success: false
                        });
                        this.loadingService.loadingDismiss();
                        return;

                    }*/

                    debugger

                    if (response.result.assigneeInformations.length > 0) {
                        localStorage.setItem('sr', response.result.assigneeInformations[0].serviceRecordId);
                        localStorage.setItem('userData', JSON.stringify(response.result));
                        this.putToken();
                        play.play();
                        this.loadingService.loadingDismiss();;
                        this.tips();
                        this.router.navigateByUrl('assignee-taps/home');
                    } else if (response.result.role.id != 4) {
                        localStorage.setItem('sr', '0');
                        localStorage.setItem('userData', JSON.stringify(response.result));
                        this.putToken();
                        play.play();
                        this.loadingService.loadingDismiss();;
                        this.tips();
                        this.router.navigateByUrl('assignee-taps/home');
                    } else {
                        let play: any = document.getElementById('error');
                        play.play();
                        this.loadingService.loadingDismiss();;
                        this.general_messages({
                            title: "Access denied",
                            body: "Doesn't have a service record",
                            success: false
                        });
                    }

                } else {
                    let play: any = document.getElementById('error');
                    play.play();
                    this.loadingService.loadingDismiss();;
                    this.general_messages({
                        title: "Access denied",
                        body: "User or password incorrect",
                        success: false
                    });
                }



                console.log('Response ===> ', response);

            }, (error: any) => {

                console.error('Error login WS ===> ', error);

            });
    }

    putToken() {

        this.nativeStorage.getItem('token')
            .then(token => {
                console.log("Este es el Token: ", token)
                let user = JSON.parse(localStorage.getItem('userData'));
                console.log(user);
                this.service.service_general_put('User/Token/' + user.id + '?token=' + token, '').subscribe((response: any) => {
                    if (response.success) {
                        console.log("response token: ", response);
                    }
                })
            }, (error) => {
                console.error("Error al consultar el token: ", error)
            });

        /*
        let token = localStorage.getItem('token');
        let user = JSON.parse(localStorage.getItem('userData'));
        console.log(token);
        console.log(user);
        this.service.service_general_put('User/Token/'+user.id+'?token='+token,'').subscribe((response: any) => {
          if(response.success){
            console.log("response token: ", response);
          }
        })
        */
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

    async tips() {
        if (Number(localStorage.getItem('first')) == 1) {

        } else {
            const modal = await this.modalController.create({
                component: TipsPage,
                backdropDismiss: true
            })

            modal.onDidDismiss().then((data) => {
                console.log(data);
            })

            await modal.present();
        }
    }

    changePassword() {
        console.log(this.resertform.get('email').value);

        this.loadingService.loadingPresent();;

        this.service.service_general_put(`User/Recovery_password?email=${this.resertform.get('email').value}`, this.resertform.value)
            .subscribe((response: any) => {
                console.log(response);
                if (response.success) {

                    this.loadingService.loadingDismiss();;
                    this.general_messages({
                        title: "Password recovered",
                        body: "A new password has been sent to your email.",
                        success: true
                    });
                    this.show_password = false;
                } else {
                    this.loadingService.loadingDismiss();;
                    this.general_messages({
                        title: "Error",
                        body: "Please try later or use support contact #COD135",
                        success: false
                    });
                }

            }, (error: any) => {

                console.log('Erro ===> ', error);

                this.loadingService.loadingDismiss();;

            });

    }

    hideKey() {
        this.Keyboard.hide();
    }

    onKey($event) {
        if ($event.key == "Enter" || $event.keyCode == 13) {
            this.hideKey();
            this.login();
        }
    }

    pass($event) {
        if ($event.key == "Enter" || $event.keyCode == 13) {
            this.hideKey();
            this.changePassword();
        }
    }

    recuperarPassword() {
        this.show_password = true;
    }

    login_() {
        this.show_password = false;
    }
}
