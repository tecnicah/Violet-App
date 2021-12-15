import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewMessaggePage } from './new-messagge.page';

describe('NewMessaggePage', () => {
  let component: NewMessaggePage;
  let fixture: ComponentFixture<NewMessaggePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMessaggePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewMessaggePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
