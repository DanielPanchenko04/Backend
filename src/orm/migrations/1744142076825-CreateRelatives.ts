import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateRelatives1744142076825 implements MigrationInterface {
    name = 'CreateRelatives1744142076825'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "post"
            ADD "user_id" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "post"
            ADD CONSTRAINT "FK_52378a74ae3724bcab44036645b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "post" DROP CONSTRAINT "FK_52378a74ae3724bcab44036645b"
        `);
        await queryRunner.query(`
            ALTER TABLE "post" DROP COLUMN "user_id"
        `);
    }

}
