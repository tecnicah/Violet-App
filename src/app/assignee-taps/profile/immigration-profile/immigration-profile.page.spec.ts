import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImmigrationProfilePage } from './immigration-profile.page';

describe('ImmigrationProfilePage', () => {
  let component: ImmigrationProfilePage;
  let fixture: ComponentFixture<ImmigrationProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmigrationProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImmigrationProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
