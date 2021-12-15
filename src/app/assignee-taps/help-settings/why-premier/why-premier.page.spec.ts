import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WhyPremierPage } from './why-premier.page';

describe('WhyPremierPage', () => {
  let component: WhyPremierPage;
  let fixture: ComponentFixture<WhyPremierPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhyPremierPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WhyPremierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
