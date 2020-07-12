import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ISendMailTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class FakeMailProvicer implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailTO): Promise<void> {
    await this.client.sendMail({
      from: {
        name: from?.name || 'Suporte GoBarber',
        address: from?.email || 'suporte@gobarber.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
