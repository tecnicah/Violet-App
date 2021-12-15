import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AreaOrientationPage } from './area-orientation.page';

describe('AreaOrientationPage', () => {
  let component: AreaOrientationPage;
  let fixture: ComponentFixture<AreaOrientationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaOrientationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AreaOrientationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
