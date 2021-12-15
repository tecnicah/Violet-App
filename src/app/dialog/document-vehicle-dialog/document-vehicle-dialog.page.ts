import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { GeneralService } from 'src/app/general/general.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-document-vehicle-dialog',
  templateUrl: './document-vehicle-dialog.page.html',
  styleUrls: ['./document-vehicle-dialog.page.scss'],
})
export class DocumentVehicleDialogPage implements OnInit {

  constructor(public modalController: ModalController,
    public _service: GeneralService,
    public navParams: NavParams) { }

  
  userData: any = {};
  temporalDocument: any = {};
  caDocumentType: any[] = [];
  documents: any = {};

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log('docs');
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.getCatalogs();
  }

  public privacy = [];
  async getCatalogs() {
    this.privacy = await this._service.getCatalogueFrom('GetPrivacy');
    this._service.service_general_get("AdminCenter/GetDocumentType").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.caDocumentType = data.result;
      }
    }))

  }

  back() {
    let back: any = document.getElementById('back');
    back.play();
    this.modalController.dismiss();
  }

  doc() {
    document.getElementById('doc').click();
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
              this.temporalDocument = {
                "id": 0,
                "filePath": encoded,
                "name": droppedFile.relativePath,
                "fileExtension": ext[ext.length - 1],
                "documentType": "",
                "expirationDate": "",
                "city": "",
                "privacy": "",
                "createdBy": this.userData.id,
                "createdDate": new Date(),
                "updatedBy": this.userData.id,
                "updatedDate": new Date(),
              }
              this.temporalDocument.updatedDate = (new Date()).toISOString();
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

  public library_data: any = undefined;
  public getDataToLibrarySettings(): void {}

  save() {

    this._service.loader = true;

    this.temporalDocument = {
      "id": 0,
      "city": 0,
      "filePath": this.temporalDocument.filePath,
      "fileExtension": this.temporalDocument.fileExtension,
      "documentType": this.documents.documentType,
      "expirationDate": this.documents.expirationDate,
      "privacy": this.documents.privacy,
      "createdBy": this.userData.id,
      "createdDate": new Date(),
      "updatedBy": this.userData.id,
      "updatedDate": new Date(),
      "success": true
    }
    console.log(this.temporalDocument);
    this.modalController.dismiss(this.temporalDocument);
  }
}
