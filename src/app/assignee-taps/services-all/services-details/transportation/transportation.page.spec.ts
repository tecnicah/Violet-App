import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransportationPage } from './transportation.page';

describe('TransportationPage', () => {
  let component: TransportationPage;
  let fixture: ComponentFixture<TransportationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransportationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
