import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewSrPage } from './view-sr.page';

describe('ViewSrPage', () => {
  let component: ViewSrPage;
  let fixture: ComponentFixture<ViewSrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSrPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewSrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
