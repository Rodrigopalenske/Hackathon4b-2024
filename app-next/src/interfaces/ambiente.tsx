export interface IAmbiente {
  id: number;
  nome: string;
  capacidade: number;
  tipo: string;
  equipamentos: string;
  localizacao: string;
  status: string;
  dia_hora_disponivel: DiaDisponivel[]; // Lista de objetos com dias e horários
  dias_indisponiveis: DiaIndisponivel[]; // Lista de datas indisponíveis
}

// Dia e lista de horários disponíveis
export interface DiaDisponivel {
  dia_disponivel: string; 
  horas_disponiveis: Horario[];
}

// Hora de início e fim
export interface Horario {
  hora_inicio: string; 
  hora_fim: string; 
}

// Data indisponível
export interface DiaIndisponivel {
    data: string; 
}
