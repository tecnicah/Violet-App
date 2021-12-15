import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatPremierPage } from './chat-premier.page';

describe('ChatPremierPage', () => {
  let component: ChatPremierPage;
  let fixture: ComponentFixture<ChatPremierPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatPremierPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatPremierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
