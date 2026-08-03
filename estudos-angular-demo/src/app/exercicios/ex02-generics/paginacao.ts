export interface PaginaParams {
  pagina: number;
  tamanho: number;
}

export interface Pagina<T> {
  itens: T[];
  total: number;
  pagina: number;
  totalPaginas: number;
}

export function filtrarEPaginar<T>(
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
    totalPaginas: Math.ceil(filtrados.length / params.tamanho) || 1,
  };
}
