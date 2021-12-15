import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportAndEventAssigneePage } from './report-and-event-assignee.page';

describe('ReportAndEventAssigneePage', () => {
  let component: ReportAndEventAssigneePage;
  let fixture: ComponentFixture<ReportAndEventAssigneePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAndEventAssigneePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportAndEventAssigneePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
