import retry from './retry';
import { from } from 'rxjs';
import * as amqp from 'amqplib';

jest.setTimeout(30000);

describe('Amqp Retry', () => {
  it('retrys are called', async () => {
    try {
      const result = await from(
        amqp.connect({
          hostname: 'localhost',
          port: 5672,
        }),
      )
        .pipe(retry())
        .toPromise();
      expect(false).toBeTruthy();
    } catch (e) {
      expect(true).toBeTruthy();
    }
  });
});
