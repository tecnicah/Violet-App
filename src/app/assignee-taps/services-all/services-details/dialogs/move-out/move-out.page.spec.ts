import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoveOutPage } from './move-out.page';

describe('MoveOutPage', () => {
  let component: MoveOutPage;
  let fixture: ComponentFixture<MoveOutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveOutPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoveOutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
