import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { ConfirmationPage } from 'src/app/dialog/confirmation/confirmation.page';
import { GeneralMensagePage } from 'src/app/dialog/general-mensage/general-mensage.page';
import { GeneralService } from 'src/app/general/general.service';
import { LoadingService } from 'src/app/general/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.page.html',
  styleUrls: ['./new-appointment.page.scss'],
})
export class NewAppointmentPage implements OnInit {

  constructor(
    public router: Router,
    public service: GeneralService,
    public modalController: ModalController,
    public popoverController: PopoverController,
    public loadingService: LoadingService
  ) { }

  userData: any = {};
  caSl: any[] = [];
  caWo: any[] = [];
  caService: any[] = [];
  caSr: any[] = [];


  data: any = {
    documentAppointments: []
  };

  name: string = '';

  temporalDocument: any[] = [];
  today : any;

  ngOnInit() {
    this.getDate();
  }
  getDate() {  
    this.today = new Date(); 
    this.today = this.today.getFullYear() + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2) + '-' + ('0' + this.today.getDate()).slice(-2); 
     console.log(this.today); 
  }

  ca_supplier = [];

  ionViewWillEnter() {
    console.log("New appointment");
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.data = {
      id: 0,
      serviceRecordId: 0,
      date: "",
      startTime: "",
      endTime: "",
      description: "",
      status: true,
      createdBy: this.userData.id,
      createdDate: new Date(),
      updateBy: this.userData.id,
      updatedDate: new Date(),
      appointmentWorkOrderServices: [],
      documentAppointments: []
    }
   
    this.service.service_general_get('Catalogue/GetServiceRecordApp/' + this.userData.id).subscribe(r => {
      if (r.success) {
        this.caSr = r.result.value;
        console.log(this.caSr);
        if(this.userData.role.id == 4){ this.data.serviceRecordId = Number(localStorage.getItem('sr')); this.getWO()}

      }
    })

   
  }

  getWO() {
    for (let i = 0; i < this.caSr.length; i++) {
      const element = this.caSr[i];
      if (this.data.serviceRecordId == element.id) {
        this.name = element.assigneeName;
      }
    }
    this.service.service_general_get('Catalogue/GetworkOrderBySR?service_record_Id=' + this.data.serviceRecordId + '&service_line_id=2').subscribe(r => {
      if (r.success) {
        this.caWo = r.result.value;
      }
    })
  }

  getServices() {
    this.service.service_general_get('Catalogue/GetServiceByWorkOrder?wo=' + this.data.workOrder).subscribe(r => {
      if (r.success) {
        this.caService = r.result.value;
        console.log(this.caService);
      }
    })
  }

  setService($event, item, id, i) {
    console.log();
    if ($event.detail.checked) {
      this.data.appointmentWorkOrderServices.push({
        id: 0,
        appointmentId: 0,
        workOrderServiceId: item.service
      });
    } else {
      this.data.appointmentWorkOrderServices.splice(i, 1);
    }

    console.log(this.data);
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


              let ext = file.type.split("/");
              this.data.documentAppointments.push({
                "id": 0,
                "fileRequest": encoded,
                "fileName": droppedFile.relativePath,
                "fileExtension": ext[1],
                "appointmentId": 0,
                "createdBy": this.userData.id,
                "createdDate": (new Date()).toISOString()
              })
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

  async deleteDoc(id) {

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
        this.data.documentAppointments.splice(id, 1);
      }
    })
    this.modalController.dismiss();

    await modal.present();
  }

  public active_start:boolean = false;
  public active_startD:boolean = false;
  public active_end:boolean = false;
  public active_service:boolean = false;
  save(){
    console.log(this.data);
    if(this.data.date == "" || this.data.date == undefined || this.data.date == null ){
      this.active_start = true;
    }
    if(this.data.startTime == "" || this.data.startTime == undefined || this.data.startTime == null){
      this.active_startD = true;
    }
    if(this.data.endTime == "" || this.data.endTime == undefined || this.data.endTime == null){
      this.active_end = true;
    }
    if(this.data.serviceRecordId == 0){
      this.active_service = true;
    }

    if(this.data.date != "" && this.data.startTime != "" && this.data.endTime != "" && this.data.serviceRecordId != 0){
      var int = new Date(this.data.startTime);
      var end = new Date(this.data.endTime);
  
      this.data.startTime = int.getHours() + ':'+int.getMinutes();
      this.data.endTime = end.getHours() + ':'+end.getMinutes()
      console.log(this.data);
      this.data.from = this.userData.id;
      this.data.createdBy = this.userData.id;
      this.data.createdDate = new Date()
      this.data.updateBy  = this.userData.id;
      this.data.updatedDate = new Date();
      this.loadingService.loadingPresent();
      this.service.service_general_post_with_url('Appointment/CreateAppointment', [this.data]).subscribe(r=>{
        if(r.success){
          console.log(r);
          this.general_messages({
            title: "Success",
            body: "Inserted Data",
            success: true
          });
          this.caService = [];
          this.name = '';
          this.back();
        }
      })
    }
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

  back() {
    console.log("back");
    let back: any = document.getElementById('back');
    this.router.navigateByUrl('/assignee-taps/home');
    back.play();
    //this.modalController.dismiss();
  }
  

  getExprience(){
    this.service.service_general_get('ServiceRecord/ExperienceTeam/'+this.data.serviceRecordId).subscribe((dataRe => {
      if (dataRe.success) {
         let supplier = dataRe.result.value;
          
               
             this.ca_supplier = supplier;
       }
    }));
  }
 
}
