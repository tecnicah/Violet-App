import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RequestAdditionalTimePage } from './request-additional-time.page';

describe('RequestAdditionalTimePage', () => {
  let component: RequestAdditionalTimePage;
  let fixture: ComponentFixture<RequestAdditionalTimePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestAdditionalTimePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RequestAdditionalTimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
