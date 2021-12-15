import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePurchasePage } from './home-purchase.page';

describe('HomePurchasePage', () => {
  let component: HomePurchasePage;
  let fixture: ComponentFixture<HomePurchasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePurchasePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePurchasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
