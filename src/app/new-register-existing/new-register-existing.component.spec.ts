import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRegisterExistingComponent } from './new-register-existing.component';

describe('NewRegisterExistingComponent', () => {
  let component: NewRegisterExistingComponent;
  let fixture: ComponentFixture<NewRegisterExistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRegisterExistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRegisterExistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
