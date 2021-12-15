import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EntryVisaPage } from './entry-visa.page';

describe('EntryVisaPage', () => {
  let component: EntryVisaPage;
  let fixture: ComponentFixture<EntryVisaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryVisaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EntryVisaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
