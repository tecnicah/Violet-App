import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RentalFurnitureCoordinationPage } from './rental-furniture-coordination.page';

describe('RentalFurnitureCoordinationPage', () => {
  let component: RentalFurnitureCoordinationPage;
  let fixture: ComponentFixture<RentalFurnitureCoordinationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalFurnitureCoordinationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RentalFurnitureCoordinationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
