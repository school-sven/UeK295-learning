import { Controller, Get } from '@nestjs/common';
import { RootService } from '../service/root.service';
import { CorrelationId } from '../../decorators/correlation-id.decorator';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Root Methods')
export class RootController {
  constructor(private readonly appService: RootService) {}

  @Get()
  @ApiOkResponse({
    description: 'The hello has been successfully retrieved.',
    type: String,
  })
  getHello(@CorrelationId() corrId: string): string {
    console.log(corrId, 'getHello()');
    return this.appService.getHello();
  }

  @Get('healthcheck')
  @ApiOkResponse({
    description: 'The healthcheck has been successfully retrieved.',
    type: String,
  })
  getHealthCheck(): string {
    return this.appService.getHealthCheck();
  }

  @Get('version')
  @ApiOkResponse({
    description: 'The version has been successfully retrieved.',
    type: String,
  })
  getVersion(): string | undefined {
    return this.appService.getVersion();
  }

  @Get('wait2s')
  @ApiOkResponse({
    description: 'Waited successfully for 2 seconds.',
    type: String,
  })
  getAwait(): Promise<string> {
    return this.appService.getAwait();
  }
}
