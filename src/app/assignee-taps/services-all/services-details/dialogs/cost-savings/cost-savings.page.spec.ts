import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CostSavingsPage } from './cost-savings.page';

describe('CostSavingsPage', () => {
  let component: CostSavingsPage;
  let fixture: ComponentFixture<CostSavingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostSavingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CostSavingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
