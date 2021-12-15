import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { GeneralService } from 'src/app/general/general.service';
import { LoadingService } from 'src/app/general/loader.service';

@Component({
  selector: 'app-new-messagge',
  templateUrl: './new-messagge.page.html',
  styleUrls: ['./new-messagge.page.scss'],
})
export class NewMessaggePage implements OnInit {

  constructor(public _services: GeneralService,
    public modalController: ModalController, public navParams: NavParams,
    public loadingService: LoadingService) { }

  caCountry: any[] = [];
  caUsers: any[] = [];
  userData: any = {};
  filterC: any = { name: '' };
  filterU: any = { user: '' }
  sending: boolean = false;
  grupo: boolean = false;
  create: boolean = false;
  userFilter: any = {
    name: null
  }

  newMessageToSend = new newMesage;

  ngOnInit(): void {
    
  }
  
  public aux: boolean = false;
  public id:any;
  ionViewWillEnter(){
    let id_usuario = this.navParams.data;
    console.log(id_usuario);
    if(id_usuario.id){
      this.create = true;
      this.aux = true;
      this.id = id_usuario.id;
    }
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.newMessageToSend.userid = this.userData.id;
    this.newMessageToSend.userList = [];
    this.getCatalogs();
  }

  async getCatalogs(){
    this.caCountry = await this._services.getCatalogueFrom('GetCountry');
    for (let i = 0; i < this.caCountry.length; i++) {
      const element = this.caCountry[i];
      this.getUsersInvite(element.id);
    }
  }

  getUsersInvite(idCountry){
    console.log(idCountry);
    this._services.service_general_get('Chat/GetUserList/'+this.userData.id+'/'+idCountry).subscribe(n =>{
      if(n.success){
        for (let i = 0; i < n.result.value.length; i++) {
          const element = n.result.value[i];
          element.checke = false;
          this.caUsers.push(element);
        }
        console.log(this.caUsers);
      }
    })
  }

  getDetails(user){
    if(user != null){
      return user.split('/');
    }
  }

  getNameUser(item){
    for (let i = 0; i < this.caUsers.length; i++) {
      const element = this.caUsers[i];
      if(item == element.id){
        return element.user.split('/')[1];
      }
    }
  }

  selectUser(id:any){
    this.newMessageToSend.userList.push(id);
    this.create = true;
  }

  selectUserGroup(id:any, i){
      this.caUsers[i].checke =  !this.caUsers[i].checke;
      if(this.caUsers[i].checke){
        this.newMessageToSend.userList.push(id);
      }else{
        this.deleteUser(i);
      }
  }

  deleteUser(i){
    console.log(i);
    this.newMessageToSend.userList.splice(i, 1);
  }

  createfalse(){
    this.newMessageToSend.userList = [];
    for (let i = 0; i < this.caUsers.length; i++) {
      const element = this.caUsers[i];
      this.caUsers[i].checke = false;
    }
    this.create = false;
  }

  filesUpload(){
    document.getElementById('ndm').click();
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
              
              this.newMessageToSend.fileExtension = ext[1];
              this.newMessageToSend.file = encoded;
              this.newMessageToSend.message = droppedFile.relativePath;
              this.send();         
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

  onKey($event){
    if($event.key == "Enter" || $event.keyCode == 13){
      this.send();
    }
  }

  send(){
    this.loadingService.loadingPresent();
    if(this.aux == true){ this.newMessageToSend.userList.push(this.id) }
    debugger
    this.newMessageToSend.group = this.newMessageToSend.userList.length > 1 ? true  : false;
    console.log(this.newMessageToSend);
    this._services.service_general_post_with_url('Chat/SentNewMessage', this.newMessageToSend).subscribe(n => {
      console.log(n);
      if(n.success){
        this.modalController.dismiss({id: n.result[0].id});
      }
      this.loadingService.loadingDismiss();
    },err=>{
      this.loadingService.loadingDismiss();
      this.modalController.dismiss();
    })
  }

  getName(item){
    for (let i = 0; i < this.caUsers.length; i++) {
      const element = this.caUsers[i];
      if(element.id == item){
        return element.user;
      }
    }
  }

  back() {
    let back: any = document.getElementById('back');
    back.play();
    this.modalController.dismiss();
  }

}


export class newMesage  {
  userid : number;
  userList: number[];
  message: string;
  group: boolean;
  file: string = "";
  fileExtension: string = "";
};