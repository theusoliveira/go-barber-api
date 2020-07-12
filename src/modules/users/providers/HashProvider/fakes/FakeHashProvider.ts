import IHashProvier from '@modules/users/providers/HashProvider/models/IHashProvider';

export default class FakeHashProvider implements IHashProvier {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}
