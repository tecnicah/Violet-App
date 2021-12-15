import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeSalePage } from './home-sale.page';

describe('HomeSalePage', () => {
  let component: HomeSalePage;
  let fixture: ComponentFixture<HomeSalePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSalePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeSalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
