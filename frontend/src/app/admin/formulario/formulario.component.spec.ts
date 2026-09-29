import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';

import { CatalogoService } from '../../services/catalogo.service';
import { carroFake } from '../../testing';
import { FormularioComponent } from './formulario.component';

describe('FormularioComponent', () => {
  let fixture: ComponentFixture<FormularioComponent>;
  let navigate: ReturnType<typeof vi.spyOn>;
  const catalogoService = { carro: vi.fn(), criarCarro: vi.fn(), atualizarCarro: vi.fn() };

  const criar = (id?: string) => {
    fixture = TestBed.createComponent(FormularioComponent);
    if (id) {
      fixture.componentRef.setInput('id', id);
    }
    fixture.detectChanges();
    return fixture.componentInstance;
  };

  const preencher = (componente: FormularioComponent) => {
    const { id_carro, foto, ...dados } = carroFake();
    componente.carroForm.setValue(dados);
  };

  beforeEach(() => {
    vi.resetAllMocks();
    TestBed.configureTestingModule({
      imports: [FormularioComponent],
      providers: [provideRouter([]), { provide: CatalogoService, useValue: catalogoService }],
    });
    navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
  });

  it('não envia formulário inválido', () => {
    const componente = criar();

    componente.onSubmit();

    expect(catalogoService.criarCarro).not.toHaveBeenCalled();
    expect(componente.carroForm.touched).toBe(true);
  });

  it('cria um carro e volta para a listagem', () => {
    catalogoService.criarCarro.mockReturnValue(of(carroFake()));
    const componente = criar();
    preencher(componente);

    componente.onSubmit();

    const formData: FormData = catalogoService.criarCarro.mock.calls[0][0];
    expect(formData.get('tipo_combustivel')).toBe('flex');
    expect(formData.has('foto')).toBe(false);
    expect(navigate).toHaveBeenCalledWith(['/admin']);
  });

  it('carrega o carro e atualiza no modo edição', () => {
    catalogoService.carro.mockReturnValue(of(carroFake({ foto: 'http://api/media/foto.png' })));
    catalogoService.atualizarCarro.mockReturnValue(of(carroFake()));
    const componente = criar('abc-123');

    expect(componente.carroForm.getRawValue().nome_carro).toBe('Compass');
    expect(componente.fotoAtual()).toBe('http://api/media/foto.png');

    componente.onSubmit();

    expect(catalogoService.atualizarCarro).toHaveBeenCalledWith('abc-123', expect.any(FormData));
  });

  it('mostra os erros de validação da API', () => {
    catalogoService.criarCarro.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 400, error: { ano_modelo: ['Ano inválido.'] } })),
    );
    const componente = criar();
    preencher(componente);

    componente.onSubmit();

    expect(componente.erros()).toEqual(['Ano do modelo: Ano inválido.']);
    expect(componente.enviando()).toBe(false);
  });
});
