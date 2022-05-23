import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  async create(request: Request, response: Response) {
    const { username, password } = request.body;

    const userService = new UserService();
    const result = await userService.create({ username, password });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
