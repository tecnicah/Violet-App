import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PropertyManagementPage } from './property-management.page';

describe('PropertyManagementPage', () => {
  let component: PropertyManagementPage;
  let fixture: ComponentFixture<PropertyManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyManagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
