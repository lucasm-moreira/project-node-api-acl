import { Permission } from "../entities/Permission";
import { PermissionRepository } from "../repositories";

type PermissionRequest = {
  name: string;
  description: string;
};

export class PermissionService {
  async create({
    name,
    description,
  }: PermissionRequest): Promise<Permission | Error> {
    const permissionRepository = PermissionRepository();

    if (await permissionRepository.findOne({ name })) {
      return new Error("Permission already exists!");
    }

    const permission = permissionRepository.create({ name, description });

    await permissionRepository.save(permission);

    return permission;
  }
}
