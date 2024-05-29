export abstract class IHashComparer {
  abstract toCompare(password: string, digest: string): Promise<boolean>;
}
