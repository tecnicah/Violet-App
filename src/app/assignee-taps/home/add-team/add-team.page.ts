import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { GeneralService } from 'src/app/general/general.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.page.html',
  styleUrls: ['./add-team.page.scss'],
})
export class AddTeamPage implements OnInit {

  data:any={};
  ca_assignedTeam = [];

  constructor(public _services: GeneralService, public modalController: ModalController, public navParams: NavParams) { }

  ngOnInit(): void {
    this._services.service_general_get('Profile/GetAssignedTeam').subscribe((data => {
      if(data.success){
         this.ca_assignedTeam = data.result.value;
      }
    }))
  }
  //******************************************************************//
  save_office(){
    this.data.success = true;
    this.modalController.dismiss(this.data);
  }
  //******************************************************************//
  back(){
    this.modalController.dismiss();
  }

}
