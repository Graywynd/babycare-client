import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSeanceComponent } from './edit-seance.component';

describe('EditSeanceComponent', () => {
  let component: EditSeanceComponent;
  let fixture: ComponentFixture<EditSeanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSeanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSeanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
