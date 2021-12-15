import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DocumentsDialogPage } from './documents-dialog.page';

describe('DocumentsDialogPage', () => {
  let component: DocumentsDialogPage;
  let fixture: ComponentFixture<DocumentsDialogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsDialogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentsDialogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
