import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntidadesFiscalesComponent } from './entidades-fiscales.component';

describe('EntidadesFiscalesComponent', () => {
  let component: EntidadesFiscalesComponent;
  let fixture: ComponentFixture<EntidadesFiscalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntidadesFiscalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntidadesFiscalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
