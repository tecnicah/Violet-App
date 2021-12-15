import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddDependentPage } from './add-dependent.page';

describe('AddDependentPage', () => {
  let component: AddDependentPage;
  let fixture: ComponentFixture<AddDependentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDependentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDependentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
