import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BundlePage } from './bundle.page';

describe('BundlePage', () => {
  let component: BundlePage;
  let fixture: ComponentFixture<BundlePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BundlePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BundlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
