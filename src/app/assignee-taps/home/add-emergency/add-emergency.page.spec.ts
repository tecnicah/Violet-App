import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddEmergencyPage } from './add-emergency.page';

describe('AddEmergencyPage', () => {
  let component: AddEmergencyPage;
  let fixture: ComponentFixture<AddEmergencyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmergencyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEmergencyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
