import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeparturePage } from './departure.page';

describe('DeparturePage', () => {
  let component: DeparturePage;
  let fixture: ComponentFixture<DeparturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeparturePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeparturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
