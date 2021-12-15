import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AirportTransportationPage } from './airport-transportation.page';

describe('AirportTransportationPage', () => {
  let component: AirportTransportationPage;
  let fixture: ComponentFixture<AirportTransportationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirportTransportationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AirportTransportationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
