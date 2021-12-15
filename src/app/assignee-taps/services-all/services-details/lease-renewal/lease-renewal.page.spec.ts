import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LeaseRenewalPage } from './lease-renewal.page';

describe('LeaseRenewalPage', () => {
  let component: LeaseRenewalPage;
  let fixture: ComponentFixture<LeaseRenewalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaseRenewalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LeaseRenewalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
