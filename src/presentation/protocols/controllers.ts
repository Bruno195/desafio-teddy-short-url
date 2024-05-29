import { HttpResponse } from '@/presentation/protocols/http';
type SyncOrAsync<T> = T | Promise<T>;
export interface IController<T = any> {
  handle: (...request: T[]) => SyncOrAsync<HttpResponse>;
}
