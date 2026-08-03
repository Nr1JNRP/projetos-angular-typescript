// 2.2 - como veio no enunciado (só embrulhei numa classe pra ficar
// um arquivo válido, o método em si é exatamente o que foi passado)
class PessoaComponentAntes {
  texto = '';

  constructor(private readonly pessoaService: any) {}

  ngOnInit(): void {
    const pessoaId = 1;
    this.pessoaService.buscarPorId(pessoaId).subscribe((pessoa: any) => {
      this.pessoaService.buscarQuantidadeFamiliares(pessoaId).subscribe((qtd: any) => {
        this.texto = `Nome: ${pessoa.nome} | familiares: ${qtd}`;
      });
    });
  }
}
