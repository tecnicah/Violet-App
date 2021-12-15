import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DocumentVehicleDialogPage } from './document-vehicle-dialog.page';

describe('DocumentVehicleDialogPage', () => {
  let component: DocumentVehicleDialogPage;
  let fixture: ComponentFixture<DocumentVehicleDialogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentVehicleDialogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentVehicleDialogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
