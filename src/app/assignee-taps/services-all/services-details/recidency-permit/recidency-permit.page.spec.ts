import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecidencyPermitPage } from './recidency-permit.page';

describe('RecidencyPermitPage', () => {
  let component: RecidencyPermitPage;
  let fixture: ComponentFixture<RecidencyPermitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecidencyPermitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecidencyPermitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
