import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicesAllPage } from './services-all.page';

describe('ServicesAllPage', () => {
  let component: ServicesAllPage;
  let fixture: ComponentFixture<ServicesAllPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesAllPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicesAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
