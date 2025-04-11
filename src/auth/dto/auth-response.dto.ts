import { Role } from '../../users/entities/user.entity';
export class AuthResponseDto {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: Role;
  };
}
