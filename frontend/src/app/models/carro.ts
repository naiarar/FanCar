export type Combustivel =
  | 'gasolina'
  | 'alcool'
  | 'flex'
  | 'diesel'
  | 'gas-natural'
  | 'eletrico'
  | 'hibrido';

export type Cambio = 'manual' | 'automatico';

export interface Carro {
  id_carro: string;
  nome_carro: string;
  marca: string;
  modelo: string;
  ano_fabricacao: number;
  ano_modelo: number;
  cor: string;
  tipo_combustivel: Combustivel;
  cambio: Cambio;
  quilometragem: number;
  valor: number;
  foto: string | null;
}

export const COMBUSTIVEIS: Record<Combustivel, string> = {
  gasolina: 'Gasolina',
  alcool: 'Álcool',
  flex: 'Flex',
  diesel: 'Diesel',
  'gas-natural': 'Gás Natural',
  eletrico: 'Elétrico',
  hibrido: 'Híbrido',
};

export const CAMBIOS: Record<Cambio, string> = {
  manual: 'Manual',
  automatico: 'Automático',
};
