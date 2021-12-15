import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CorporateAssiatancePage } from './corporate-assiatance.page';

describe('CorporateAssiatancePage', () => {
  let component: CorporateAssiatancePage;
  let fixture: ComponentFixture<CorporateAssiatancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateAssiatancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CorporateAssiatancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
