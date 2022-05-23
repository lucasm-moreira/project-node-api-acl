import { Request, Response } from "express";
import { UserAccessControlListService } from "../services/UserAccessControlListService";

export class UserAccessControlListController {
  async create(request: Request, response: Response) {
    const { permissions, roles } = request.body;
    const { userId } = request;

    const userACLService = new UserAccessControlListService();

    const result = await userACLService.create({
      userId,
      permissions,
      roles,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
