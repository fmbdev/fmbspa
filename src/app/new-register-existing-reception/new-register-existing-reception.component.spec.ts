import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRegisterExistingReceptionComponent } from './new-register-existing-reception.component';

describe('NewRegisterExistingReceptionComponent', () => {
  let component: NewRegisterExistingReceptionComponent;
  let fixture: ComponentFixture<NewRegisterExistingReceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRegisterExistingReceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRegisterExistingReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
