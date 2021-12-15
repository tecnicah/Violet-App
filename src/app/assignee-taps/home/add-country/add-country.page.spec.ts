import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddCountryPage } from './add-country.page';

describe('AddCountryPage', () => {
  let component: AddCountryPage;
  let fixture: ComponentFixture<AddCountryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCountryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCountryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
