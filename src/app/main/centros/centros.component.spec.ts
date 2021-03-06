import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentrosComponent } from './centros.component';

describe('CentrosComponent', () => {
  let component: CentrosComponent;
  let fixture: ComponentFixture<CentrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
