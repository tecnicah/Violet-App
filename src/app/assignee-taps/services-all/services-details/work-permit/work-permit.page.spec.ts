import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorkPermitPage } from './work-permit.page';

describe('WorkPermitPage', () => {
  let component: WorkPermitPage;
  let fixture: ComponentFixture<WorkPermitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkPermitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkPermitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
