import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoveInPage } from './move-in.page';

describe('MoveInPage', () => {
  let component: MoveInPage;
  let fixture: ComponentFixture<MoveInPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveInPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoveInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
