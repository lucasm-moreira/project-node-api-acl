import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { hash } from "bcryptjs";

export class CreateUsers1627508510952 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "username",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
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
      })
    );

    await queryRunner
    .manager
    .createQueryBuilder()
    .insert()
    .into("users")
    .values({
      id: "fd0554e6-9a11-4515-b980-011a9447ca7e",
      username: "admin",
      password: await hash("123456", 8),
      created_at: new Date(),
      updated_at: new Date()
    })
    .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
