import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompliancePoliciesPage } from './compliance-policies.page';

describe('CompliancePoliciesPage', () => {
  let component: CompliancePoliciesPage;
  let fixture: ComponentFixture<CompliancePoliciesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompliancePoliciesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompliancePoliciesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
