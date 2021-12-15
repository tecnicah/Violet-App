import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServiceRatingPage } from './service-rating.page';

describe('ServiceRatingPage', () => {
  let component: ServiceRatingPage;
  let fixture: ComponentFixture<ServiceRatingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceRatingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceRatingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
