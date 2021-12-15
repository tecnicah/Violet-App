import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { GeneralService } from 'src/app/general/general.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ActionSheetController, IonContent, ModalController } from '@ionic/angular';
import { LoadingService } from 'src/app/general/loader.service';
import { ActivatedRoute } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { ParticipantesPage } from 'src/app/dialog/participantes/participantes.page';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { ConfirmationPage } from 'src/app/dialog/confirmation/confirmation.page';

@Component({
  selector: 'app-chat-assignado',
  templateUrl: './chat-assignado.page.html',
  styleUrls: ['./chat-assignado.page.scss'],
})
export class ChatAssignadoPage implements OnInit {

  @ViewChild(IonContent) theContent: IonContent;
  userData: any = {};
  sending: boolean = false;
  public serviceline_conversation: number = 1;
  sr
  addGRoup = false;
  keyboard: string = "0px";
  inteGrupo = false;
  teamImigration;
  listTeam;


  constructor(private location: Location, public _services: GeneralService, private camera: Camera, public actionSheetController: ActionSheetController, private iab: InAppBrowser, private statusBar: StatusBar, private localNotifications: LocalNotifications, private route: ActivatedRoute, public loadingServices: LoadingService, public modalCtrl:ModalController) { }

  //**********************************************************************//
  homeCountry:any;
  hostCountry:any;
  ionViewWillEnter() {
    console.log("chat asignado")
    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#F7F8FA');
    this.statusBar.styleDefault();
    this.sr = Number(localStorage.getItem('sr'));
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.homeCountry = this.userData.assigneeInformations[0].homeCountryId;
    this.hostCountry = this.userData.assigneeInformations[0].hostCountry;
    this._services.retrieveMappedObject().subscribe((receivedObj: any) => {
      console.log(receivedObj);
      this.localNotifications.schedule({
        text: 'New Chat'
      });
      this.initChatBehavior(this.SL)
    });
    this.initChatBehavior(1);
    this.initChatBehavior(2);
    console.log("USERDATA: ", this.userData);
    this.getCatalogos(); 
  }
  //**********************************************************************//
  ngOnInit() {
    
  }
  //**********************************************************************//
  public country = [];
  async getCatalogos(){
    this.country = await this._services.getCatalogueFrom('GetCountry');
  }
  //**********************************************************************//
  //GET NAME COUNTRY//
  getName(id){
    for (let i = 0; i < this.country.length; i++) {
      if(this.country[i].id == id){
         return this.country[i].name;
      }
    }
  }
  //**********************************************************************//
  async showParticipantes(){
    const modal = await this.modalCtrl.create({
      component: ParticipantesPage,
      componentProps: {
        serviceLine : this.SL,
        idConversacion: this.idConversation
      },
      backdropDismiss: true,
    });

    modal.onDidDismiss().then((data: any) => {
      console.log(data);
      if (data.data.success) {
       
      }
    })
    this.modalCtrl.dismiss();
    await modal.present();
  }
  //**********************************************************************//
  public showMenssages:boolean = false;
  public __messages__:string = '';
  public SL: number = 1;
  chatRelocation() {
    this.SL = 2;
    this.initChatBehavior(2);
    this.showMenssages = true;
    this.__messages__ = 'Relocation Team';
  }
  //**********************************************************************//
  chatImmigration() {
    this.SL = 1;
    this.initChatBehavior(1);
    this.showMenssages = true;
    this.__messages__ = 'Immigration Team';
  }
  //**********************************************************************//
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
  //**********************************************************************//
  public idConversation:any;
  public chat_conversations: any[] = [];
  public first_conversation: boolean = false;
  public initChatBehavior(type): void {
    this.serviceline_conversation = type;
    console.log(this.serviceline_conversation)
    let so_and_type: string;
    if (Number(localStorage.getItem('sr')) == 0) {
      let srid = this.sr.substring(3);
      this.addGRoup = true;
      so_and_type = `?Service_record_id=${srid}&type=${this.serviceline_conversation}`;
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
            this.idConversation = chats_in[0].conversationId;
          }
          this.loadingServices.loadingDismiss();
          console.log('[CP2294] Chats in res ===> ', response);
          if(type == 1){
            this.immigration = response.result.value[response.result.value.length - 1];
          }else if(type == 2){
            this.relocation = response.result.value[response.result.value.length - 1];
          }
        }
      }, (error: any) => {
        console.error('ChatImmigrationRelocation/GetConversation => ', error);
      });
  }
  public immigration:any;
  public relocation:any;
  //**********************************************************************//
  public chat_model: ChatConversation = new ChatConversation();
  public continueChatConversation(): void {
    this.chat_model.dateComment = new Date();
    this.chat_model.userId = this.userData.id;
    this.chat_model.chatCoversationId = this.chat_conversations[0].conversationId;
    const chat_data: ChatConversation[] = [this.chat_model];
    if (this.chat_model.comment.length != 0) {
      this.sending = true;
      console.log('[CP2338] Continu Chat send ===> ', chat_data);
      this.loadingServices.loadingPresent();
      this._services.service_general_post_with_url('ChatImmigrationRelocation/CreateComment', chat_data)
        .subscribe((response: any) => {
          this.sending = false;
          console.log('Res (ChatImmigrationRelocation/CreateComment) => ', response);

          if (response.success) {

            this.chat_model.comment = '';
            this.chat_model.chatDocumentImmigrationRelocations = [];
            this.initChatBehavior(this.serviceline_conversation);
            this.loadingServices.loadingDismiss();
          }

        }, (error: any) => {
          this.loadingServices.loadingDismiss();
          console.error('Error (ChatImmigrationRelocation/CreateComment) ==> ', error);

        });
        this.loadingServices.loadingDismiss();
    }

  }
  //**********************************************************************//
  public new_chat: newChat = new newChat();
  public newChatConversation(): void {
    this.sending = true;
    this.chat_model.dateComment = new Date();
    this.chat_model.userId = this.userData.id;
    this.new_chat.createdDate = new Date();
    this.new_chat.createdBy = this.userData.id;
    this.new_chat.serviceLineId = this.serviceline_conversation;
    this.new_chat.serviceRecordId = Number(localStorage.getItem('sr'));
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

            this.chat_model.comment = '';
            this.chat_model.chatDocumentImmigrationRelocations = [];
            this.initChatBehavior(this.serviceline_conversation);
            this.loadingServices.loadingDismiss();
          }
          this.loadingServices.loadingDismiss();

        }, (error: any) => {
          this.loadingServices.loadingDismiss();
          console.log('Error (ChatImmigrationRelocation/CreateConversation) => ', error);

        });
        this.loadingServices.loadingDismiss();
    }

  }
  //**********************************************************************//
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
  //**********************************************************************//
  downloadDocumentSelected(url) {
    this.iab.create(this._services.url_images + url, '_system')
  }
  //**********************************************************************//
  file() {
    let doc = document.getElementById('chatfile');
    doc.click();
  }
  //**********************************************************************//
  /* New Challenger has enter the ring * */
  public files: NgxFileDropEntry[] = [];
  public chat_document: ChatDocument = new ChatDocument();
  public dropped(files: NgxFileDropEntry[]) {

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

              if (this.serviceline_conversation == 1) {

                this.continueChatConversation();

              } else {

                this.newChatConversation();

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
  //**********************************************************************//
  public fileOver(event) {
    //console.log(event);
  }
  //**********************************************************************//
  public fileLeave(event) {
    //console.log(event);
  }
  //**********************************************************************//
  send() {
    if (this.first_conversation) {
      this.newChatConversation();
    } else {
      this.continueChatConversation();
    }
  }
  //**********************************************************************//
  myBackButton() {
    if(this.showMenssages == true){
      this.showMenssages = false;
      return true
    }
    this.location.back();
    
  }
  //**********************************************************************//
  //FUNCION PARA ELIMINAR CONVERSACION//
  async deleteConversation(data) {
    console.log("data a eliminar: ", data);
    const modal = await this.modalCtrl.create({
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
          //this.getResient();
        })
      }
    }) 

    await modal.present();
  }
  //******************************************//
  async general_messages(data) {
    const modal = await this.modalCtrl.create({
      component: GeneralMensagePage,
      cssClass: 'modal-general-mensage',
      backdropDismiss: true,
      componentProps: data
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
    })
    this.modalCtrl.dismiss();
    await modal.present();
  }
}
//MODELOS DEL CHAT//

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