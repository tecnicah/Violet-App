import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HelpSettingsPage } from './help-settings.page';

describe('HelpSettingsPage', () => {
  let component: HelpSettingsPage;
  let fixture: ComponentFixture<HelpSettingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpSettingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HelpSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
