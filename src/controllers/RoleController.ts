import { Request, Response } from "express";
import { RoleService } from "../services/RoleService";

export class RoleController {
  async create(request: Request, response: Response) {
    const { name, description } = request.body;

    const roleService = new RoleService();

    const result = await roleService.create({ name, description });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
