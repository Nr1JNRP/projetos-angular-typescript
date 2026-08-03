export type TipoTelefone = 'CELULAR' | 'FIXO';

export interface Usuario {
  id: number;
  email: string;
  nome: string;
  cpf: string;
  telefone: string;
  tipoTelefone: TipoTelefone;
}

export type UsuarioForm = Omit<Usuario, 'id'>;
