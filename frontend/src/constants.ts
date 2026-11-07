import type { CategoriaServico, ScheduleStatus, Tone, UUID } from './types';

export const CATEGORIAS: Record<CategoriaServico, string> = {
  ESTETICA: 'Estética',
  BELEZA: 'Beleza',
  BEM_ESTAR: 'Bem-estar',
};

export const STATUS: Record<ScheduleStatus, { label: string; tone: Tone }> = {
  AGENDADO: { label: 'Agendado', tone: 'pink' },
  CONCLUIDO: { label: 'Concluído', tone: 'green' },
  CANCELADO: { label: 'Cancelado', tone: 'gray' },
};

export interface Sala {
  id: UUID;
  nome: string;
}

/**
 * O backend exige um salaId (UUID), mas ainda não existe cadastro de salas.
 * Por enquanto usamos salas fixas com UUIDs estáveis.
 */
export const SALAS: Sala[] = [
  { id: '00000000-0000-0000-0000-000000000001', nome: 'Sala 1' },
  { id: '00000000-0000-0000-0000-000000000002', nome: 'Sala 2' },
  { id: '00000000-0000-0000-0000-000000000003', nome: 'Sala 3' },
];

export function salaNome(id: UUID | null | undefined): string {
  return SALAS.find((s) => s.id === id)?.nome ?? '—';
}
