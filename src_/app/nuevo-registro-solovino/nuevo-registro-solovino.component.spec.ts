import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoRegistroSolovinoComponent } from './nuevo-registro-solovino.component';

describe('NuevoRegistroSolovinoComponent', () => {
  let component: NuevoRegistroSolovinoComponent;
  let fixture: ComponentFixture<NuevoRegistroSolovinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoRegistroSolovinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoRegistroSolovinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
