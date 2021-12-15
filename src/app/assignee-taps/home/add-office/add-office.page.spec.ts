import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddOfficePage } from './add-office.page';

describe('AddOfficePage', () => {
  let component: AddOfficePage;
  let fixture: ComponentFixture<AddOfficePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOfficePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddOfficePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
