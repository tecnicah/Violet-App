import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general/general.service';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-add-assigned-team',
  templateUrl: './add-assigned-team.page.html',
  styleUrls: ['./add-assigned-team.page.scss'],
})
export class AddAssignedTeamPage implements OnInit {

  data:any = {}
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


  back(){
    this.modalController.dismiss();
  }

}
