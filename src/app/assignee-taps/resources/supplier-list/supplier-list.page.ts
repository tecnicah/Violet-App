import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FilterSupplierPage } from 'src/app/dialog/filter-supplier/filter-supplier.page';
import { GeneralService } from 'src/app/general/general.service';
import { LoadingService } from 'src/app/general/loader.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.page.html',
  styleUrls: ['./supplier-list.page.scss'],
})
export class SupplierListPage implements OnInit {

  constructor(public service: GeneralService,
    public router: Router, public modalCtrl: ModalController,
    public loadingService: LoadingService) { }

  data: any[] = [];

  userFilter: any = { supplierPartner: "" };


  Scroll(event) {
    this.service.onScroll(event);
  }

  ngOnInit() {
  }

  data_user:any;
  search: any = {
    status: '',
    supplierCategory: '',
    partnerType: '',
    country: '',
    city:''
  };

  ionViewWillEnter() {
    this.loadingService.loadingPresent();
    this.data_user = JSON.parse(localStorage.getItem('userData'));
    if(this.data_user.role.id == 3){ 
      this.search.country = this.data_user.profileUsers[0].country;
      this.search.city = this.data_user.profileUsers[0].city;
      this.filteringServiceRecordTable();
      this.loadingService.loadingDismiss();
    }else{
      this.service.service_general_get('SupplierPartnerProfile/GetSupplierPartners').subscribe((data => {
        if (data.success) {
          const rows = [];
          console.log(data.result.value);
          this.data = data.result.value;
          this.loadingService.loadingDismiss();
        }
      }));
    }
  }

  back() {
    let back: any = document.getElementById('back');
    back.play()
    console.log(localStorage.getItem('back'));
    this.router.navigateByUrl(localStorage.getItem('back'));
  }

  viewSupplier(data) {
    console.log("supplier: ", data);
    if (data.supplierCategory == 'Consultant') {
      this.router.navigateByUrl('assignee-taps/resources/supplier-partner-consultant/'+data.id);
    }

    if (data.supplierCategory == 'Services') {
      this.router.navigateByUrl('assignee-taps/resources/supplier-partner-service/'+data.id);
    }

    if (data.supplierCategory == 'Profile') {
      this.router.navigateByUrl('assignee-taps/home/profile-consultant/'+data.id);
    }
  }

  async openFilter(){
    const modal = await this.modalCtrl.create({
      component: FilterSupplierPage,
      backdropDismiss: true,
    });

    modal.onDidDismiss().then((data: any) => {
      console.log(data);
      this.getServiceRecordTableData(data.data);
    })
    this.modalCtrl.dismiss();
    await modal.present();
  }

  public getServiceRecordTableData(params: string = ''): void {
    const params_in: string = params == '' ? '' : `?${ params }`;
    this.service.service_general_get('SupplierPartnerProfile/GetSupplierPartners' + params_in).subscribe((data: any) => {
        if (data.success) {
          console.log(data.result.value);
          this.data = data.result.value;

        }
      });
  }

  public service_record_params_selected:string = '';
  public parametros : any;
  public filteringServiceRecordTable():void {
      this.service_record_params_selected = '';
      let params:string = '';
      for( let item in this.search ) {
          if( this.search[item] != '' ) {
              this.service_record_params_selected += `${ item }=${ this.search[item] }&`;
              params = this.service_record_params_selected.substring(0, this.service_record_params_selected.length - 1);
          }
      }
      this.parametros =  params ;
      console.log("Parametros de busqueda: ", params);
      this.getServiceRecordTableData(params)
  }

  public filterDate( date_in:any ):string {
    return `${ date_in.getFullYear() }/${ date_in.getMonth() + 1 }/${ date_in.getDate() }`;
  }

  reload(){
    this.ionViewWillEnter();
  }
}