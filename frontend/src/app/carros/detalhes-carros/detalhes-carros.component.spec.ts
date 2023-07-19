import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesCarrosComponent } from './detalhes-carros.component';

describe('DetalhesCarrosComponent', () => {
  let component: DetalhesCarrosComponent;
  let fixture: ComponentFixture<DetalhesCarrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalhesCarrosComponent]
    });
    fixture = TestBed.createComponent(DetalhesCarrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
