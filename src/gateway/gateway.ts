import { OnModuleInit } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { race } from 'rxjs';
import { Server } from 'socket.io';

@WebSocketGateway()
export class SocketGateWay implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected');
    });
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() body: any) {
    console.log('body', body);

    let count = 0;
    const fakeResponse =
      "Introducing the HangerMiracle shorts, a perfect combination of style and comfort. These symmetrical shorts feature a regular fit, ensuring a flattering and relaxed silhouette. With an above-the-knee length, they offer a trendy and versatile look suitable for various occasions. The fly opening type adds convenience and functionality to the design. Made with high-quality materials, these shorts feature a plain pattern textile, adding a touch of sophistication to your outfit. From casual outings to semi-formal events, the HangerMiracle shorts are a must-have addition to any fashion-forward individual's wardrobe.".split(
        ' ',
      );

    const interval = setInterval(() => {
      if (count >= fakeResponse.length) {
        clearInterval(interval);
      }
      this.server.emit('generated content', {
        content: fakeResponse[count],
      });
      count++;
    }, 200);
  }

  @SubscribeMessage('generate content')
  handleGenerateContent(@MessageBody() body: any) {
    console.log('body generate content', body);
    const fakeResponse =
      "Introducing the HangerMiracle shorts, a perfect combination of style and comfort. These symmetrical shorts feature a regular fit, ensuring a flattering and relaxed silhouette. With an above-the-knee length, they offer a trendy and versatile look suitable for various occasions. The fly opening type adds convenience and functionality to the design. Made with high-quality materials, these shorts feature a plain pattern textile, adding a touch of sophistication to your outfit. From casual outings to semi-formal events, the HangerMiracle shorts are a must-have addition to any fashion-forward individual's wardrobe.".split(
        ' ',
      );
  }
}
