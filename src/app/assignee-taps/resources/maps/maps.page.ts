import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general/general.service';
import { Router } from '@angular/router';
declare var google;
interface Marker {
  position: {
    lat: number,
    lng: number
  },
  title: string;
}

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {

  map: null;

 

  constructor(public router: Router,
    public service: GeneralService) { }

  ngOnInit() {
    this.load();
  }
  back(){
    let back: any = document.getElementById('back');
    back.play()
    this.router.navigateByUrl(localStorage.getItem('back'));
  }
  load() {
    const mapEle: HTMLElement = document.getElementById('map');
    const myLatLang = { lat: 19.4978, lng: -99.1269 };
    this.map = new google.maps.Map(mapEle, {
      center: myLatLang,
      zoom: 12
    });
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      // this.renderMarkers();
      mapEle.classList.add('show-map');
      const marker = {
        position: {
          lat: 19.4978,
          lng: -99.1269
        },
        title: 'here'
      };
      this.addMarker(marker);
    });
  }
  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
   }

   Scroll(event) {
    this.service.onScroll(event);
  }

}
