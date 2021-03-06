import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInvitationComponent } from './edit-invitation.component';

describe('EditInvitationComponent', () => {
  let component: EditInvitationComponent;
  let fixture: ComponentFixture<EditInvitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInvitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
