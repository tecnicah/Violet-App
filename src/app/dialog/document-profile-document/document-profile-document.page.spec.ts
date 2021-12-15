import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DocumentProfileDocumentPage } from './document-profile-document.page';

describe('DocumentProfileDocumentPage', () => {
  let component: DocumentProfileDocumentPage;
  let fixture: ComponentFixture<DocumentProfileDocumentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentProfileDocumentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentProfileDocumentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
