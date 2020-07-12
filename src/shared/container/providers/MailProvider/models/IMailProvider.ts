import ISendMailTO from '../dtos/ISendMailDTO';

export default interface IMailProvider {
  sendMail(data: ISendMailTO): Promise<void>;
}
