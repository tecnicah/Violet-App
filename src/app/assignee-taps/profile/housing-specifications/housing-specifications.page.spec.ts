import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HousingSpecificationsPage } from './housing-specifications.page';

describe('HousingSpecificationsPage', () => {
  let component: HousingSpecificationsPage;
  let fixture: ComponentFixture<HousingSpecificationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousingSpecificationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HousingSpecificationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
