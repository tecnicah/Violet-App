import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SupplierPartnerConsultantPage } from './supplier-partner-consultant.page';

describe('SupplierPartnerConsultantPage', () => {
  let component: SupplierPartnerConsultantPage;
  let fixture: ComponentFixture<SupplierPartnerConsultantPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierPartnerConsultantPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SupplierPartnerConsultantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
