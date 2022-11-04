import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateSpecificationsCars1667525539545
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "specifications_cars",
        columns: [
          {
            name: "car_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "specification_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "specifications_cars",
      new TableForeignKey({
        name: "FK_car_id",
        columnNames: ["car_id"],
        referencedTableName: "cars",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      "specifications_cars",
      new TableForeignKey({
        name: "FK_specification_id",
        columnNames: ["specification_id"],
        referencedTableName: "specifications",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "specifications_cars",
      "FK_specification_id"
    );

    await queryRunner.dropForeignKey("specifications_cars", "FK_car_id");

    await queryRunner.dropTable("specifications_cars");
  }
}
