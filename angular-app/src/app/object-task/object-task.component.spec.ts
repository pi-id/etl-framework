import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectTaskComponent } from './object-task.component';

describe('ObjectTaskComponent', () => {
  let component: ObjectTaskComponent;
  let fixture: ComponentFixture<ObjectTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
