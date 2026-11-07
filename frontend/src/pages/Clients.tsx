import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { clientsApi } from '../api';
import { useFetch } from '../hooks/useFetch';
import { useToast } from '../components/Toast';
import Modal, { ConfirmDialog } from '../components/Modal';
import { PageHeader, Loading, ErrorState, EmptyState, Field, SearchInput } from '../components/ui';
import { PlusIcon, EditIcon, TrashIcon } from '../components/Icons';
import { formatDate, initials, maskCEP, maskCPF, maskPhone, type Mask } from '../utils/format';
import type { Client, ClientRequest } from '../types';

const empty: ClientRequest = {
  name: '',
  phone: '',
  email: '',
  cpf: '',
  birthDate: '',
  cep: '',
  endereco: '',
  bairro: '',
  numero: '',
  complemento: '',
};

const FORM_KEYS = Object.keys(empty) as (keyof ClientRequest)[];

interface ViaCepResponse {
  erro?: boolean;
  logradouro?: string;
  bairro?: string;
}

export default function Clients() {
  const { data, loading, error, reload } = useFetch(clientsApi.list);
  const notify = useToast();
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Client | 'new' | null>(null);
  const [form, setForm] = useState<ClientRequest>(empty);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toRemove, setToRemove] = useState<Client | null>(null);

  // Libera a URL temporária da pré-visualização quando ela muda.
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const open = (client: Client | null) => {
    setForm(
      client
        ? (Object.fromEntries(FORM_KEYS.map((k) => [k, client[k] ?? ''])) as unknown as ClientRequest)
        : empty
    );
    setFile(null);
    setPreview(null);
    setEditing(client ?? 'new');
  };
  const close = () => setEditing(null);
  const set = (k: keyof ClientRequest, mask?: Mask) => (e: ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: mask ? mask(e.target.value) : e.target.value }));

  function onFile(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    if (f && f.size > 2 * 1024 * 1024) {
      notify('A foto deve ter no máximo 2 MB.', 'error');
      e.target.value = '';
      return;
    }
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  }

  // Preenche o endereço a partir do CEP (ViaCEP).
  async function lookupCep() {
    const cep = form.cep.replace(/\D/g, '');
    if (cep.length !== 8) return;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const json = (await res.json()) as ViaCepResponse;
      if (json.erro) return;
      setForm((f) => ({
        ...f,
        endereco: f.endereco || json.logradouro || '',
        bairro: f.bairro || json.bairro || '',
      }));
    } catch {
      /* sem internet: segue manual */
    }
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    if (!file) {
      notify('Selecione uma foto da cliente.', 'error');
      return;
    }
    setSaving(true);
    try {
      if (editing === 'new') await clientsApi.create(form, file);
      else await clientsApi.update(editing.id, form, file);
      notify(editing === 'new' ? 'Cliente cadastrada!' : 'Cliente atualizada!');
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
      await clientsApi.remove(toRemove.id);
      notify('Cliente removida.');
      setToRemove(null);
      reload();
    } catch (err) {
      notify((err as Error).message, 'error');
    } finally {
      setSaving(false);
    }
  }

  const q = search.trim().toLowerCase();
  const qDigits = q.replace(/\D/g, '');
  const list = (data ?? [])
    .filter((c) => {
      if (!q) return true;
      if (`${c.name} ${c.email ?? ''}`.toLowerCase().includes(q)) return true;
      return !!qDigits && `${c.cpf} ${c.phone}`.replace(/\D/g, '').includes(qDigits);
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <PageHeader
        title="Clientes"
        subtitle={data ? `${data.length} cadastrada(s)` : 'Cadastro de clientes'}
        action={
          <button className="btn btn-primary" onClick={() => open(null)}>
            <PlusIcon /> Nova cliente
          </button>
        }
      />

      <div className="toolbar">
        <SearchInput value={search} onChange={setSearch} placeholder="Buscar por nome, CPF ou telefone…" />
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorState error={error} onRetry={reload} />
      ) : list.length === 0 ? (
        <EmptyState title="Nenhuma cliente encontrada" text={q ? 'Tente outro termo de busca.' : 'Cadastre a primeira cliente.'} />
      ) : (
        <div className="card table-card">
          <table className="table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Telefone</th>
                <th className="hide-sm">CPF</th>
                <th className="hide-sm">Nascimento</th>
                <th className="hide-md">Bairro</th>
                <th aria-label="Ações" />
              </tr>
            </thead>
            <tbody>
              {list.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div className="cell-person">
                      <span className="avatar avatar-sm">{initials(c.name)}</span>
                      <div>
                        <div className="strong">{c.name}</div>
                        <div className="muted small">{c.email || '—'}</div>
                      </div>
                    </div>
                  </td>
                  <td>{c.phone}</td>
                  <td className="hide-sm">{c.cpf}</td>
                  <td className="hide-sm">{formatDate(c.birthDate)}</td>
                  <td className="hide-md">{c.bairro}</td>
                  <td>
                    <div className="row-actions">
                      <button className="icon-btn" onClick={() => open(c)} aria-label="Editar">
                        <EditIcon />
                      </button>
                      <button className="icon-btn icon-btn-danger" onClick={() => setToRemove(c)} aria-label="Remover">
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={editing !== null}
        title={editing === 'new' ? 'Nova cliente' : 'Editar cliente'}
        onClose={close}
        size="lg"
        footer={
          <>
            <button className="btn btn-ghost" onClick={close}>Cancelar</button>
            <button className="btn btn-primary" type="submit" form="client-form" disabled={saving}>
              {saving ? 'Salvando…' : 'Salvar'}
            </button>
          </>
        }
      >
        <form id="client-form" className="form-grid" onSubmit={submit}>
          <div className="photo-picker field-full">
            <div className="photo-preview">
              {preview ? <img src={preview} alt="Pré-visualização" /> : <span>{initials(form.name || '?')}</span>}
            </div>
            <Field
              label="Foto inicial"
              required
              hint={editing === 'new' ? 'JPG ou PNG, até 2 MB.' : 'Para salvar alterações, envie a foto novamente (até 2 MB).'}
            >
              <input type="file" accept="image/*" onChange={onFile} />
            </Field>
          </div>

          <h3 className="form-section field-full">Dados pessoais</h3>
          <Field label="Nome completo" required full>
            <input value={form.name} onChange={set('name')} required />
          </Field>
          <Field label="CPF" required>
            <input value={form.cpf} onChange={set('cpf', maskCPF)} required placeholder="000.000.000-00" inputMode="numeric" />
          </Field>
          <Field label="Data de nascimento" required>
            <input type="date" value={form.birthDate} onChange={set('birthDate')} required />
          </Field>
          <Field label="Telefone" required>
            <input value={form.phone} onChange={set('phone', maskPhone)} required placeholder="(00) 00000-0000" inputMode="tel" />
          </Field>
          <Field label="E-mail">
            <input type="email" value={form.email} onChange={set('email')} />
          </Field>

          <h3 className="form-section field-full">Endereço</h3>
          <Field label="CEP" required hint="O endereço é preenchido automaticamente.">
            <input value={form.cep} onChange={set('cep', maskCEP)} onBlur={lookupCep} required placeholder="00000-000" inputMode="numeric" />
          </Field>
          <Field label="Bairro" required>
            <input value={form.bairro} onChange={set('bairro')} required />
          </Field>
          <Field label="Endereço" required full>
            <input value={form.endereco} onChange={set('endereco')} required />
          </Field>
          <Field label="Número" required>
            <input value={form.numero} onChange={set('numero')} required />
          </Field>
          <Field label="Complemento" required>
            <input value={form.complemento} onChange={set('complemento')} required placeholder="Ex.: Apto 12 ou “—”" />
          </Field>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!toRemove}
        title="Remover cliente"
        message={`Tem certeza que deseja remover ${toRemove?.name}? Essa ação não pode ser desfeita.`}
        confirmLabel="Remover"
        danger
        busy={saving}
        onConfirm={remove}
        onClose={() => setToRemove(null)}
      />
    </>
  );
}
