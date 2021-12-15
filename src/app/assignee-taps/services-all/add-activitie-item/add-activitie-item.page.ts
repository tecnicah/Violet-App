import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ConfirmationPage } from 'src/app/dialog/confirmation/confirmation.page';
import { DocumentsDialogPage } from 'src/app/dialog/documents-dialog/documents-dialog.page';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { GeneralService } from 'src/app/general/general.service';
import { LoadingService } from 'src/app/general/loader.service';
import { DocumentsPage } from '../../documents/documents.page';

@Component({
  selector: 'app-add-activitie-item',
  templateUrl: './add-activitie-item.page.html',
  styleUrls: ['./add-activitie-item.page.scss'],
})
export class AddActivitieItemPage implements OnInit {

  constructor(
    public service: GeneralService,
    public modalController: ModalController,
    public navParams: NavParams,
    public loadingService: LoadingService) { }

  data: any = {
    id: 0
  };
  userData: any = {};

  caWo: any[] = [];
  caService: any[] = [];
  collaborators: any[] = [];
  statustask_catalogue: any = {};

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    console.log(this.navParams.data.data);
    this.data.serviceRecordId = this.navParams.data.data.sr;
    this.data.taskFrom = this.userData.id;
    this.data.statusId = 1;
    this.data.serviceLineId = this.navParams.data.data.sl;
    this.data.urgent = false;
    this.data.createdBy = this.userData.id;
    this.data.createdDate = new Date();
    this.data.updateBy = this.userData.id;
    this.data.updatedDate = new Date();
    this.data.taskDocuments = [];
    this.data.statusId = 1;
    this.data.id = this.navParams.data.data.id;
    this.data.comments = "";

    this.catalogos();

  }

  async catalogos() {

    if (this.data.id != 0) {
      this.loadingService.loadingPresent();
      this.service.service_general_get('Task/GetTaskById?Id=' + this.data.id).subscribe(r => {
        if (r.success) {
          console.log("edicion de activity item: ", r.result);
          this.data = r.result;
          if(!this.data.colaborator) { 
            this.data.colaborator = []; 
          }
          if(!this.data.to) { 
            this.data.to = []; 
          }
          
          if(this.data.colaboratorMembers.length > 0){
            for (let i = 0; i < this.data.colaboratorMembers.length; i++) {
              const element = this.data.colaboratorMembers[i].colaborator;
              this.data.colaborator.push(element);
            }
          }

          if(this.data.taskTo != undefined && this.data.taskTo != null && this.data.taskTo != ''){
              this.data.to.push(this.data.taskTo);
          }
         
          this.loadingService.loadingDismiss();
          let colaboradores = [];
          for (let i = 0; i < this.data.colaboratorMembers.length; i++) {
            const element = this.data.colaboratorMembers[i];
            colaboradores.push(element.colaborator);
          }
          this.data.colaboratorMembers = colaboradores;
          this.getServices();
        }
      })
    }

    this.service.service_general_get('Catalogue/GetworkOrderBySR?service_record_Id=' + this.navParams.data.data.sr + '&service_line_id=' + this.navParams.data.data.sl).subscribe(r => {
      if (r.success) {
        this.caWo = r.result.value;
      }
    })

    this.service.service_general_get('Catalogue/GetUserTo').subscribe(r => {
      if (r.success) {
        this.collaborators = r.result.value;
      }
    })

    this.statustask_catalogue = await this.service.getCatalogueFrom('GetEstatusTask');
  }

  getServices() {
    this.service.service_general_get('Catalogue/GetServiceByWorkOrder?wo=' + this.data.workOrderId).subscribe(r => {
      if (r.success) {
        this.caService = r.result.value;
      }
    })
  }


  getstatusname(id) {
    for (let i = 0; i < this.statustask_catalogue?.value?.length; i++) {
      const element = this.statustask_catalogue.value[i];
      if (id == element.id) {
        return element.status;
      }
    }
  }

  async addDocuments() {
    localStorage.setItem('srAd', this.navParams.data.data.sr);
    const modal = await this.modalController.create({
      component: DocumentsDialogPage,
      backdropDismiss: true,
    });

    modal.onDidDismiss().then((data: any) => {
      console.log(data);
      if (data.data.success) {
        data.data.taskId = this.data.id;
        data.data.comment = "";
        this.data.taskDocuments.push(data.data);
      }
    })
    this.modalController.dismiss();

    await modal.present();
  }


  back() {
    let back: any = document.getElementById('back');
    back.play();
    this.modalController.dismiss();
  }

  save() {
    this.loadingService.loadingPresent();
    let colaboradores = [];
    this.data.colaboratorMembers = [];
    for (let i = 0; i < this.data.colaborator.length; i++) {
      const element = this.data.colaborator[i];
      colaboradores.push({
        task: this.data.id,
        colaborator: element,
      })
    }
    this.data.colaboratorMembers = colaboradores;
    console.log("DATA A GUARDAR O EDITAR ACTIVITY ITEM: ",this.data);
    if (this.data.id == 0) {
      
      this.service.service_general_post_with_url("Task/CreateTask", this.data).subscribe((data => {
        if (data.success) {
          console.log(data);
          this.general_messages({
            title: "Success",
            body: "Save Data",
            success: true
          });
          this.back();

        }
      }))
    } else {
      this.service.service_general_put("Task/UpdateTask", this.data).subscribe((data => {
        if (data.success) {
          console.log(data);
          this.general_messages({
            title: "Success",
            body: "Update Data",
            success: true
          });
          this.back();
        }
      }))
    }
  }

  async deleteActivitie(id, i) {

    const modal = await this.modalController.create({
      component: ConfirmationPage,
      cssClass: 'modal-general-confirm',
      componentProps: {
        header: "Delete",
        body: "Delete activity item?",
        yesText: 'Yes, delete',
        noText: 'No, continue',
      }
    });

    modal.onDidDismiss().then((data) => {
      console.log(data, id);
      if (data.data) {
        if (id != 0) {
          this.loadingService.loadingPresent();
          this.service.service_general_get('Task/DeleteDocumentTask?id=' + id).subscribe(r => {
            if (r.success) {
              this.general_messages({
                title: "Success",
                body: "Delete Acivity item",
                success: true
              });
            }
          })
          this.ionViewWillEnter();
          this.loadingService.loadingDismiss();
        } else {
          this.data.taskDocuments.splice(i, 1);
        }
      }
    })
    this.modalController.dismiss();

    await modal.present();


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
}
