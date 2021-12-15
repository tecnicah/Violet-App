import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeneralMensagePage } from './general-mensage.page';

describe('GeneralMensagePage', () => {
  let component: GeneralMensagePage;
  let fixture: ComponentFixture<GeneralMensagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralMensagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralMensagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
