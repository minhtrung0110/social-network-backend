import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from '../src/user/user.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('MessageGateway');

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  //function get user from token
  async getDataUserFromToken(client: Socket): Promise<User> {
    const authToken: any = client.handshake?.query?.token;
    try {
      const decoded = this.jwtService.verify(authToken);

      return await this.userService.getUserByEmail(decoded.email); // response to function
    } catch (ex) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async handleConnection(client: Socket) {
    this.logger.log(client.id, 'Connected..............................');
    const user: User = await this.getDataUserFromToken(client);

    const information: SaveInformationDto = {
      user_id: user.id,
      type: TypeInformation.socket_id,
      status: false,
      value: client.id,
    };

    await this.informationService.create(information);
    // need handle insert socketId to information table
    // client.on('room', (room) => {
    //   client.join(room);
    // });
  }

  afterInit(server: any): any {
    this.logger.log(server, 'Init');
  }

  async handleDisconnect(client: Socket) {
    const user = await this.getDataUserFromToken(client);
    await this.informationService.deleteByValue(user.id, client.id);

    // need handle remove socketId to information table
    this.logger.log(client.id, 'Disconnect');
  }
}
