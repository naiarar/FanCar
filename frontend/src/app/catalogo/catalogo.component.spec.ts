import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';

import { provideLocalePtBr } from '../locale';
import { CatalogoService } from '../services/catalogo.service';
import { carroFake } from '../testing';
import { CatalogoComponent } from './catalogo.component';

describe('CatalogoComponent', () => {
  let fixture: ComponentFixture<CatalogoComponent>;
  const catalogoService = { carros: vi.fn() };

  const criar = () => {
    fixture = TestBed.createComponent(CatalogoComponent);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  };

  beforeEach(() => {
    catalogoService.carros.mockReset();
    TestBed.configureTestingModule({
      imports: [CatalogoComponent],
      providers: [provideRouter([]), provideLocalePtBr(), { provide: CatalogoService, useValue: catalogoService }],
    });
  });

  it('lista os carros com preço formatado', () => {
    catalogoService.carros.mockReturnValue(of([carroFake()]));

    const texto = criar().textContent!.replace(/\s+/g, ' ');

    expect(texto).toContain('Jeep Compass');
    expect(texto).toContain('R$ 149.900,00');
  });

  it('mostra aviso quando não há resultados', () => {
    catalogoService.carros.mockReturnValue(of([]));

    expect(criar().textContent).toContain('Nenhum veículo encontrado');
  });

  it('mostra erro quando a API falha', () => {
    catalogoService.carros.mockReturnValue(throwError(() => new Error()));

    expect(criar().textContent).toContain('Não foi possível carregar o catálogo');
  });

  it('alterna a ordenação e pesquisa pelo termo digitado', () => {
    catalogoService.carros.mockReturnValue(of([]));
    criar();

    fixture.componentInstance.alternarOrdem();
    fixture.componentInstance.busca = 'bmw';
    fixture.componentInstance.pesquisar();

    expect(catalogoService.carros).toHaveBeenNthCalledWith(1, 'asc', '');
    expect(catalogoService.carros).toHaveBeenNthCalledWith(2, 'desc', '');
    expect(catalogoService.carros).toHaveBeenNthCalledWith(3, 'desc', 'bmw');
  });
});
