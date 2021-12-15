import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeFindingPage } from './home-finding.page';

describe('HomeFindingPage', () => {
  let component: HomeFindingPage;
  let fixture: ComponentFixture<HomeFindingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeFindingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeFindingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
