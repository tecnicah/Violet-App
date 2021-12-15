import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddActivitieItemPage } from './add-activitie-item.page';

describe('AddActivitieItemPage', () => {
  let component: AddActivitieItemPage;
  let fixture: ComponentFixture<AddActivitieItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddActivitieItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddActivitieItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
