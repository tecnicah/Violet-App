import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SchoolSearchPage } from './school-search.page';

describe('SchoolSearchPage', () => {
  let component: SchoolSearchPage;
  let fixture: ComponentFixture<SchoolSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolSearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
