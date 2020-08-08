<p align="center"><img src="https://avatars1.githubusercontent.com/u/43827489?s=400&u=45ac0ac47d40b6d8f277c96bdf00244c10508aef&v=4"/></p>
<p align="center">
    <a href="https://www.npmjs.com/package/nestjs-amqp"><img src="https://img.shields.io/npm/v/nestjs-amqp.svg"/></a>
    <img src="https://sonarcloud.io/api/project_badges/measure?project=sawakaga_nestjs-amqp&metric=sqale_rating"/>
    <a href="https://github.com/sawakaga/nestjs-amqp/blob/master/LICENSE"><img src="https://img.shields.io/badge/lisense-MIT-brightgreen"/></a>
    <img src="https://flat.badgen.net/dependabot/nestjsx/nestjs-config?icon=dependabot" />
    <img src="https://camo.githubusercontent.com/a34cfbf37ba6848362bf2bee0f3915c2e38b1cc1/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5052732d77656c636f6d652d627269676874677265656e2e7376673f7374796c653d666c61742d737175617265" />
    <a href="https://github.com/nestjs/nest"><img src="https://raw.githubusercontent.com/nestjsx/crud/master/img/nest-powered.svg?sanitize=true" alt="Nest Powered" /></a>
</p>
<h1 align="center">Nestjs Amqp</h1>

<p align="center">An AMQP connection service for <a href="https://github.com/nestjs/nest">NestJS</a>.</p>

This source code forked from semi-dead useful repository nestjsx/nestjs-amqp authored and maintained by @bashleigh

This repository intents to bring full functionality of <a href="https://github.com/squaremo/amqp.node">amqplib</a> to nestjs module base.

## Install

```bash
$ npm install --save sawakaga/nestjs-amqp
```

## Basic usage 

```ts
import {Module} from '@nestjs/common';
import {AmqpModule} from 'nestjs-amqp';

@Module({
  imports: [AmqpModule.forRoot({
    name: 'rabbitmq',
    hostname: 'localhost',
    port: 5672,
    username: 'test',
    password: 'test',
  })],
})
export default class AppModule {}

```

## Connection Decorators

```ts
import {Module} from '@nestjs/common';
import {AmqpModule} from 'nestjs-amqp';

@Module({
  imports: [AmqpModule.forRoot([
    {
      hostname: 'test:test@localhost',
    }, 
    {
      username: 'test',
      password: 'test',
      hostname: 'localhost',
      port: 5672,
      protocol: 'amqps',
      name: 'test',
    }
  ])],
})
export default class ExecutionModule {
}
```

```ts
import {Injectable} from '@nestjs/common';
import {InjectAmqpConnection} from 'nestjs-amqp';

@Injectable()
export default class TestService {
  constructor(
    @InjectAmqpConnection('test') private readonly connectionTest, //gets connection with name 'test' defined in module
    @InjectAmqpConnection(0) private readonly connection0, //gets first defined connection without a name
  ) {}
}
```
> Use InjectAmqpConnection without a parameter for default connection

### Example publish 

```ts
import {Injectable, Logger} from '@nestjs/common';
import {InjectAmqpConnection} from 'nestjs-amqp';

@Injectable()
export default class TestProvider {
  constructor(@InjectAmqpConnection() private readonly amqp) {}
  async publish(message: string)  {
    await this.amqp.createChannel((err, channel) => {
      if (err != null) {
        Logger.alert(err, 'TestProvider');
      }
      channel.assertQueue('test_queue_name');
      channel.sendToQueue('test_queue_name', message);
    });
  }
}
```
More information and examples about amqplib can be found [here](https://www.npmjs.com/package/amqplib).

## Available Options

Name | For | Default
--- | --- | ---
hostname | The host url for the connection | `localhost`
port | The port of the amqp host | `5672`
name | The name of the connection | `default` or the array key index `[0]`
retrys | The amount of retry attempts before surrender | 3
retryDelay | The amount of milliseconds to wait before attempting retry | 3000
protocol | The protocol for the connection | `amqp`
username | The username for the connection | `quest`
password | The password for the connection | `quest`
locale | The desired locale for error messages | `en_US`
frameMax | The size in bytes of the maximum frame allowed over the connection | 0
heartbeat | The period of the connection heartbeat in seconds | 0
vhost | What VHost shall be used | `/`

## Testing this package

```bash
$ jest
```

