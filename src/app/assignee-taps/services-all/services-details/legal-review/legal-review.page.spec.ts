import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LegalReviewPage } from './legal-review.page';

describe('LegalReviewPage', () => {
  let component: LegalReviewPage;
  let fixture: ComponentFixture<LegalReviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalReviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LegalReviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
