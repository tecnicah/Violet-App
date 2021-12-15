import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocalDocumentationPage } from './local-documentation.page';

describe('LocalDocumentationPage', () => {
  let component: LocalDocumentationPage;
  let fixture: ComponentFixture<LocalDocumentationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalDocumentationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocalDocumentationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
