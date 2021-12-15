import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportEventPage } from './report-event.page';

describe('ReportEventPage', () => {
  let component: ReportEventPage;
  let fixture: ComponentFixture<ReportEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportEventPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
