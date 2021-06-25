
import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({ email, password }: IAuthenticateRequest ) {

        const usersRepositories = getCustomRepository(UserRepositories);
        const user = await usersRepositories.findOne({
            email
        });

        if (!user) {
            throw new Error("Email/Password inccorrect");
        }

        const passwordMatch = await compare(password, user.password); 

        if (!passwordMatch) {
            throw new Error("Email/Password inccorrect");
        }

        const token = sign({
            email: user.email,

        }, "afcd4f19ca1ac21688d6af501ba87104", 
        {
            subject: user.id,
            expiresIn: "1d"
        });

        return token;

    }
}

export { AuthenticateUserService };