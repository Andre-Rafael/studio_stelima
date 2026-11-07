/**
 * Tipos que espelham os DTOs do backend (estetica.stelima.dto).
 * Datas chegam como 'yyyy-MM-dd', horários como 'HH:mm' e
 * timestamps (LocalDateTime) como string ISO.
 */

export type UUID = string;
/** Data no formato 'yyyy-MM-dd'. */
export type ISODate = string;
/** Horário no formato 'HH:mm'. */
export type Time = string;

/* ---------- Enums ---------- */

export type ScheduleStatus = 'AGENDADO' | 'CANCELADO' | 'CONCLUIDO';
export type CategoriaServico = 'ESTETICA' | 'BELEZA' | 'BEM_ESTAR';

/* ---------- Clientes ---------- */

/** ClientResponseDTO */
export interface Client {
  id: UUID;
  name: string;
  phone: string;
  email: string | null;
  cpf: string;
  birthDate: ISODate | null;
  cep: string;
  endereco: string;
  bairro: string;
  numero: string;
  complemento: string;
  fotoInicial: string | null;
  createAt: string | null;
  updateAt: string | null;
}

/** ClientSummaryDTO */
export type ClientSummary = Pick<Client, 'id' | 'name' | 'phone'>;

/** ClientRequestDTO */
export interface ClientRequest {
  name: string;
  phone: string;
  email: string;
  cpf: string;
  birthDate: ISODate;
  cep: string;
  endereco: string;
  bairro: string;
  numero: string;
  complemento: string;
}

/* ---------- Profissionais ---------- */

/** ProfessionalResponseDTO */
export interface Professional {
  id: UUID;
  name: string;
  specialty: string;
  phone: string;
  email: string;
  professionalLicense: string;
  technicalResponsible: boolean | null;
  active: boolean | null;
  createdAt: string | null;
}

/** ProfessionalSummaryDTO */
export type ProfessionalSummary = Pick<
  Professional,
  'id' | 'name' | 'specialty' | 'phone' | 'technicalResponsible'
>;

/** ProfessionalRequestDTO */
export interface ProfessionalRequest {
  name: string;
  specialty: string;
  phone: string;
  email: string;
  professionalLicense: string;
  technicalResponsible: boolean;
}

/* ---------- Serviços ----------
 * A API recebe { name, description, duration_minutes, price, category }
 * mas devolve { nome, descricao, duracao_min, preco, categoria, ativo }.
 */

/** OfferingResponseDTO */
export interface Offering {
  id: UUID;
  nome: string;
  descricao: string;
  duracao_min: number;
  preco: number;
  categoria: CategoriaServico;
  ativo: boolean;
}

/** OfferingRequestDTO */
export interface OfferingRequest {
  name: string;
  description: string;
  duration_minutes: number;
  price: number;
  category: CategoriaServico;
}

/* ---------- Agendamentos ---------- */

/** AppointmentResponseDTO */
export interface Appointment {
  id: UUID;
  date: ISODate;
  horaInicio: Time;
  horaFim: Time;
  status: ScheduleStatus;
  obs: string | null;
  salaId: UUID;
  cliente: ClientSummary | null;
  profissional: ProfessionalSummary | null;
  servico: Offering | null;
  criadoEm: string | null;
  atualizadoEm: string | null;
}

/** AppointmentRequestDTO — entidades relacionadas vão apenas com o id. */
export interface AppointmentRequest {
  date: ISODate;
  horaInicio: Time;
  horaFim: Time;
  status: ScheduleStatus;
  obs: string;
  salaId: UUID;
  cliente: { id: UUID | undefined };
  profissional: { id: UUID | undefined };
  offering: { id: UUID | undefined };
}

/* ---------- UI ---------- */

export type Tone = 'pink' | 'green' | 'gray';
