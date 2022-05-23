import { MigrationInterface, QueryRunner, Table, Timestamp } from "typeorm";

export class CreateUsersRoles1627509179887 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users_roles",
        columns: [
          { name: "role_id", type: "uuid" },
          { name: "user_id", type: "uuid" },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["role_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "roles",
            name: "fk_roles_user",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          },
          {
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            name: "fk_users_roles",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
    await queryRunner
    .manager
    .createQueryBuilder()
    .insert()
    .into("users_roles")
    .values({
      user_id: "fd0554e6-9a11-4515-b980-011a9447ca7e",
      role_id: "2722ac3f-886a-4898-8381-b4b9b270c18b",
      created_at: new Date(),
      updated_at: new Date()
    })
    .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users_roles");
  }
}
