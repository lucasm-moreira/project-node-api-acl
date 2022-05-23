import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRoles1627508887000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "roles",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
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
    .into("roles")
    .values({
      id: "2722ac3f-886a-4898-8381-b4b9b270c18b",
      name: "administrator",
      description: "Administrador de Sistemas",
      created_at: new Date(),
      updated_at: new Date()
    })
    .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("roles");
  }
}
