import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModalController, NavParams } from '@ionic/angular';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { GeneralService } from 'src/app/general/general.service';

@Component({
  selector: 'app-documents-dialog',
  templateUrl: './documents-dialog.page.html',
  styleUrls: ['./documents-dialog.page.scss'],
})
export class DocumentsDialogPage implements OnInit {

  constructor(public modalController: ModalController,
    private statusBar: StatusBar,
    public _service: GeneralService,
    public navParams: NavParams) { }

  userData: any = {};
  temporalDocument: any = {};
  caDocumentType: any[] = [];
  caRelationShips: any[] = [];
  caCountry: any[] = [];
  documents: any = {};
  ne: boolean = false;

  ngOnInit() {
  }

  public type_document: number;
  ionViewWillEnter() {
    let type = this.navParams.data.id;
    this.type_document = type;
    console.log(type);
    this.documents.relationship = 0;
    this.statusBar.backgroundColorByHexString('#9d3292');
    this.statusBar.styleLightContent();
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.temporalDocument.updatedDate = (new Date()).toISOString();

    this.getCatalogs();
  }

  async getCatalogs() {
    //this.caDocumentType = await this._service.getCatalogueFrom('GetDocumentType');
    this._service.service_general_get("Catalogue/GetDocumentType/" + this.type_document).subscribe((data => {
      console.log(data);
      if (data.success) {
        this.caDocumentType = data.result;
      }
    }))
    this.caCountry = await this._service.getCatalogueFrom('Nationalities');

    if (Number(localStorage.getItem('sr')) != 0) {
      this.ne = false;
      this._service.service_general_get("ServiceRecord/GetApplicant/" + localStorage.getItem('sr')).subscribe((data => {
        console.log(data);
        if (data.success) {
          this.caRelationShips = data.applicant.value;
        }
      }))
    } else {
      this.ne = true;
      this._service.service_general_get("ServiceRecord/GetApplicant/" + localStorage.getItem('srAd')).subscribe((data => {
        console.log(data);
        if (data.success) {
          this.caRelationShips = data.applicant.value;
        }
      }))
    }
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
                "fileRequest": encoded,
                "fileExtension": ext[ext.length - 1],
                "documentType": "",
                "relationship": "",
                "issueDate": "",
                "expirationDate": "",
                "issuingAuthority": "",
                "countryOrigin": "",
                "comment": "",
                "createdBy": this.userData.id,
                "createdDate": new Date(),
                "name": droppedFile.relativePath
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
  public getDataToLibrarySettings(): void {

    this.caRelationShips.forEach((item: any) => {

      if (this.documents.relationship == item.id) {

        this.library_data = item;

      }

    });

  }


  expiration: boolean = false;
  docType : boolean = false;
  relation : boolean = false;
  origin: boolean = false;
  docUpload : boolean = false;
  save() {

    this._service.loader = true;
    this.temporalDocument = {
      id: 0,
      fileName: this.temporalDocument.name,
      nameFile: this.temporalDocument.name,
      fileExtension: this.temporalDocument.fileExtension,
      fileRequest: this.temporalDocument.fileRequest,
      comment: this.documents.comment,
      countryOrigin: this.documents.countryOrigin,
      createdBy: this.temporalDocument.createdBy,
      createdDate: this.temporalDocument.createdDate,
      documentType: this.documents.documentType,
      //issuingAuthority: this.documents.issuingAuthority,
      issuingAuthority: '',
      updateBy: this.userData.id,
      updatedDate: (new Date()).toISOString(),
      relationship: this.documents.relationship,
      dependentInformation: this.documents.relationship,
      expirationDate: this.documents.expirationDate,
      issueDate: "",
      success: true
    }

    console.log(this.temporalDocument);

    if (this.temporalDocument.expirationDate == undefined) {
     this.expiration = true; 
    }

    if (this.temporalDocument.documentType == undefined ) {
      this.docType = true;
    }

    if (this.temporalDocument.relationship == 0) {
      this.relation = true;
    }

    if (this.temporalDocument.countryOrigin == undefined) {
      this.origin = true;
    }

    if (this.temporalDocument.updatedDate == undefined ||
      this.temporalDocument.expirationDate == undefined ||
      this.temporalDocument.expirationDate == undefined ||
      this.temporalDocument.documentType == undefined ||
      this.temporalDocument.relationship == undefined ||
      this.temporalDocument.countryOrigin == undefined ||
      this.temporalDocument.fileExtension == undefined ||
      this.temporalDocument.fileRequest == undefined
    ) {
      
      return true;
    }

    if (Number(localStorage.getItem('sr')) != 0) {
      this._service.service_general_post_with_url(`ImmigrationProfile/CreateDocumentDependent`, this.temporalDocument)
        .subscribe((response: any) => {
          if (response.success) {
            console.log("documento success: ", response);
          }
          this._service.loader = false;
          this.modalController.dismiss();
        }, (error: any) => {
          console.error('Error (ImmigrationProfile/CreateDocumentDependent) => ', error);
          this.modalController.dismiss();
          this._service.loader = false;
        });
    } else {
      this.modalController.dismiss(this.temporalDocument);
    }

  }
}
