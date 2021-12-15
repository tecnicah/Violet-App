import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatAssignadoPage } from './chat-assignado.page';

describe('ChatAssignadoPage', () => {
  let component: ChatAssignadoPage;
  let fixture: ComponentFixture<ChatAssignadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatAssignadoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatAssignadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
