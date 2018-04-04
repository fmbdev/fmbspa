import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoRegistroComponent } from './nuevo-registro.component';

describe('NuevoRegistroComponent', () => {
  let component: NuevoRegistroComponent;
  let fixture: ComponentFixture<NuevoRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
