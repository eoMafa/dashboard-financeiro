export const CATEGORIAS = [
  { valor: "Salary", rotulo: "Salário" },
  { valor: "Food", rotulo: "Alimentação" },
  { valor: "Transport", rotulo: "Transporte" },
  { valor: "Investment", rotulo: "Investimento" },
  { valor: "Pix", rotulo: "Pix" },
  { valor: "Credit Card", rotulo: "Cartão" },
  { valor: "Other", rotulo: "Outros" },
];

export function nomeDaCategoria(valor: string) {
  return (
    CATEGORIAS.find((categoria) => categoria.valor === valor)?.rotulo ?? valor
  );
}
