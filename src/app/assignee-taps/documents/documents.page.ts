import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ModalController } from '@ionic/angular';
import { ConfirmationPage } from 'src/app/dialog/confirmation/confirmation.page';
import { DocumentsDialogPage } from 'src/app/dialog/documents-dialog/documents-dialog.page';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { GeneralService } from 'src/app/general/general.service';
import { LoadingService } from 'src/app/general/loader.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {

  constructor(public router: Router,
    public service: GeneralService,
    public modalController: ModalController,
    private iab: InAppBrowser,
    public loadingService: LoadingService) { }

  userData: any = {};
  sr: any;
  dependents: any[] = [];
  ngOnInit() {
  }

  Scroll(event) {
    this.service.onScroll(event);
  }

  ionViewWillEnter() {
   console.log("documentos");
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.sr = localStorage.getItem('sr');
    this.loadingService.loadingPresent();
    this.service.service_general_get(`ImmigrationProfile/GetAssigneFamily?sr=${this.sr}`)
      .subscribe((response: any) => {
        console.log('Library Res => ', response);
        if (response.success) {
          this.dependents = response.result.value;
          console.log('library_ass_data Succ ==> ', this.dependents);
        }
        this.loadingService.loadingDismiss();
      }, (error: any) => {
        this.loadingService.loadingDismiss();
        console.error('Error (ImmigrationProfile/GetAssigneFamilyById) => ', error);
      });

  }

  back() {
    let back: any = document.getElementById('back');
    back.play()
    console.log(localStorage.getItem('back'));
    this.router.navigateByUrl(localStorage.getItem('back'));
  }

  viewDoc(id) {
    console.log(id);
    this.service.service_general_get('ImmigrationProfile/GetAssigneFamilyById?id=' + id).subscribe((r => {
      console.log(r)
      if (r.success) {
        if (r.result.value.length > 0) {
          let url = r.result.value[0].ulr_document;
          console.log(url);
          this.iab.create(this.service.url_images + url, '_system')
        }
      }

    }))
  }

    //FUNCION PARA ELIMINAR DOCUMENTOS//
    async deleteDocument(id, i) {
      const modal = await this.modalController.create({
        component: ConfirmationPage,
        cssClass: 'modal-general-confirm',
        componentProps: {
          header: "Delete",
          body: "Delete document?",
          yesText: 'Yes, delete',
          noText: 'No, continue',
        }
      });
  
      modal.onDidDismiss().then((data) => {
        console.log(data, id);
        if (data.data) {
            this.service.service_general_get(`ImmigrationProfile/DeleteDocumentDependent?id=${ id }`).subscribe(r => {
              if (r.success) {
                this.general_messages({
                  title: "Success",
                  body: "The document was deleted",
                  success: true
                });
                this.ionViewWillEnter();
              }
            })
          
        }
      })
      this.modalController.dismiss();
      await modal.present();
    }

      //***************************************************************************//
  //FUNCION PARA ABRIR MODAL DE CONFIRMACION//
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

  async documentDialog() {
    const modal = await this.modalController.create({
      component: DocumentsDialogPage,
      componentProps: {id: 3},
      backdropDismiss: true,
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.ionViewWillEnter();
    })
    this.modalController.dismiss();

    await modal.present();


  }
}
