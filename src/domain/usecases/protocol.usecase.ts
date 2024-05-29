type SyncOrAsync<T> = T | Promise<T>;
export abstract class UseCase<Param, Response> {
  abstract execute(params: Param): SyncOrAsync<Response>;
}
