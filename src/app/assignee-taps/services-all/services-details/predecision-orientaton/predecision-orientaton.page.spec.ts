import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PredecisionOrientatonPage } from './predecision-orientaton.page';

describe('PredecisionOrientatonPage', () => {
  let component: PredecisionOrientatonPage;
  let fixture: ComponentFixture<PredecisionOrientatonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredecisionOrientatonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PredecisionOrientatonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
