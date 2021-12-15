import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SettlingInPage } from './settling-in.page';

describe('SettlingInPage', () => {
  let component: SettlingInPage;
  let fixture: ComponentFixture<SettlingInPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettlingInPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SettlingInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
