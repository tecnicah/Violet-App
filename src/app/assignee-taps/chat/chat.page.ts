import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from 'src/app/general/general.service';
import { IonContent, ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
// lu
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { LoadingService } from 'src/app/general/loader.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ConfirmationPage } from 'src/app/dialog/confirmation/confirmation.page';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';




@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  constructor(public _services: GeneralService, private socialSharing: SocialSharing,
    private camera: Camera, private callNumber: CallNumber,
    public actionSheetController: ActionSheetController,
    private iab: InAppBrowser, public modalController: ModalController,
    private localNotifications: LocalNotifications,
    private route: ActivatedRoute,
    private location: Location,
    public loadingServices: LoadingService) { }

  @ViewChild(IonContent) theContent: IonContent;
  userData: any = {};
  sending: boolean = false;
  public serviceline_conversation: number = 1;
  sr:any;
  addGRoup = false;
  keyboard: string = "0px";
  inteGrupo = false;
  teamImigration:any;
  listTeam:any;


  ionViewWillEnter() {
    this.sr = this.route.snapshot.paramMap.get('sr');
    this.sl = this.route.snapshot.paramMap.get('sl');
    this.serviceline_conversation = this.sl;
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this._services.retrieveMappedObject().subscribe((receivedObj: any) => {
      console.log(receivedObj);
      this.localNotifications.schedule({
        text: 'New Chat'
      });
      this.initChatBehavior(this.serviceline_conversation);
    });
    this.initChatBehavior(this.serviceline_conversation);
  }

  public sl:any;
  
  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    console.log(this.userData);
    this.sr = this.route.snapshot.paramMap.get('sr');
    this.sl = this.route.snapshot.paramMap.get('sl');
    this.serviceline_conversation = this.sl;
    console.log(this.sr);
    console.log(this.sl);
    if (this.sr != '') {
      // this.getCatalog();
      this.loadingServices.loadingPresent();
      this._services.service_general_get(`ChatImmigrationRelocation/GetListConversationByUser?user=${this.userData.id}`).subscribe(r => {
        if (r.success) {
          console.log(r);
          for (let i = 0; i < r.result.value.length; i++) {
            const element = r.result.value[i];
            if (element.numberServiceRecord == this.sr) {
              this.teamImigration = element;
            }
          }
          this.loadingServices.loadingDismiss();
        }
        console.log('value team', this.teamImigration);


      });
    }
  }
  myBackButton() {
    this.location.back();
  }

  openIntGroup(idConversation: number) {
    console.log('abrir integrantes del grupo ');
    this.inteGrupo = true;
    this.loadingServices.loadingPresent();
    this._services.service_general_get(`ChatImmigrationRelocation/GetUsersTeam?conversation=${idConversation}`).subscribe(response => {
      if (response.success) {
        console.log(response);
        this.listTeam = response.result.value;
        this.loadingServices.loadingDismiss();
      }
    });
  }

  //*********************************************//
  async call(number, message) {
    console.log("Entra a llamar");
    console.log("Entra a llamar");
    console.log(number);
    let search = '+';
    let posicion = number.indexOf(search);
    console.log(posicion)
    let final_number;
    if(posicion >=1){
      let prefix = number.substr(0, posicion);
      let phone = number.substr(posicion + 1);
      final_number = '+'+prefix+phone;
      console.log(final_number);
    }
    if (number != null && number != '' && number != undefined) {
      const modal = await this.modalController.create({
        component: ConfirmationPage,
        cssClass: 'modal-general-confirm',
        componentProps: {
          header: "Message",
          body: "Send message to" + message + "?",
          yesText: 'Yes',
          noText: 'No',
        }
      });

      modal.onDidDismiss().then((data) => {
        console.log(data);
        if (data.data) {
          this.socialSharing.shareViaWhatsAppToPhone(final_number,'Hello '+message,null,null);
        }
      })
      this.modalController.dismiss();
      await modal.present();
    }
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

  option(options) {
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let name = new Date().toISOString();

      this.chat_document.fileExtension = 'jpeg';
      this.chat_document.filePath = imageData;
      this.chat_model.chatDocumentImmigrationRelocations.push(this.chat_document);
      this.chat_model.comment = name;

      if (this.serviceline_conversation == 1) {

        this.continueChatConversation();

      } else {

        this.newChatConversation();

      }
    }, (err) => {
      // Handle error
    });
  }

  public chat_conversations: any[] = [];
  public first_conversation: boolean = false;
  public initChatBehavior(type): void {

    console.log("Nuevo mensaje recibido");
    this.serviceline_conversation = type;
    console.log(this.serviceline_conversation)
    let so_and_type: string;
    if (Number(localStorage.getItem('sr')) == 0) {
      let srid = this.sr.substring(3);
      this.addGRoup = true;
      so_and_type = `?Service_record_id=${this.sr}&type=${this.serviceline_conversation}`;
    } else {
      so_and_type = `?Service_record_id=${localStorage.getItem('sr')}&type=${this.serviceline_conversation}`;
      console.log('chat sr');
    }


    this.loadingServices.loadingPresent();
    this._services.service_general_get(`ChatImmigrationRelocation/GetConversation${so_and_type}`)
      .subscribe((response: any) => {

        if (response.success) {

          const chats_in: any = response.result.value;

          this.chat_conversations = chats_in;
          console.log(this.chat_conversations);
          setTimeout(() => {
            this.theContent.scrollToBottom().then(r => {
              console.log("scroll");
            });
          }, 1000);

          if (chats_in.length == 0) {

            this.first_conversation = true;

          } else {

            this.first_conversation = false;

          }

          this.loadingServices.loadingDismiss();
          console.log('[CP2294] Chats in res ===> ', response);

        }

      }, (error: any) => {
        this.loadingServices.loadingDismiss();
        console.error('ChatImmigrationRelocation/GetConversation => ', error);

      });
      this.loadingServices.loadingDismiss();
  }

  public chat_model: ChatConversation = new ChatConversation();
  public continueChatConversation(): void {


    this.chat_model.dateComment = new Date();
    this.chat_model.userId = this.userData.id;
    this.chat_model.chatCoversationId = this.chat_conversations[0].conversationId;

    const chat_data: ChatConversation[] = [this.chat_model];

    if (this.chat_model.comment.length != 0) {
      this.sending = true;

      console.log('[CP2338] Continu Chat send ===> ', chat_data);
      debugger
      this.loadingServices.loadingPresent();
      this._services.service_general_post_with_url('ChatImmigrationRelocation/CreateComment', chat_data)
        .subscribe((response: any) => {
          this.sending = false;
          console.log('Res (ChatImmigrationRelocation/CreateComment) => ', response);

          if (response.success) {

            this.chat_model.comment = "";
            this.chat_model.chatDocumentImmigrationRelocations = [];
            this.initChatBehavior(this.serviceline_conversation);
            this.loadingServices.loadingDismiss();
          }

        }, (error: any) => {
          this.loadingServices.loadingDismiss();
          console.error('Error (ChatImmigrationRelocation/CreateComment) ==> ', error);

        });

    }

  }

  public new_chat: newChat = new newChat();
  public newChatConversation(): void {
    this.sending = true;
    this.chat_model.dateComment = new Date();
    this.chat_model.userId = this.userData.id;

    this.new_chat.createdDate = new Date();
    this.new_chat.createdBy = this.userData.id;
    this.new_chat.serviceLineId = this.serviceline_conversation;
    this.new_chat.serviceRecordId = Number(localStorage.getItem('sr'));
    if( this.new_chat.serviceRecordId == 0){ this.new_chat.serviceRecordId = Number(this.sr) }
    this.new_chat.chatImmigrationRelocations[0] = this.chat_model;

    const chat_data: newChat[] = [this.new_chat];

    if (this.chat_model.comment.length != 0) {
      this.loadingServices.loadingPresent();
      this._services.service_general_post_with_url('ChatImmigrationRelocation/CreateConversation', chat_data)
        .subscribe((response: any) => {

          console.log('Res [CP2351] (ChatImmigrationRelocation/CreateConversation) => ', response);
          console.log('Data sent => ', chat_data);

          this.sending = false;
          if (response.success) {
            this.chat_model.comment = " ";
            this.chat_model.chatDocumentImmigrationRelocations = [];
            this.initChatBehavior(this.serviceline_conversation);

          }
          this.loadingServices.loadingDismiss();

        }, (error: any) => {
          this.loadingServices.loadingDismiss();
          console.log('Error (ChatImmigrationRelocation/CreateConversation) => ', error);

        });

    }

  }

  public chatImageSrcStyle(src_path: string): string {

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

  file() {
    let doc = document.getElementById('chatfile');
    doc.click();
  }



  /* New Challenger has enter the ring * */
  public files: NgxFileDropEntry[] = [];
  public chat_document: ChatDocument = new ChatDocument();
  public dropped(files: NgxFileDropEntry[]) {
    console.log("Entra a documentos");
    this.files = files;
    const root: any = this;
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

              const base64_gotted: any = reader.result;

              this.chat_document.fileExtension = file.name.split('.')[1];
              this.chat_document.filePath = base64_gotted.split(',')[1];
              this.chat_model.chatDocumentImmigrationRelocations.push(this.chat_document);
              this.chat_model.comment = file.name;

              if (this.first_conversation) {

                this.newChatConversation();
                
              } else {
                
                this.continueChatConversation();

              }


            };
          });
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        //console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    //console.log(event);
  }

  public fileLeave(event) {
    //console.log(event);
  }

  send() {
    if (this.first_conversation) {
      this.newChatConversation();
    } else {
      this.continueChatConversation();
    }
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
            this.initChatBehavior(this.serviceline_conversation)
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


  cambio(e){
    console.log(e)
  }

}

export class MessageDto {
  public user: string = '';
  public msgText: string = '';
}

export class ChatConversation {
  id: number = 0;
  chatCoversationId: number = 0;
  userId: number = 0;
  chatDocumentId: number = 0;
  comment: string = '';
  dateComment: Date = null;
  status: boolean = true;
  chatDocumentImmigrationRelocations: ChatDocument[] = [];
}

export class ChatDocument {
  id: number = 0;
  filePath: string = '';
  fileExtension: string = '';
  chatImmigrationRelocationId: number = 0;
  status: boolean = true;
}

export class newChat {
  id: number = 0;
  serviceLineId: number = 0;
  status: boolean = true;
  createdBy: number = 0;
  createdDate: Date = null;
  serviceRecordId: number = 0;
  chatImmigrationRelocations: ChatConversation[] = [new ChatConversation()];
}
