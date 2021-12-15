import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DocumentRelocationPage } from './document-relocation.page';

describe('DocumentRelocationPage', () => {
  let component: DocumentRelocationPage;
  let fixture: ComponentFixture<DocumentRelocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentRelocationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentRelocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
