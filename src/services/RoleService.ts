import { Role } from "../entities/Role";
import { RoleRepository } from "../repositories";

type RoleRequest = {
  name: string;
  description: string;
};

export class RoleService {
  async create({ name, description }: RoleRequest): Promise<Role | Error> {
    const roleRepository = RoleRepository();

    if (await roleRepository.findOne({ name })) {
      return new Error("Role already exists!");
    }

    const role = roleRepository.create({ name, description });

    await roleRepository.save(role);

    return role;
  }
}
