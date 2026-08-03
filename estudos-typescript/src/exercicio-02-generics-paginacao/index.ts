// 1.2 - generics e tipos utilitários
// ideia: uma função genérica que filtra qualquer array e já devolve
// paginado, sem precisar de "any" em lugar nenhum

interface PaginaParams {
  pagina: number; // começa em 1, não em 0
  tamanho: number;
}

interface Pagina<T> {
  itens: T[];
  total: number;
  pagina: number;
  totalPaginas: number;
}

function filtrarEPaginar<T>(
  data: T[],
  filterFn: (item: T) => boolean,
  params: PaginaParams
): Pagina<T> {
  const filtrados = data.filter(filterFn);

  const inicio = (params.pagina - 1) * params.tamanho;
  const fim = inicio + params.tamanho;

  return {
    itens: filtrados.slice(inicio, fim),
    total: filtrados.length,
    pagina: params.pagina,
    totalPaginas: Math.ceil(filtrados.length / params.tamanho),
  };
}

// --- exemplo de uso ---

interface Usuario {
  id: number;
  nome: string;
  ativo: boolean;
}

const usuarios: Usuario[] = [
  { id: 1, nome: 'Ana Silva', ativo: true },
  { id: 2, nome: 'Bruno Costa', ativo: true },
  { id: 3, nome: 'Ana Paula', ativo: false },
  { id: 4, nome: 'Carlos Souza', ativo: true },
  { id: 5, nome: 'Ana Beatriz', ativo: true },
];

// filtrando só quem tem "ana" no nome, página 1 com 2 itens por página
const resultado = filtrarEPaginar<Usuario>(
  usuarios,
  (u) => u.nome.toLowerCase().includes('ana'),
  { pagina: 1, tamanho: 2 }
);

console.log(resultado);
// { itens: [Ana Silva, Ana Paula], total: 3, pagina: 1, totalPaginas: 2 }

// o T genérico garante que "itens" sai tipado como Usuario[] automaticamente,
// então dá pra reusar essa mesma função pra Produto[], Pedido[], etc,
// sem duplicar a lógica de paginação em cada lugar
