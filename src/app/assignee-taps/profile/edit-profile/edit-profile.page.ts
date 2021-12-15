import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ModalController, NavParams, ActionSheetController } from '@ionic/angular';
import { DocumentsDialogPage } from 'src/app/dialog/documents-dialog/documents-dialog.page';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { GeneralService } from 'src/app/general/general.service';
import { LoadingService } from 'src/app/general/loader.service';
import { ConfirmationPage } from 'src/app/dialog/confirmation/confirmation.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  constructor(public navParams: NavParams, private camera: Camera,
    public service: GeneralService, public actionSheetController: ActionSheetController,
    public modalController: ModalController,
    private iab: InAppBrowser,
    public loadingService: LoadingService) { }

  userData: any = {};
  data: any = {};
  caLanguages: any[] = [];
  caCountry: any[] = [];
  caCity: any[] = [];
  caPolicyType: any[] = [];
  caDuration: any[] = [];
  caGrade: any[] = [];
  caPetType: any[] = [];
  caBreed: any[] = [];
  caSize: any[] = [];
  caWeight: any[] = [];
  info: any = {};
  caMaritalstatus: any[] = [];
  caRelationship: any[] = [];
  caDocumentType: any[] = [];
  view: boolean = false;

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.catalogs();
    this.data = this.navParams.data;
    this.data.modal = null;
    this.info = this.data.data;
    console.log(this.data);
    this.view = true;


    if (this.data.type == 1 || this.data.type == 2) {
      this.info.family = [];
      for (let j = 0; j < this.info.languageDependentInformations.length; j++) {
        this.info.family.push(this.info.languageDependentInformations[j].language)
      }
    }

    if (this.data.type == 5) {
      this.info.family = [];
      for (let j = 0; j < this.info.languagesSpokens.length; j++) {
        this.info.family.push(this.info.languagesSpokens[j].languages)
      }
    }


    
    console.log(this.info);
    this.getBreed();
    this.getDocument();
    this.userData = JSON.parse(localStorage.getItem('userData'));

  }

  async catalogs() {
    this.caLanguages = await this.service.getCatalogueFrom('GetLanguages');
    this.caCountry = await this.service.getCatalogueFrom('GetCountry');
    this.caCity = await this.service.getCatalogueFrom('GetCity');
    this.caPolicyType = await this.service.getCatalogueFrom('GetPolicyType');
    this.caDuration = await this.service.getCatalogueFrom('GetDuration');
    this.caGrade = await this.service.getCatalogueFrom('GetGradeSchooling');
    this.caPetType = await this.service.getCatalogueFrom('GetPetType');
    this.caSize = await this.service.getCatalogueFrom('GetSize');
    this.caWeight = await this.service.getCatalogueFrom('GetWeightMeasure');
    this.caMaritalstatus = await this.service.getCatalogueFrom('GetMaritalStatus');
    this.caRelationship = await this.service.getCatalogueFrom('GetRelationship');
    this.caDocumentType = await this.service.getCatalogueFrom('GetDocumentType');
  }

  async getBreed() {
    this.caBreed = await this.service.getCatalogueFrom('GetBreed?id=' + this.info.petTypeId);
  }

  docName(id) {
    for (let i = 0; i < this.caDocumentType.length; i++) {
      const element = this.caDocumentType[i];
      if (id = element.id) {
        return element.documentType;
      }
    }
  }

  back() {
    let back: any = document.getElementById('back');
    back.play();

    if (this.data.type == 5) {
      let languages = [];
      for (let i = 0; i < this.info.languagesSpokens.length; i++) {
        const element = this.info.languagesSpokens[i];
        languages.push({
          assignneInformation: this.info.id,
          languages: element
        })
      }
      this.info.languagesSpokens = languages;
    }
    this.modalController.dismiss();


  }

  getAge(date_in: any) {

    const date_init = new Date(date_in),
      date_today = new Date();

    let diff = (date_init.getTime() - date_today.getTime()) / 1000;
    diff /= (60 * 60 * 24);

    this.info.age = Math.abs(Math.round(diff / 365.25));

  }

  getRelationShip(id) {
    for (let i = 0; i < this.caRelationship.length; i++) {
      const element = this.caRelationship[i];
      if (id == element.id) {
        return element.relationship;
      }
    }
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

  async photo() {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }

          this.option(options);
        }
      }, {
        text: 'Gallery',
        icon: 'images',
        handler: () => {
          const options: CameraOptions = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }
          this.option(options);
        }
      }]
    });
    await actionSheet.present();
  }
  //**********************************************************************//
  option(options) {
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let name = new Date().toISOString();

      if(this.data.type == 5){
        this.data.allSR.assigneeInformations[0].photoExtension = 'jpeg';
        this.data.allSR.assigneeInformations[0].photo = imageData;
        this.save();
      }
      if(this.data.type == 4){
        this.data.allSR.assigneeInformations[0].petsNavigation[this.data.pos].photoExtension = 'jpeg';
        this.data.allSR.assigneeInformations[0].petsNavigation[this.data.pos].photo = imageData;
        this.save();
      }
      if(this.data.type == 2 || this.data.type == 1 || this.data.type == 3){
        this.data.allSR.assigneeInformations[0].dependentInformations[this.data.pos].photoExtension = 'jpeg';
        this.data.allSR.assigneeInformations[0].dependentInformations[this.data.pos].photo = imageData;
        this.save();
      }
    }, (err) => {
      // Handle error
    });
  }

  save() {
    console.log(this.data.allData);
    console.log(this.info);

    this.loadingService.loadingPresent();

    if (this.data.type == 1 || this.data.type == 2) {
      this.info.languageDependentInformations = [];
      for (let i = 0; i < this.info.family.length; i++) {
        this.info.languageDependentInformations.push({
          dependent: this.info.id,
          language: this.info.family[i]
        })
      }
    }


    if (this.data.type == 1 || this.data.type == 2 || this.data.type == 3) {
      for (let i = 0; i < this.data.allData.dependentInformations.length; i++) {
        const element = this.data.allData.dependentInformations[i];
        if (element.id == this.info.id) {
          this.data.allData.dependentInformations[i] = this.info;
        }
      }
    }

    if (this.data.type == 4) {
      for (let i = 0; i < this.data.allData.petsNavigation.length; i++) {
        const element = this.data.allData.petsNavigation[i];
        if (element.id == this.info.id) {
          this.data.allData.petsNavigation[i] = this.info;
        }
      }
    }

    if (this.data.type == 5) {
      this.info.languagesSpokens = [];
      for (let i = 0; i < this.info.family.length; i++) {
        this.info.languagesSpokens.push({
          assignneInformation: this.info.id,
          languages: this.info.family[i]
        })
      }

      this.data.allData.languagesSpokens = this.info.languagesSpokens;
    }

    this.data.allSR.assigneeInformations[0] = this.data.allData;

    console.log(this.data);

    this.service.service_general_put('ServiceRecord/Update', this.data.allSR)
      .subscribe((response: any) => {
        console.log(response);
        if (response.success) {
          this.loadingService.loadingDismiss();
          this.ionViewWillEnter();
          this.general_messages({
            title: "Success",
            body: "Edited information",
            success: true
          });
          this.modalController.dismiss();
        }
      })
  }

  viewDoc(id) {
    this.service.service_general_get(`ImmigrationProfile/GetAssigneFamilyById?id=${id}`)
      .subscribe((response: any) => {
        this.iab.create(this.service.url_images + response.result.value[0].ulr_document, '_system')
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

  documents = [];
  getDocument() {
    let id_selected = 0;
    if (Number(localStorage.getItem('sr')) != 0) {
      id_selected = Number(localStorage.getItem('sr'));
    } else {
      id_selected = Number(localStorage.getItem('srAd'));
    }
    this.service.service_general_get(`ImmigrationProfile/GetAssigneFamily?sr=${id_selected}`)
      .subscribe((response: any) => {
        console.log('Library Res => ', response);
        if (response.success) {
          let library_ass_data = response.result.value;
           for (let index = 0; index < library_ass_data.length; index++) {
             if(library_ass_data[index].id == this.info.id){
                this.documents = library_ass_data[index].document;
             }
             /*
             let separate_name = library_ass_data[index].dependent.split('/');
             console.log(separate_name);
             if(separate_name[1].trim() ==){
              this.documents = library_ass_data[index].document;
             }
             */
           }



          console.log('library_ass_data Succ ==> ', library_ass_data.length);
        }
      }, (error: any) => {
        console.error('Error (ImmigrationProfile/GetAssigneFamilyById) => ', error);
      });
  }

  async deleteDocument(id) {
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
        if (id != 0) {
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
      }
    })
    this.modalController.dismiss();
    await modal.present();
  }
}
