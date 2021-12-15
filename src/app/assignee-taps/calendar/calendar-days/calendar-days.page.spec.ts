import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CalendarDaysPage } from './calendar-days.page';

describe('CalendarDaysPage', () => {
  let component: CalendarDaysPage;
  let fixture: ComponentFixture<CalendarDaysPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarDaysPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarDaysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
