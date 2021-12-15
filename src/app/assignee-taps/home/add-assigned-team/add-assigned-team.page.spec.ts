import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddAssignedTeamPage } from './add-assigned-team.page';

describe('AddAssignedTeamPage', () => {
  let component: AddAssignedTeamPage;
  let fixture: ComponentFixture<AddAssignedTeamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssignedTeamPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddAssignedTeamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
