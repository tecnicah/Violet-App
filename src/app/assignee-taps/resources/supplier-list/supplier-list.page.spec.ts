import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SupplierListPage } from './supplier-list.page';

describe('SupplierListPage', () => {
  let component: SupplierListPage;
  let fixture: ComponentFixture<SupplierListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SupplierListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
