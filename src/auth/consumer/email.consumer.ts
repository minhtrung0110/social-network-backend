import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateUserDTO } from '../dto/auth.dto';

interface JobSendMail {
  user: CreateUserDTO;
  token: string;
}
@Processor('send-mail')
export class EmailConsumer {
  constructor(private mailerService: MailerService) {}

  @Process('register')
  async registerEmail(job: Job<JobSendMail>) {
    console.log(job.data);
    const time1 = new Date();
    const { user, token } = job.data;
    //const url = `http://localhost:8888/api/v1/auth/register/confirm?email=${user.email}&token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Email Verification OTP - SnapGram',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: `${user.lastName} ${user.firstName}`,
        otp: token,
      },
    });

    const time2 = new Date();
    console.log('Send Success: ', time2.getTime() - time1.getTime(), 'ms');
  }
}
