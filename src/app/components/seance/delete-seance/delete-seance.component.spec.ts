import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSeanceComponent } from './delete-seance.component';

describe('DeleteSeanceComponent', () => {
  let component: DeleteSeanceComponent;
  let fixture: ComponentFixture<DeleteSeanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSeanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSeanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
