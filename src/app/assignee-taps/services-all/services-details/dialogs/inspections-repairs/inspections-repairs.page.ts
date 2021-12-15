import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { GeneralService } from 'src/app/general/general.service';
import { ConfirmationPage } from 'src/app/dialog/confirmation/confirmation.page';
import { DocumentsDialogPage } from 'src/app/dialog/documents-dialog/documents-dialog.page';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { LoadingService } from 'src/app/general/loader.service';

@Component({
  selector: 'app-inspections-repairs',
  templateUrl: './inspections-repairs.page.html',
  styleUrls: ['./inspections-repairs.page.scss'],
})
export class InspectionsRepairsPage implements OnInit {

  constructor(public loader:LoadingService,public navParams: NavParams, public modalController: ModalController, public _services: GeneralService) { }

  //*****************************************************************************************//
  //CONSULTA DE REGISTROS//
  public data:any;
  public data_inspection: any;
  public data_repairs: any;
  public userData:any;
  ngOnInit() {
    this.loader.loadingPresent();
    this.data = this.navParams.data;
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.data_inspection = JSON.parse(localStorage.getItem('inspections'));
    this.data_repairs = JSON.parse(localStorage.getItem('repairs'));
    console.log("DATA_INSPECTION: ", this.data_inspection);
    console.log("DATA_REPAIRS: ", this.data_repairs);
    this.supplierPartner();
    this.loader.loadingDismiss();
  }
  //*****************************************************************************************//
  //EJECUCION DE FUNCIONES PRINCIPALES//
  ionViewWillEnter() {
    this.catalogos();
    this.ngOnInit();
  }
  //*****************************************************************************************//
  //FUNCION PARA CONSULTAR CATALOGOS PARA LOS SELECT//
  public ca_repairType: any[] = [];
  public ca_currency: any[] = [];
  async catalogos() {
    this.ca_repairType = await this._services.getCatalogueFrom('GetRepairType');
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency')
  }
  //*****************************************************************************************//
  //FUNCION PARA CONSULTAR LOS SUPPLIER PARTNER//
  public SupplierCompany: any[] = [];
  supplierPartner() {
    this._services.service_general_get("SupplierPartnerProfile/GetSupplierPartnerServiceByServices?workOrderService="+this.data.workOrderServicesId+"&supplierType="+this.data.supplierType+"&serviceLine="+2).subscribe((data => {
      if (data.success) {
        console.log('DATA CONSULTA SUPPLIER PARTNER: ',data.result.value);
        this.SupplierCompany = data.result.value;
       }
    }), (err)=>{
      console.log("no se realizo la consulta por falta de parametro");
    });
  }
  //*****************************************************************************************//
  //FUNCION PARA AGREGAR INSPECTIONS//
  addInspection(){
    this.data_inspection.push({
      "id":0,
      "housingList": Number(localStorage.getItem('id')),
      "initialInspectionDate":null,
      "finalInspectionDate": null,
      "createdBy": this.userData.id,
      "createdDate": new Date(),
      "updateBy": this.userData.id,
      "updatedDate": new Date(),
    })
  }
  //*****************************************************************************************//
  //FUNCION PARA AGREGAR REPAIRS//
  addRepairs() {
    this.data_repairs.push({
      "id": 0,
      "housingList": Number(localStorage.getItem('id')),
      "repairType": null,
      "supplierPartner": null,
      "repairStartDate": null,
      "repairEndDate": null,
      "totalDays": null,
      "totalCostRepair": null,
      "currency": null,
      "comments": "",
      "createdBy": this.userData.id,
      "createdDate": new Date(),
      "updateBy": this.userData.id,
      "updatedDate": new Date(),
      "documentRepairs":[]
    })
  }
  //*****************************************************************************************//
  //FUNCION PARA ELIMINAR REPAIRS//
  async deleteRepair(id, pos){
    console.log(id);
    const modal = await this.modalController.create({
      component: ConfirmationPage,
      cssClass: 'modal-general-confirm',
      componentProps: {
        header: "Delete",
        body: "Do you want delete this repair?",
        yesText: 'Yes, delete',
        noText: 'No, continue',
      }
    });

    modal.onDidDismiss().then((data) => {
      console.log(data, id);
      if (data.data) {
        if(id == 0){
           this.data_repairs.splice(pos, 1)
        }else{

        }
      }
    })
    this.modalController.dismiss();
    await modal.present();
  }
  //*****************************************************************************************//
  //FUNCION PARA REGRESAR A LA SECCION ANTERIOR//
  async addDocument(id, pos){
    const modal = await this.modalController.create({
      component: DocumentsDialogPage,
      backdropDismiss: true,
    });

    modal.onDidDismiss().then((data: any) => {
      console.log(data);
      if (data.data.success) {
        data.data.repairId = id;
        data.data.comment = "";
        this.data_repairs[pos].documentRepairs.push(data.data);
      }
    })
    this.modalController.dismiss();
    await modal.present();
  }
  //*****************************************************************************************//
  //FUNCION PARA ELIMINAR REPAIRS//
  async deleteDocument(id, i, d){
    console.log(id);
    const modal = await this.modalController.create({
      component: ConfirmationPage,
      cssClass: 'modal-general-confirm',
      componentProps: {
        header: "Delete",
        body: "Do you want delete this document?",
        yesText: 'Yes, delete',
        noText: 'No, continue',
      }
    });

    modal.onDidDismiss().then((data) => {
      console.log(data, id);
      if (data.data) {
        if(id == 0){
           this.data_repairs[i].documentRepairs.splice(d, 1);
        }else{
          this.data_repairs[i].documentRepairs.splice(d, 1);
        }
      }
    })
    this.modalController.dismiss();
    await modal.present();
  }
  //*****************************************************************************************//
  //FUNCION PARA REGRESAR A LA SECCION ANTERIOR//
  back() {
    let back: any = document.getElementById('back');
    back.play();
    this.modalController.dismiss();
  }
  //*****************************************************************************************//
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
  //*****************************************************************************************//
  //FUNCION PARA GUARDAR//
  save(){
    this.loader.loadingPresent();
    console.log("DATA A GUARDAR RERPAIS: ", this.data_repairs);
    for (let i=0; i < this.data_repairs.length; i++) {
      if(this.data_repairs[i].id !=0) {
        this._services.service_general_put("HousingList/PutRepair", this.data_repairs[i]).subscribe((data=> {
              if(data.success) {
                console.log(data);
                this.loader.loadingDismiss();
              }
            }), (err)=> {
            console.log("error al guardar los repairs: ", err);
          })
      } else {
        this._services.service_general_post_with_url("HousingList/PostRepair", this.data_repairs[i]).subscribe((data=> {
              if(data.success) {
                console.log(data);
                this.loader.loadingDismiss();
              }
            }), (err)=> {
            console.log("error al guardar los repairs: ", err);
          })
      }
    }
    this.general_messages({
      title: "Success",
      body: "Inspection & Repairs was updated",
      success: true
    });
    this.modalController.dismiss();
  }
}
