import { User } from "../entities/User";
import {
  PermissionRepository,
  RoleRepository,
  UserRepository,
} from "../repositories";

type UserACLRequest = {
  userId: string;
  roles: string[];
  permissions: string[];
};

export class UserAccessControlListService {
  async create({
    userId,
    roles,
    permissions,
  }: UserACLRequest): Promise<User | Error> {
    const userRepository = UserRepository();

    const user = await userRepository.findOne(userId);

    if (!user) {
      return new Error("User does not exists!");
    }

    const permissionsExists = await PermissionRepository().findByIds(
      permissions
    );

    const rolesExists = await RoleRepository().findByIds(roles);

    user.permissions = permissionsExists;
    user.roles = rolesExists;

    userRepository.save(user);

    return user;
  }
}
