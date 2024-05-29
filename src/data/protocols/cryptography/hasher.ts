export abstract class IHasher {
  abstract hashPassword(password: string): Promise<string>;
}
