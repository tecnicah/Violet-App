import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SupplierPartnerServicePage } from './supplier-partner-service.page';

describe('SupplierPartnerServicePage', () => {
  let component: SupplierPartnerServicePage;
  let fixture: ComponentFixture<SupplierPartnerServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierPartnerServicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SupplierPartnerServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
