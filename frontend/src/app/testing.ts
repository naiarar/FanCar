import { Carro } from './models/carro';

export const carroFake = (extra: Partial<Carro> = {}): Carro => ({
  id_carro: 'abc-123',
  nome_carro: 'Compass',
  marca: 'Jeep',
  modelo: 'Longitude',
  ano_fabricacao: 2021,
  ano_modelo: 2022,
  cor: 'Cinza',
  tipo_combustivel: 'flex',
  cambio: 'automatico',
  quilometragem: 34000,
  valor: 149900,
  foto: null,
  ...extra,
});
