const moeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatarMoeda(valor: number) {
  return moeda.format(valor);
}

export function formatarData(texto: string) {
  return new Date(texto).toLocaleDateString("pt-BR");
}
