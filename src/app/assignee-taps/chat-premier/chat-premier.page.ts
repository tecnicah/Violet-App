import { Component, OnInit, ViewChild } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, IonContent, ModalController } from '@ionic/angular';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { GeneralService } from 'src/app/general/general.service';
import { NewMessaggePage } from './new-messagge/new-messagge.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// lu
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/general/loader.service';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { ConfirmationPage } from 'src/app/dialog/confirmation/confirmation.page';

// import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-chat-premier',
  templateUrl: './chat-premier.page.html',
  styleUrls: ['./chat-premier.page.scss'],
})
export class ChatPremierPage implements OnInit {

  constructor(public _services: GeneralService,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private iab: InAppBrowser,
    public modalController: ModalController,
    private router: Router,
    public loadingService: LoadingService) { }
  // private navCtrl: NavController

  @ViewChild(IonContent) theContent: IonContent;
  userData: any = {};
  sending: boolean = false;
  chat_conversations: any[] = [];
  public serviceline_conversation: number = 1;
  continuemesage: any = {};
  conversationId: number;
  temporalDocument: any[] = [];
  sr: any = [];
  keyboard: string = "0px";

  chatSecction: number = 1;
  chat: boolean = false;
  table_contacts: any[] = [];
  nameChat: string = "";
  sl: any[] = [];

  caCountry: any[] = [];

  userFilters: any = {
    country: "",
    serviceLineName: ""
  };

  userFilter: any = {
    name: "",
  }

  userFilter_: any = {
    name:{
      name:''
    },
  }

  ngOnInit() {
  }

  ///Premier chat

  ionViewWillEnter() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this._services.retrieveMappedObject().subscribe((receiveObj: any) => {
      this.getResient();
    })
    this.getResient();
    this.catalogos();

    window.addEventListener('ionKeyboardDidShow', ev => {
      console.log(ev);
      let keyheigth: any = ev;
      keyheigth = keyheigth.detail.keyboardHeight + 33;
      this.keyboard = keyheigth + "px";
      console.log(this.keyboard);
      // Do something with the keyboard height such as translating an input above the keyboard.
    });
    
