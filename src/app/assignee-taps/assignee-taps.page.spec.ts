import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssigneeTapsPage } from './assignee-taps.page';

describe('AssigneeTapsPage', () => {
  let component: AssigneeTapsPage;
  let fixture: ComponentFixture<AssigneeTapsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssigneeTapsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssigneeTapsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
