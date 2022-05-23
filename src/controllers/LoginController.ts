import { Request, Response } from "express";
import { LoginService } from "../services/LoginService";

export class LoginController {
  async login(request: Request, response: Response) {
    const { username, password } = request.body;

    const loginService = new LoginService();
    const result = await loginService.login({ username, password });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }
    return response.json(result);
  }
}
