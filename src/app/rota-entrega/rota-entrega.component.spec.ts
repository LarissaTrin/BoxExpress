import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotaEntregaComponent } from './rota-entrega.component';

describe('RotaEntregaComponent', () => {
  let component: RotaEntregaComponent;
  let fixture: ComponentFixture<RotaEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RotaEntregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RotaEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
