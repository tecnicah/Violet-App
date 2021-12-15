import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilterNotificationPage } from './filter-notification.page';

describe('FilterNotificationPage', () => {
  let component: FilterNotificationPage;
  let fixture: ComponentFixture<FilterNotificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterNotificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterNotificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
