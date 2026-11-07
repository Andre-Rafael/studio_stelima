import type { ReactNode } from 'react';
import { SearchIcon } from './Icons';
import type { Tone } from '../types';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <header className="page-header">
      <div>
        <h1>{title}</h1>
        {subtitle && <p className="muted">{subtitle}</p>}
      </div>
      {action}
    </header>
  );
}

export function Badge({ tone = 'pink', children }: { tone?: Tone; children: ReactNode }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

export function Loading() {
  return (
    <div className="state">
      <span className="spinner" aria-hidden="true" />
      <span className="muted">Carregando…</span>
    </div>
  );
}

export function ErrorState({ error, onRetry }: { error: Error | null; onRetry?: () => void }) {
  return (
    <div className="state state-error">
      <strong>Algo deu errado</strong>
      <span className="muted">{error?.message}</span>
      {onRetry && (
        <button className="btn btn-ghost" onClick={onRetry}>
          Tentar de novo
        </button>
      )}
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  text?: string;
  action?: ReactNode;
}

export function EmptyState({ title, text, action }: EmptyStateProps) {
  return (
    <div className="state">
      <span className="empty-flower" aria-hidden="true">✿</span>
      <strong>{title}</strong>
      {text && <span className="muted">{text}</span>}
      {action}
    </div>
  );
}

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = 'Buscar…' }: SearchInputProps) {
  return (
    <label className="search">
      <SearchIcon />
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </label>
  );
}

interface FieldProps {
  label: string;
  required?: boolean;
  hint?: ReactNode;
  full?: boolean;
  children: ReactNode;
}

export function Field({ label, required, hint, children, full }: FieldProps) {
  return (
    <label className={`field${full ? ' field-full' : ''}`}>
      <span className="field-label">
        {label}
        {required && <span className="req"> *</span>}
      </span>
      {children}
      {hint && <span className="field-hint">{hint}</span>}
    </label>
  );
}
