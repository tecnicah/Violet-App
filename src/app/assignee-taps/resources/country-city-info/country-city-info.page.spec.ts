import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CountryCityInfoPage } from './country-city-info.page';

describe('CountryCityInfoPage', () => {
  let component: CountryCityInfoPage;
  let fixture: ComponentFixture<CountryCityInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryCityInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CountryCityInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
