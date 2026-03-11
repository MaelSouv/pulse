import { Injectable, 
         UnauthorizedException, 
         BadRequestException, 
         ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException("L'utilisateur n'existe pas");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }
    const payload = { id: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(username: string, password: string): Promise<string> {
    if (!username || !password) {
      throw new BadRequestException('Nom ou mot de passe requis.');
    }
    const verifyUserName = await this.usersService.findOne(username);
    if (verifyUserName) {
      throw new ConflictException("Nom d'utilisateur déjà utilisé.");
    }
    if (password) {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);
      const newUser = this.usersService.create( username,hash,);
      return 'Utilisateur ' + username + ' créé avec succès.';
    }
    return "Erreur lors de la création de l'utilisateur.";
  }
}
