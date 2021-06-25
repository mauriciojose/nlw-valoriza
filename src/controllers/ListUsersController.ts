import { Request, Response } from "express";
import { ListUserServices } from "../services/ListUserService";



class ListUsersController {

    async handle( request: Request, response: Response ) {
        const listUserService = new ListUserServices();

        const users = await listUserService.execute();

        return response.json(users);
    }
}

export { ListUsersController };