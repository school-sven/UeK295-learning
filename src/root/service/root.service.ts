import { Injectable } from '@nestjs/common';

@Injectable()
export class RootService {
  getHello(): string {
    return 'Hello World!';
  }

  getHealthCheck() {
    return 'healthy!';
  }

  getVersion() {
    return process.env.npm_package_version;
  }

  async getAwait(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Await 2s!');
      }, 2000);
    });
  }
}
