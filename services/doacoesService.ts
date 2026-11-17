import { del, get, post, put } from './api';
export type Doacao = { id: string; tipoItem: string; quantidade: number; pontoDestino: string; criadoEm: string };
export type DoacaoInput = Omit<Doacao, 'id' | 'criadoEm'>;
type Page<T> = { content: T[]; page: { number: number; totalPages: number; last: boolean } };
export const listarPagina = (filtro = '', page = 0) => get<Page<Doacao>>(`/doacoes/filtro?filtro=${encodeURIComponent(filtro)}&page=${page}&size=10`);
export const buscarPorId = (id: string) => get<Doacao>(`/doacoes/${id}`);
export const cadastrar = (data: DoacaoInput) => post<Doacao>('/doacoes', data);
export const editar = (id: string, data: DoacaoInput) => put<Doacao>(`/doacoes/${id}`, data);
export const excluir = (id: string) => del<void>(`/doacoes/${id}`);
