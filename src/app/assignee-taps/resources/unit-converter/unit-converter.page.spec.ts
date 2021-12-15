import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UnitConverterPage } from './unit-converter.page';

describe('UnitConverterPage', () => {
  let component: UnitConverterPage;
  let fixture: ComponentFixture<UnitConverterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitConverterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UnitConverterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
