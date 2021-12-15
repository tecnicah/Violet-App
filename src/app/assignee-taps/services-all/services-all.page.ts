import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { GeneralService } from 'src/app/general/general.service';
import { FilterPage } from 'src/app/dialog/filter/filter.page';
import { LoadingService } from 'src/app/general/loader.service';

@Component({
  selector: 'app-services-all',
  templateUrl: './services-all.page.html',
  styleUrls: ['./services-all.page.scss'],
})
export class ServicesAllPage implements OnInit {

  constructor(public router: Router,
    public service: GeneralService,
    public modalController: ModalController,
    public loadingService: LoadingService) { }


  userData: any = {};
  filteruno: boolean = false;
  sr: any[] = [];
  userFilter: any = {
    assigneeName: '',
    status: {id : ''}
  }

  caStatus: any = [];

  ngOnInit() {
  }

  show_name_assignee : boolean = false;
  ionViewWillEnter(){
    console.log(window.screen.width);
    if(window.screen.width <= 500 ){
       this.show_name_assignee = true;
    }else{
      this.show_name_assignee = false;
    }
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.catalogos();
    this.getServices();
  }

  getServices(){
    console.log("Entra a consultar los SR");
    this.loadingService.loadingPresent();
    this.service.service_general_get('ServiceRecord/GetServiceRecord/0/0/'+this.userData.id).subscribe(r=>{
      if(r.success){
          this.loadingService.loadingDismiss();
          console.log(r.map.value);
          this.sr = r.map.value;
      }
    })
  }

  async catalogos(){
    this.caStatus = await this.service.getCatalogueFrom('GetStatus');
  }

  public cleanFilter():void {

    this.userFilter = {
      assigneeName: '',
      status: {id : ''}
    }
    this.getServices();
    this.filteruno = true;
    setTimeout(() => {
      this.filteruno = false;
    }, 2000);

}

viewSR(id, partnerID){
  localStorage.setItem('partnerID',partnerID);
  this.router.navigateByUrl('assignee-taps/services-all/view-sr/'+id);
}

public filter_data:any;
async openFilter(){
    const modal = await this.modalController.create({
      component: FilterPage,
      backdropDismiss: true,
    });

    modal.onDidDismiss().then((data: any) => {
      console.log(data);
      this.filter_data = data.data;
      this.getServiceRecordTableData(data.data);
    })
    this.modalController.dismiss();
    await modal.present();
}

public service_records_table_data:any = undefined;
    public getServiceRecordTableData( params:string = '' ):void {
      this.loadingService.loadingPresent();
        const params_in:string = params == '' ? '' : `?${ params }`;
        this.service.service_general_get('ServiceRecord/GetServiceRecord/1/100/'+this.userData.id+'/'+ params_in)
            .subscribe( (r:any) => {
                if( r.success ) {
                  this.loadingService.loadingDismiss();
                  console.log(r.map.value);
                  this.sr = r.map.value;
                  this.loadingService.loadingDismiss();
                }
            }, (error:any) => {
                console.error('Error (GetServiceRecord) => ', error);
                this.loadingService.loadingDismiss();
            });

    }

back(){
  let back: any = document.getElementById('back');
  back.play()
  console.log(localStorage.getItem('back'));
  this.router.navigateByUrl('assignee-taps/home');
 }

Scroll(event) {
  this.service.onScroll(event);
}

}
