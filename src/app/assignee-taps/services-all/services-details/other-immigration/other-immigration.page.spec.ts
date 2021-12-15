import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtherImmigrationPage } from './other-immigration.page';

describe('OtherImmigrationPage', () => {
  let component: OtherImmigrationPage;
  let fixture: ComponentFixture<OtherImmigrationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherImmigrationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtherImmigrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