    window.addEventListener('ionKeyboardDidHide', () => {
      // Move input back to original location
this.keyboard = "0px";
    });
  }

  async catalogos() {
    this.sl = await this._services.getCatalogueFrom('GetServiceLine');
    this.caCountry = await this._services.getCatalogueFrom('GetCountry');
  }


  segmentChanged(event?) {
    console.log(this.chatSecction);
    if (this.chatSecction == 1) {
      this.getResient(event);
    } else {
      this.getServices(event);
    }
  }

  getResient(event?) {
    this._services.service_general_get('Chat/SeeChats?user=' + this.userData.id).subscribe(n => {
      if (n.success) {
        this.table_contacts = n.result.value;
        console.log(this.table_contacts);
        if (event) {
          event.target.complete();
        }
      }
    })
  }

  public service_Line:number = 1;

  getConversation(id, sl) {
    this.conversationId = id;
    this.service_Line = sl;
    this.chat = true;
    this._services.service_general_get('Chat/GetConversation/' + id + '/' + this.userData.id).subscribe(n => {
      if (n.success) {
        this.chat_conversations = n.result.value;
        console.log(this.chat_conversations);
        setTimeout(() => {
          this.theContent.scrollToBottom().then(r => {
            console.log("scroll");
          });
        }, 1000);
      }
    })
  }
  // get conversacion del sr 
  getConversationSr(sr, sl) {
    console.log(sr)
    //let srid = sr.numberServiceRecord.substring(3);
    let srid = sr;
    this.service_Line = sl;
    console.log('idSr', srid);
    // this.navCtrl.navigateForward(`chat/:${sr}`);
    debugger
    this.router.navigate(['assignee-taps/chat/'+srid+'/'+this.service_Line])

  }

  sendMessage() {
    this.loadingService.loadingPresent();
    this.continuemesage = {
      "id": 0,
      "conversation": this.conversationId,
      "userId": this.userData.id,
      "message1": this.continuemesage.message,
      "time": new Date(),
      "status": false,
      "documentMessages": this.temporalDocument
    }
    console.log(this.continuemesage);

    this._services.service_general_post_with_url('Chat/SentMessage', this.continuemesage).subscribe(n => {
      console.log(n);
      this.temporalDocument = [];
      this.continuemesage = {
        "id": 0,
        "conversation": 0,
        "userId": this.userData.id,
        "message1": "",
        "time": "",
        "status": true,
      }
      this.getConversation(this.conversationId, this.service_Line);
      this.loadingService.loadingDismiss();
    })
  }

  filesUpload(file: string) {
    console.log(file)
    document.getElementById(file).click();
  }

  chatImageSrcStyle(src_path: string): string {

    let result: string = '';

    const kind_of_file: string = src_path.split('.')[1];

    switch (kind_of_file) {

      case 'gif':
      case 'jpg':
      case 'png':
      case 'svg':
      case 'jpeg':
        result = this._services.url_images + src_path;
        break;

      default:
        result = 'https://cdn.onlinewebfonts.com/svg/img_560325.png';
        break;

    }

    return result;

  }

  downloadDocumentSelected(url) {
    this.iab.create(this._services.url_images + url, '_system')
  }


  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath);
          console.log(file, this.files);

          fileEntry.file(file => {
            reader.readAsDataURL(file);
            reader.onload = () => {
              let imageUrl = reader.result;
              let encoded = imageUrl.toString().replace(/^data:(.*;base64,)?/, '');
              if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
              }


              let ext = droppedFile.relativePath.split(".");
              this.temporalDocument.push({
                "id": 0,
                "message": this.conversationId,
                "filePath": encoded,
                "fileExtension": ext[1],
                "date": new Date(),
                "status": true
              })
              this.continuemesage.message = droppedFile.relativePath;
              this.sendMessage();
            };
          });


        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  async newChat() {
    const modal = await this.modalController.create({
      component: NewMessaggePage,
    });

    modal.onDidDismiss().then((data: any) => {
      console.log(data);
      if (data.data.id) {
        this.chat = true;
        this.conversationId = data.data.id;
        this.getConversation(this.conversationId, this.service_Line);
        this.ionViewWillEnter();
      }
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
  
  option(options){
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let name = new Date().toISOString();

                this.temporalDocument.push({
                  "id": 0,
                  "message": this.conversationId,
                  "filePath": imageData,
                  "fileExtension": 'jpeg',
                  "date": new Date(),
                  "status": true
                })

                this.continuemesage.message = "photo";
  
                this.sendMessage();
     }, (err) => {
      // Handle error
     });
  }

  ///Chat sr
// /api/ChatImmigrationRelocation/GetListConversationByUser
  // ServiceRecord/GetServiceRecord/0/0/
  getServices(event?) {
    this.loadingService.loadingPresent();
    this._services.service_general_get('ChatImmigrationRelocation/GetListConversationByUser?user=' + this.userData.id).subscribe(r => {
      if (r.success) {
        this.loadingService.loadingDismiss();
        console.log(r.result.value);
        this.sr = r.result.value;
        if (event) {
          event.target.complete();
        }
      }
    })
  }

  Scroll(event) {
    this._services.onScroll(event);
  }

  async deleteConversation(data) {
    console.log("data a eliminar: ", data);
    const modal = await this.modalController.create({
      component: ConfirmationPage,
      cssClass: 'modal-general-confirm',
      componentProps: {
        header: "Delete",
        body: "Delete Convertation?",
        yesText: 'Yes, delete',
        noText: 'No, continue',
      }
    });

    modal.onDidDismiss().then((data__) => {
      if (data__.data) {
        this._services.service_general_delete('Chat/DeleteConversation/' + data.conversationId).subscribe(n => {
          if (n.success) {
            this.general_messages({
              title: "Success",
              body: "The convertation was deleted",
              success: true
            });
          }
          this.getResient();
        })
      }
    }) 

    await modal.present();
  }

  async deleteMenssage(data) {
    console.log("data a eliminar: ", data);
    const modal = await this.modalController.create({
      component: ConfirmationPage,
      cssClass: 'modal-general-confirm',
      componentProps: {
        header: "Delete",
        body: "Delete Message?",
        yesText: 'Yes, delete',
        noText: 'No, continue',
      }
    });

    modal.onDidDismiss().then((data__) => {
      if (data__.data) {
        this._services.service_general_delete('Chat/DeleteMessage/' + data.id).subscribe(n => {
          if (n.success) {
            this.general_messages({
              title: "Success",
              body: "The convertation was deleted",
              success: true
            });
            this.getConversation(this.conversationId,this.service_Line)
          }
        })
      }
    }) 

    await modal.present();
  }

  
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
}
