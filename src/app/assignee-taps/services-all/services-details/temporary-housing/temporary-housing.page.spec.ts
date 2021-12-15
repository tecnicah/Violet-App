import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TemporaryHousingPage } from './temporary-housing.page';

describe('TemporaryHousingPage', () => {
  let component: TemporaryHousingPage;
  let fixture: ComponentFixture<TemporaryHousingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemporaryHousingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TemporaryHousingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
