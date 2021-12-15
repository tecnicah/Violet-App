import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DocumentManagementPage } from './document-management.page';

describe('DocumentManagementPage', () => {
  let component: DocumentManagementPage;
  let fixture: ComponentFixture<DocumentManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentManagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
