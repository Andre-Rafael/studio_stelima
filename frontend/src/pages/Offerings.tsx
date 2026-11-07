import { useState, type ChangeEvent, type FormEvent } from 'react';
import { offeringsApi } from '../api';
import { useFetch } from '../hooks/useFetch';
import { useToast } from '../components/Toast';
import Modal, { ConfirmDialog } from '../components/Modal';
import { PageHeader, Badge, Loading, ErrorState, EmptyState, Field } from '../components/ui';
import { PlusIcon, EditIcon, TrashIcon, ClockIcon } from '../components/Icons';
import { CATEGORIAS } from '../constants';
import { formatMoney, formatDuration } from '../utils/format';
import type { CategoriaServico, Offering, OfferingRequest } from '../types';

type CategoryFilter = CategoriaServico | 'TODOS';

/** Campos numéricos ficam como string enquanto a usuária digita. */
type OfferingForm = Omit<OfferingRequest, 'duration_minutes' | 'price'> & {
  duration_minutes: number | string;
  price: number | string;
};

type InputEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

const empty: OfferingForm = { name: '', description: '', duration_minutes: 60, price: '', category: 'ESTETICA' };

const CATEGORY_KEYS = Object.keys(CATEGORIAS) as CategoriaServico[];

export default function Offerings() {
  const { data, loading, error, reload } = useFetch(offeringsApi.list);
  const notify = useToast();
  const [filter, setFilter] = useState<CategoryFilter>('TODOS');
  const [showInactive, setShowInactive] = useState(false);
  const [editing, setEditing] = useState<Offering | 'new' | null>(null);
  const [form, setForm] = useState<OfferingForm>(empty);
  const [saving, setSaving] = useState(false);
  const [toRemove, setToRemove] = useState<Offering | null>(null);

  const openNew = () => {
    setForm(empty);
    setEditing('new');
  };
  const openEdit = (o: Offering) => {
    setForm({
      name: o.nome,
      description: o.descricao,
      duration_minutes: o.duracao_min,
      price: o.preco,
      category: o.categoria,
    });
    setEditing(o);
  };
  const close = () => setEditing(null);
  const set = (k: keyof OfferingForm) => (e: InputEvent) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    const payload: OfferingRequest = {
      ...form,
      duration_minutes: Number(form.duration_minutes),
      price: Number(form.price),
    };
    try {
      if (editing === 'new') await offeringsApi.create(payload);
      else await offeringsApi.update(editing.id, payload);
      notify(editing === 'new' ? 'Serviço criado!' : 'Serviço atualizado!');
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
      await offeringsApi.remove(toRemove.id);
      notify('Serviço desativado.');
      setToRemove(null);
      reload();
    } catch (err) {
      notify((err as Error).message, 'error');
    } finally {
      setSaving(false);
    }
  }

  const list = (data ?? [])
    .filter((o) => showInactive || o.ativo)
    .filter((o) => filter === 'TODOS' || o.categoria === filter)
    .sort((a, b) => a.nome.localeCompare(b.nome));

  return (
    <>
      <PageHeader
        title="Serviços"
        subtitle="Procedimentos oferecidos pelo studio"
        action={
          <button className="btn btn-primary" onClick={openNew}>
            <PlusIcon /> Novo serviço
          </button>
        }
      />

      <div className="toolbar">
        <div className="chips">
          {(['TODOS', ...CATEGORY_KEYS] as CategoryFilter[]).map((c) => (
            <button key={c} className={`chip${filter === c ? ' chip-active' : ''}`} onClick={() => setFilter(c)}>
              {c === 'TODOS' ? 'Todos' : CATEGORIAS[c]}
            </button>
          ))}
        </div>
        <label className="check">
          <input type="checkbox" checked={showInactive} onChange={(e) => setShowInactive(e.target.checked)} />
          Mostrar inativos
        </label>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorState error={error} onRetry={reload} />
      ) : list.length === 0 ? (
        <EmptyState title="Nenhum serviço por aqui" text="Cadastre o primeiro procedimento do studio." />
      ) : (
        <div className="grid-cards">
          {list.map((o) => (
            <article key={o.id} className={`card offering${o.ativo ? '' : ' is-inactive'}`}>
              <div className="offering-top">
                <Badge tone="pink">{CATEGORIAS[o.categoria] ?? o.categoria}</Badge>
                {!o.ativo && <Badge tone="gray">Inativo</Badge>}
              </div>
              <h3>{o.nome}</h3>
              <p className="muted offering-desc">{o.descricao}</p>
              <div className="offering-meta">
                <span className="price">{formatMoney(o.preco)}</span>
                <span className="muted inline-icon">
                  <ClockIcon /> {formatDuration(o.duracao_min)}
                </span>
              </div>
              <div className="card-actions">
                <button className="btn btn-ghost btn-sm" onClick={() => openEdit(o)}>
                  <EditIcon /> Editar
                </button>
                {o.ativo && (
                  <button className="btn btn-ghost btn-sm btn-danger-text" onClick={() => setToRemove(o)}>
                    <TrashIcon /> Desativar
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      <Modal
        open={editing !== null}
        title={editing === 'new' ? 'Novo serviço' : 'Editar serviço'}
        onClose={close}
        footer={
          <>
            <button className="btn btn-ghost" onClick={close}>Cancelar</button>
            <button className="btn btn-primary" type="submit" form="offering-form" disabled={saving}>
              {saving ? 'Salvando…' : 'Salvar'}
            </button>
          </>
        }
      >
        <form id="offering-form" className="form-grid" onSubmit={submit}>
          <Field label="Nome" required full>
            <input value={form.name} onChange={set('name')} required placeholder="Ex.: Limpeza de pele" />
          </Field>
          <Field label="Descrição" required full>
            <textarea rows={3} value={form.description} onChange={set('description')} required />
          </Field>
          <Field label="Categoria" required>
            <select value={form.category} onChange={set('category')}>
              {Object.entries(CATEGORIAS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </Field>
          <Field label="Duração (min)" required>
            <input type="number" min="5" step="5" value={form.duration_minutes} onChange={set('duration_minutes')} required />
          </Field>
          <Field label="Preço (R$)" required>
            <input type="number" min="0" step="0.01" value={form.price} onChange={set('price')} required />
          </Field>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!toRemove}
        title="Desativar serviço"
        message={`O serviço “${toRemove?.nome}” deixará de aparecer para novos agendamentos.`}
        confirmLabel="Desativar"
        danger
        busy={saving}
        onConfirm={remove}
        onClose={() => setToRemove(null)}
      />
    </>
  );
}
