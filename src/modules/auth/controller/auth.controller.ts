import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { User } from '../../users/entity/user.entity';
import { AuthGuard } from '../guard/auth.guard';
import { AuthService } from '../service/auth.service';
import { LoginResponseDto } from '../dto/login-reponse.dto';
import { LoginRequestDto } from '../dto/login-request.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorUnauthorizedDto } from '../../../exception/error.unauthorized.dto';

@Controller('auth')
@ApiTags('Authentication Methods')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiCreatedResponse({
    description: 'The user has been successfully logged in.',
    type: LoginResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid username or password.',
    type: ErrorUnauthorizedDto,
  })
  signIn(@Body() user: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.signIn(user.username, user.password);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'The user has been successfully retrieved.',
    type: User,
  })
  getProfile(@Request() req: any): Promise<Partial<User>> {
    return this.authService.userInformation(req.user.username);
  }
}
