import {MigrationInterface, QueryRunner} from "typeorm";

export default class createCompanyToCategory1613427919339 implements MigrationInterface {
    name = 'createCompanyToCategory1613427919339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_category" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "companyId" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_category"("id", "name") SELECT "id", "name" FROM "category"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`ALTER TABLE "temporary_category" RENAME TO "category"`);
        await queryRunner.query(`CREATE TABLE "temporary_category" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "companyId" varchar, CONSTRAINT "FK_38f0b4d3cd4cabf4bb582edb920" FOREIGN KEY ("companyId") REFERENCES "company" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_category"("id", "name", "companyId") SELECT "id", "name", "companyId" FROM "category"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`ALTER TABLE "temporary_category" RENAME TO "category"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" RENAME TO "temporary_category"`);
        await queryRunner.query(`CREATE TABLE "category" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "companyId" varchar)`);
        await queryRunner.query(`INSERT INTO "category"("id", "name", "companyId") SELECT "id", "name", "companyId" FROM "temporary_category"`);
        await queryRunner.query(`DROP TABLE "temporary_category"`);
        await queryRunner.query(`ALTER TABLE "category" RENAME TO "temporary_category"`);
        await queryRunner.query(`CREATE TABLE "category" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "category"("id", "name") SELECT "id", "name" FROM "temporary_category"`);
        await queryRunner.query(`DROP TABLE "temporary_category"`);
    }

}
