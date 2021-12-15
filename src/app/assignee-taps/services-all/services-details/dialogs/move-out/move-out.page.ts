import { Component, OnInit } from '@angular/core';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { NavParams, ModalController, ActionSheetController } from '@ionic/angular';
import { GeneralService } from 'src/app/general/general.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LoadingService } from 'src/app/general/loader.service';

@Component({
  selector: 'app-move-out',
  templateUrl: './move-out.page.html',
  styleUrls: ['./move-out.page.scss'],
})
export class MoveOutPage implements OnInit {

  slideOptsOne = {
    slidesPerView: 1,
    autoplay: false
  };

  public key_add: any = { "description": '', "quantity": undefined, "section": null };
  public addKey_: boolean = false;

  public atteend_add: any = { "name": '', "email": '', "relationship": null };
  public addAtteend_: boolean = false;

  public addInventory_: boolean = false;
  public inventory_add: any = { "item": '', "description": '', "quantity": null, "photosInventories": [] };

  public userData: any;
  constructor(public navParams: NavParams, public modalController: ModalController, public _services: GeneralService, private camera: Camera, public actionSheetController: ActionSheetController, public loadingService: LoadingService) { }

  public data_moveIn: any;
  public data:any;

  ngOnInit() {
    this.data = this.navParams.data;
    console.log("data que recibe de parametros: ", this.data);
    this.userData = JSON.parse(localStorage.getItem('userData'));
    let data_ = JSON.parse(localStorage.getItem('moveOut'));
    console.log(JSON.parse(localStorage.getItem('moveOut')));
    if(data_.id){
      this.data_moveIn = JSON.parse(localStorage.getItem('moveOut'));
    }else{
      this.data_moveIn = {
        propertyAddress : this.data.address,
        zipCode : this.data.zip,
        id: 0,
        createdDate: new Date(),
        attendees: [],
        keyInventories: [],
        propertyReportSections: [],
      }
    }
    this.getCatalogos();
  }
  //***************************************************************************//
  //FUNCION PARA GUARDAR INFORMACION//  
  public ca_propertySection = [];
  public ca_relation = [];
  public ca_statuspropertySection = [];
  async getCatalogos() {
    this.ca_relation = await this._services.getCatalogueFrom('GetRelationship');
    this.ca_propertySection = await this._services.getCatalogueFrom('GetPropertySection');
    this.ca_statuspropertySection = await this._services.getCatalogueFrom('GetStatusPropertySection');
  }
  //***************************************************************************//
  //FUNCION PARA GUARDAR UNA KEY INVONTORY// 
  addKeyInventory() {
    this.key_add.createdBy = this.userData.id;
    this.key_add.updatedBy = this.userData.id;
    this.key_add.createdDate = new Date();
    this.key_add.updatedDate = new Date();
    this.key_add.propertyReport = Number(localStorage.getItem('idpropertyReport'));
    this.key_add.id = 0;
    if (this.data_moveIn.id != 0) {
      this.loadingService.loadingPresent();
      this._services.service_general_post_with_url('HousingList/PostKeyInventory', this.key_add).subscribe(r => {
        if (r.success) {
          console.log(r);
          this.general_messages({
            title: "Success",
            body: "Key Inventory saved",
            success: true
          });
          this.data_moveIn.keyInventories.push(r.result);
          this.addKey_ = false;
          this.key_add = { "description": '', "quantity": undefined, "section": null };
        }
        this.loadingService.loadingDismiss();
      })
    }else {
      this.loadingService.loadingDismiss();
      this.data_moveIn.keyInventories.push(this.key_add);
      this.addKey_ = false;
      this.key_add = { "description": '', "quantity": undefined, "section": null };
    }
  }
  //***************************************************************************//
  //FUNCION PARA EDITAR UNA KEY INVONTORY// 
  Putkey(item, j) {
    if (item.id != 0) {
      let envio = {
        createdBy: 1,
        createdDate: item.createdDate,
        description: item.description,
        id: item.id,
        propertyReport: item.propertyReport,
        quantity: item.quantity,
        section: item.section,
        updatedBy: this.userData.id,
        updatedDate: new Date(),
        edit: false
      }
      this.loadingService.loadingPresent();
      this._services.service_general_put('HousingList/PutKeyInventory', envio).subscribe(r => {
        if (r.success) {
          console.log(r);
          this.data_moveIn.keyInventories[j] = envio;
          this.general_messages({
            title: "Success",
            body: "Key Inventory edited",
            success: true
          });
        }
        this.loadingService.loadingDismiss();
      })
    } else {
      this.data_moveIn.keyInventories[j] = item;
    }
  }
  //***************************************************************************//
  //FUNCION PARA GUARDAR UNA ATTEENDS// 
  addatteend() {
    this.atteend_add.createdBy = this.userData.id;
    this.atteend_add.updatedBy = this.userData.id;
    this.atteend_add.createdDate = new Date();
    this.atteend_add.updatedDate = new Date();
    this.atteend_add.propertyReport = Number(localStorage.getItem('idpropertyReport'));
    this.atteend_add.id = 0;
    if (this.data_moveIn.id != 0) {
      this.loadingService.loadingPresent();
      this._services.service_general_post_with_url('HousingList/PostAttendee', this.atteend_add).subscribe(r => {
        if (r.success) {
          console.log(r);
          this.general_messages({
            title: "Success",
            body: "Atteend saved",
            success: true
          });
          this.data_moveIn.attendees.push(r.result);
          this.addAtteend_ = false;
          this.atteend_add = { "name": '', "email": '', "relationship": null };
          this.loadingService.loadingDismiss();
        }
      })
    } else {
      this.data_moveIn.attendees.push(this.atteend_add);
      this.addAtteend_ = false;
      this.atteend_add = { "name": '', "email": '', "relationship": null };
    }
  }
  //***************************************************************************//
  //FUNCION PARA EDITAR UNA ATTEENDS// 
  PutAttendee(item, j) {
    if (item.id != 0) {
      let envio = {
        createdBy: item.createdBy,
        createdDate: item.createdDate,
        edit: false,
        email: item.email,
        id: item.id,
        name: item.name,
        propertyReport: item.propertyReport,
        relationship: item.relationship,
        updatedBy: this.userData.id,
        updatedDate: new Date(),
      }
      this.loadingService.loadingPresent();
      this._services.service_general_put('HousingList/PutAttendee', envio).subscribe(r => {
        if (r.success) {
          console.log(r);
          this.data_moveIn.attendees[j] = envio;
          this.general_messages({
            title: "Success",
            body: "Atteend edited",
            success: true
          });
        }
        this.loadingService.loadingDismiss();
      })
    } else {
      this.data_moveIn.attendees[j] = item;
    }
  }
  //***************************************************************************//
  //FUNCION PARA AGREGAR NUEVO REPORTE//
  addMoveIn() {
    this.data_moveIn.propertyReportSections.push({
      "id": 0,
      "propertyReport": this.data_moveIn.id,
      "propertySection": 0,
      "status": 0,
      "needRepair": false,
      "reportDate": null,
      "reportDetails": null,
      "createdBy": this.userData.id,
      "createdDate": new Date(),
      "updatedBy": this.userData.id,
      "updatedDate": new Date(),
      "photosPropertyReportSections": [],
      "sectionInventories": [

      ]
    })
  }
  //***************************************************************************//
  //FUNCION PARA AGREGAR NUEVO REPORTE//
  addInventory(r) {
    this.inventory_add.createdBy = this.userData.id;
    this.inventory_add.updatedBy = this.userData.id;
    this.inventory_add.createdDate = new Date();
    this.inventory_add.updatedDate = new Date();
    this.inventory_add.propertyReportSectionId = this.data_moveIn.propertyReportSections[r].id;
    this.inventory_add.id = 0;
    this.data_moveIn.propertyReportSections[r].sectionInventories.push(this.inventory_add);
    this.addInventory_ = false;
    this.inventory_add = { "item": null, "description": '', "quantity": undefined };
  }
  //***************************************************************************//
  //FUNCION PARA GUARDAR UN PROPERTY REPORT (ACTUALIZAR)//
  save() {
    if(this.data_moveIn.id == 0){
      this.postReport();
      return true;
    }

    this.loadingService.loadingPresent();

    for (let i = 0; i < this.data_moveIn.propertyReportSections.length; i++) {
      const element = this.data_moveIn.propertyReportSections[i];
      for (let j = 0; j < element.photosPropertyReportSections.length; j++) {
        if (element.photosPropertyReportSections[j].id != 0) {
          this.data_moveIn.propertyReportSections[i].photosPropertyReportSections.splice(j, 1);
        }
      }
    }
    this._services.service_general_put("PropertyReport/PutPropertyReport", this.data_moveIn).subscribe((data => {
      if (data.success) {
        console.log(data);
        this.general_messages({
          title: "Success",
          body: "Report was updated",
          success: true
        });
        this.loadingService.loadingDismiss();
        this.modalController.dismiss();
      }
    }))
  }
  //***************************************************************************//
  //FUNCION PARA GUARDAR UN PROPERTY REPORT (INSERTAR)//
  postReport(){

    this.loadingService.loadingPresent();
   
    this.data_moveIn.id=0;
    this.data_moveIn.propertyInspection=2;
    this.data_moveIn.housingList=this.data.id,
    this.data_moveIn.propertyAddress=this.data.address;
    this.data_moveIn.zipCode=this.data.zip;
    this.data_moveIn.createdBy=this.userData.id;
    this.data_moveIn.createdDate=new Date();
    this.data_moveIn.updatedBy=this.userData.id;
    this.data_moveIn.updatedDate=new Date();

    for (let i = 0; i < this.data_moveIn.propertyReportSections.length; i++) {
      const element = this.data_moveIn.propertyReportSections[i];
      for (let j = 0; j < element.photosPropertyReportSections.length; j++) {
        if (element.photosPropertyReportSections[j].id != 0) {
          this.data_moveIn.propertyReportSections[i].photosPropertyReportSections.splice(j, 1);
        }
      }
    }

    console.log();

    this._services.service_general_post_with_url("PropertyReport/PostPropertyReport", this.data_moveIn).subscribe((data => {
      if(data.success){
        console.log(data);
        if (data.success) {
          console.log(data);
          this.general_messages({
            title: "Success",
            body: "Report was saved",
            success: true
          });
          this.modalController.dismiss();
        }
        this.loadingService.loadingDismiss();
        }
    }))
  }
  //***************************************************************************//
  //FUNCION PARA GUARDAR INFORMACION//
  back() {
    let back: any = document.getElementById('back');
    back.play();
    this.modalController.dismiss();
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
  //***************************************************************************//
  //FUNCION PARA OBTENER EL NOMBRE DEL RELATION//
  relationName(id) {
    for (let i = 0; i < this.ca_relation.length; i++) {
      const element = this.ca_relation[i];
      if (id == element.id) {
        return element.relationship;
      }
    }
  }
  //***************************************************************************//
  //FUNCION PARA OBTENER EL NOMBRE DE LA SECCION//
  getSectionName(id){
    for (let i = 0; i < this.ca_propertySection.length; i++) {
      const element = this.ca_propertySection[i];
      if(id == element.id){
        return element.propertySection;
      }
    }
  }
  //***************************************************************************//
  //FUNCION PARA AGREGAR FOTGRAFIAS//
  async photo(r) {
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
          this.option(options, r);
        }
      }, {
        text: 'Galery',
        icon: 'images',
        handler: () => {
          const options: CameraOptions = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }
          this.option(options, r);
        }
      }]
    });
    await actionSheet.present();
  }
  option(options, i) {
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let name = new Date().toISOString();
      this.data_moveIn.propertyReportSections[i].photosPropertyReportSections.push({
        createdBy: this.userData.id,
        createdDate: new Date(),
        id: 0,
        photo: imageData,
        photoExtension: 'jpeg',
        propertyReport: 2,
        propertyReportId: this.data_moveIn.propertyReportSections[i].id,
        updatedBy: this.userData.id,
        updatedDate: new Date()
      })
    }, (err) => {
      console.log(err)
    });
  }
  //***************************************************************************//
  //FUNCION PARA AGREGAR FOTOS EN SECCION INVENTORY//
  async photoInventory(r) {
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

          this.optionInventory(options, r);
        }
      }, {
        text: 'Galery',
        icon: 'images',
        handler: () => {
          const options: CameraOptions = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }
          this.optionInventory(options, r);
        }
      }]
    });
    await actionSheet.present();
  }

  optionInventory(options, r) {
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let name = new Date().toISOString();
      this.inventory_add.photosInventories.push({
        createdBy: this.userData.id,
        createdDate: new Date(),
        id: 0,
        photo: imageData,
        photoExtension: 'jpeg',
        photoName: name,
        sectionInventory: 0,
        updatedBy: this.userData.id,
        updatedDate: new Date(),
        url: base64Image
      })
    }, (err) => {
      // Handle error
    });
  }
}
