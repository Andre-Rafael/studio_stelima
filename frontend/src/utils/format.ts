import type { ISODate, Time } from '../types';

type Maybe<T> = T | null | undefined;

const pad = (n: number) => String(n).padStart(2, '0');

/** Data local de hoje em yyyy-MM-dd. */
export function todayISO(): ISODate {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Converte 'yyyy-MM-dd' em Date local (sem deslocamento de fuso). */
export function parseISODate(iso: Maybe<ISODate>): Date | null {
  if (!iso) return null;
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function formatDate(iso: Maybe<ISODate>): string {
  const d = parseISODate(iso);
  return d ? d.toLocaleDateString('pt-BR') : '—';
}

export function formatDateLong(iso: Maybe<ISODate>): string {
  const d = parseISODate(iso);
  if (!d) return '—';
  const s = d.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function formatMoney(value: Maybe<number | string>): string {
  return Number(value ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatDuration(min: Maybe<number>): string {
  if (!min) return '—';
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (!h) return `${m} min`;
  return m ? `${h}h${pad(m)}` : `${h}h`;
}

/** Soma minutos a um horário 'HH:mm'. */
export function addMinutes(time: Time, minutes: Maybe<number | string>): Time {
  if (!time) return time;
  const [h, m] = time.split(':').map(Number);
  const total = (h * 60 + m + Number(minutes || 0)) % (24 * 60);
  return `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;
}

/* ---------- Máscaras ---------- */

export type Mask = (value: string) => string;

const digits = (v: Maybe<string>) => (v ?? '').replace(/\D/g, '');

export const maskCPF: Mask = (v) =>
  digits(v)
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

export const maskPhone: Mask = (v) => {
  const d = digits(v).slice(0, 11);
  if (d.length <= 10) {
    return d.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2');
  }
  return d.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');
};

export const maskCEP: Mask = (v) => digits(v).slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2');

export function initials(name: Maybe<string>): string {
  return (name ?? '?')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');
}
