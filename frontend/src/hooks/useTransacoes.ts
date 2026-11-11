import { useEffect, useState } from "react";

import { api } from "@/services/api";
import type { Transacao } from "@/types/transacao";

export function useTransacoes() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);

  useEffect(() => {
    api
      .get<Transacao[]>("/transactions")
      .then((resposta) => setTransacoes(resposta.data))
      .catch((erro) => console.log(erro));
  }, []);

  async function recarregar() {
    const resposta = await api.get<Transacao[]>("/transactions");
    setTransacoes(resposta.data);
  }

  return { transacoes, recarregar };
}
