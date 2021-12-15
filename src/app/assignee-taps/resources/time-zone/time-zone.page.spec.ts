import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TimeZonePage } from './time-zone.page';

describe('TimeZonePage', () => {
  let component: TimeZonePage;
  let fixture: ComponentFixture<TimeZonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeZonePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TimeZonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
