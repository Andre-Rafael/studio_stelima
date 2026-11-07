import { useState, type ChangeEvent, type FormEvent } from 'react';
import { professionalsApi } from '../api';
import { useFetch } from '../hooks/useFetch';
import { useToast } from '../components/Toast';
import Modal, { ConfirmDialog } from '../components/Modal';
import { PageHeader, Badge, Loading, ErrorState, EmptyState, Field, SearchInput } from '../components/ui';
import { PlusIcon, EditIcon, TrashIcon } from '../components/Icons';
import { initials, maskPhone, type Mask } from '../utils/format';
import type { Professional, ProfessionalRequest } from '../types';

type TextField = Exclude<keyof ProfessionalRequest, 'technicalResponsible'>;

const empty: ProfessionalRequest = {
  name: '',
  specialty: '',
  phone: '',
  email: '',
  professionalLicense: '',
  technicalResponsible: false,
};

export default function Professionals() {
  const { data, loading, error, reload } = useFetch(professionalsApi.list);
  const notify = useToast();
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Professional | 'new' | null>(null);
  const [form, setForm] = useState<ProfessionalRequest>(empty);
  const [saving, setSaving] = useState(false);
  const [toRemove, setToRemove] = useState<Professional | null>(null);

  const openNew = () => {
    setForm(empty);
    setEditing('new');
  };
  const openEdit = (p: Professional) => {
    setForm({
      name: p.name ?? '',
      specialty: p.specialty ?? '',
      phone: p.phone ?? '',
      email: p.email ?? '',
      professionalLicense: p.professionalLicense ?? '',
      technicalResponsible: !!p.technicalResponsible,
    });
    setEditing(p);
  };
  const close = () => setEditing(null);
  const set = (k: TextField, mask?: Mask) => (e: ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: mask ? mask(e.target.value) : e.target.value }));

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    try {
      if (editing === 'new') await professionalsApi.create(form);
      else await professionalsApi.update(editing.id, form);
      notify(editing === 'new' ? 'Profissional cadastrada!' : 'Dados atualizados!');
      close();
      reload();
    } catch (err) {
      notify((err as Error).message, 'error');
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!toRemove) return;
    setSaving(true);
    try {
      await professionalsApi.remove(toRemove.id);
      notify('Profissional desativada.');
      setToRemove(null);
      reload();
    } catch (err) {
      notify((err as Error).message, 'error');
    } finally {
      setSaving(false);
    }
  }

  const q = search.trim().toLowerCase();
  const isActive = (p: Professional) => (p.active !== false ? 1 : 0);
  const list = (data ?? [])
    .filter((p) => !q || `${p.name} ${p.specialty} ${p.email}`.toLowerCase().includes(q))
    .sort((a, b) => isActive(b) - isActive(a) || a.name.localeCompare(b.name));

  return (
    <>
      <PageHeader
        title="Profissionais"
        subtitle="Equipe do studio"
        action={
          <button className="btn btn-primary" onClick={openNew}>
            <PlusIcon /> Nova profissional
          </button>
        }
      />

      <div className="toolbar">
        <SearchInput value={search} onChange={setSearch} placeholder="Buscar por nome ou especialidade…" />
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorState error={error} onRetry={reload} />
      ) : list.length === 0 ? (
        <EmptyState title="Nenhuma profissional encontrada" />
      ) : (
        <div className="grid-cards">
          {list.map((p) => {
            const inactive = p.active === false;
            return (
              <article key={p.id} className={`card person${inactive ? ' is-inactive' : ''}`}>
                <div className="person-head">
                  <span className="avatar">{initials(p.name)}</span>
                  <div>
                    <h3>{p.name}</h3>
                    <span className="muted">{p.specialty}</span>
                  </div>
                </div>
                <div className="badges">
                  {p.technicalResponsible && <Badge tone="pink">Responsável técnica</Badge>}
                  {inactive && <Badge tone="gray">Inativa</Badge>}
                </div>
                <dl className="kv">
                  <dt>Telefone</dt>
                  <dd>{p.phone || '—'}</dd>
                  <dt>E-mail</dt>
                  <dd>{p.email || '—'}</dd>
                  <dt>Registro</dt>
                  <dd>{p.professionalLicense || '—'}</dd>
                </dl>
                <div className="card-actions">
                  <button className="btn btn-ghost btn-sm" onClick={() => openEdit(p)}>
                    <EditIcon /> Editar
                  </button>
                  {!inactive && (
                    <button className="btn btn-ghost btn-sm btn-danger-text" onClick={() => setToRemove(p)}>
                      <TrashIcon /> Desativar
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      <Modal
        open={editing !== null}
        title={editing === 'new' ? 'Nova profissional' : 'Editar profissional'}
        onClose={close}
        footer={
          <>
            <button className="btn btn-ghost" onClick={close}>Cancelar</button>
            <button className="btn btn-primary" type="submit" form="prof-form" disabled={saving}>
              {saving ? 'Salvando…' : 'Salvar'}
            </button>
          </>
        }
      >
        <form id="prof-form" className="form-grid" onSubmit={submit}>
          <Field label="Nome" required full>
            <input value={form.name} onChange={set('name')} required />
          </Field>
          <Field label="Especialidade" required>
            <input value={form.specialty} onChange={set('specialty')} required placeholder="Ex.: Esteticista" />
          </Field>
          <Field label="Registro profissional" required>
            <input value={form.professionalLicense} onChange={set('professionalLicense')} required />
          </Field>
          <Field label="Telefone" required>
            <input value={form.phone} onChange={set('phone', maskPhone)} required placeholder="(00) 00000-0000" />
          </Field>
          <Field label="E-mail" required>
            <input type="email" value={form.email} onChange={set('email')} required />
          </Field>
          <label className="check field-full">
            <input
              type="checkbox"
              checked={form.technicalResponsible}
              onChange={(e) => setForm((f) => ({ ...f, technicalResponsible: e.target.checked }))}
            />
            Responsável técnica do studio
          </label>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!toRemove}
        title="Desativar profissional"
        message={`${toRemove?.name} não poderá mais receber novos agendamentos.`}
        confirmLabel="Desativar"
        danger
        busy={saving}
        onConfirm={remove}
        onClose={() => setToRemove(null)}
      />
    </>
  );
}
