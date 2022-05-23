import { Role } from "../entities/Role";
import { PermissionRepository, RoleRepository } from "../repositories";

type RolePermissionRequest = {
  roleId: string;
  permissions: string[];
};

export class RolePermissionService {
  async create({
    roleId,
    permissions,
  }: RolePermissionRequest): Promise<Role | Error> {
    const roleRepository = RoleRepository();

    const role = await roleRepository.findOne(roleId);

    if (!role) {
      return new Error("Role does not exists!");
    }

    const permissionsExists = await PermissionRepository().findByIds(
      permissions
    );

    role.permissions = permissionsExists;

    await roleRepository.save(role);

    return role;
  }
}
