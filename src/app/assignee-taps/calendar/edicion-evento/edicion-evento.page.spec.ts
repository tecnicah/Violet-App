import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EdicionEventoPage } from './edicion-evento.page';

describe('EdicionEventoPage', () => {
  let component: EdicionEventoPage;
  let fixture: ComponentFixture<EdicionEventoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdicionEventoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EdicionEventoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
