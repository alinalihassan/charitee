import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  MongooseHealthIndicator,
} from '@nestjs/terminus';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private mongoose: MongooseHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Check health status of service components' })
  check(): Promise<HealthCheckResult> {
    return this.health.check([() => this.mongoose.pingCheck('db')]);
  }
}
