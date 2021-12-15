import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilterSupplierPage } from './filter-supplier.page';

describe('FilterSupplierPage', () => {
  let component: FilterSupplierPage;
  let fixture: ComponentFixture<FilterSupplierPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterSupplierPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterSupplierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
