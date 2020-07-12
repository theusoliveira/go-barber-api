import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ISendMailTO from '../dtos/ISendMailDTO';

export default class FakeMailProvicer implements IMailProvider {
  private messages: ISendMailTO[] = [];

  public async sendMail(message: ISendMailTO): Promise<void> {
    this.messages.push(message);
  }
}
