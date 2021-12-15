import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TenancyManagementPage } from './tenancy-management.page';

describe('TenancyManagementPage', () => {
  let component: TenancyManagementPage;
  let fixture: ComponentFixture<TenancyManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenancyManagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TenancyManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
