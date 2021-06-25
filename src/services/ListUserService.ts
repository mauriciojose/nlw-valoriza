import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../repositories/UsersRepositories";


class ListUserServices {


    async execute() {
        const userRepositories = getCustomRepository(UserRepositories);
        const users = await userRepositories.find();

        return classToPlain(users);
    }
}

export { ListUserServices }