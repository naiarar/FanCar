import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { CatalogoService } from '../services/catalogo.service';
import { carroFake } from '../testing';
import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  const catalogoService = { carros: vi.fn(), excluirCarro: vi.fn() };

  beforeEach(() => {
    vi.resetAllMocks();
    catalogoService.carros.mockReturnValue(of([carroFake(), carroFake({ id_carro: 'def-456', nome_carro: 'Renegade' })]));
    catalogoService.excluirCarro.mockReturnValue(of(undefined));
    TestBed.configureTestingModule({
      imports: [AdminComponent],
      providers: [provideRouter([]), { provide: CatalogoService, useValue: catalogoService }],
    });
  });

  it('remove o carro da tabela após confirmar a exclusão', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const fixture = TestBed.createComponent(AdminComponent);
    fixture.detectChanges();

    fixture.componentInstance.excluirCarro(carroFake());
    fixture.detectChanges();

    expect(catalogoService.excluirCarro).toHaveBeenCalledWith('abc-123');
    expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toBe(1);
  });

  it('não exclui se o usuário cancelar', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    const fixture = TestBed.createComponent(AdminComponent);
    fixture.detectChanges();

    fixture.componentInstance.excluirCarro(carroFake());

    expect(catalogoService.excluirCarro).not.toHaveBeenCalled();
  });
});
