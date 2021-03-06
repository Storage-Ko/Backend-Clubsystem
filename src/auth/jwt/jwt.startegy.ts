import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Auth } from "../entities/auth.entity";
import { Club } from "src/club/entities/club.entity";
import 'dotenv/config';

export type Payload = {
    uid: string;
    id: string;
    name: string;
    type: Auth['type'];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }
    
    validate = async (payload: Payload) => {
        const data = await this.authService.findUserById(payload.id);
        const { uid, id, name, type } = data;
        return { uid, id, name, type };
    };
}

