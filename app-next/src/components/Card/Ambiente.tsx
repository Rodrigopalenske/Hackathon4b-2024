"use client";

import { useRouter } from "next/navigation";
import { IAmbiente } from "@/interfaces/ambiente";
import { ChevronDown } from "lucide-react";

export const Ambiente = (props: IAmbiente) => {
  const router = useRouter();

  return (
    <div className="ambiente">
      <button
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={`#ambiente${props.id}`}
        aria-expanded="false"
        aria-controls={`ambiente${props.id}`}
      >
        <h2>{props.nome}</h2>
        <span className="arrow">
          <ChevronDown />
        </span>
      </button>

      <div className="collapse" id={"ambiente" + props.id}>
        <div className="card card-body">
          <span>Capacidade:</span>
          <p>{props.capacidade}</p>
          <span>Tipo de ambiente:</span>
          <p>{props.tipo}</p>
          <span>Descrição:</span>
          <p>{props.equipamentos}</p>
          <span>Localidade:</span>
          <p>{props.localizacao}</p>
          <span>Disponibilidade:</span>
          <p>{props.status}</p>
        </div>
      </div>
    </div>
  );
};
