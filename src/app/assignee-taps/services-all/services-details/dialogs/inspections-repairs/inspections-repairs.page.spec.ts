import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InspectionsRepairsPage } from './inspections-repairs.page';

describe('InspectionsRepairsPage', () => {
  let component: InspectionsRepairsPage;
  let fixture: ComponentFixture<InspectionsRepairsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionsRepairsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InspectionsRepairsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
