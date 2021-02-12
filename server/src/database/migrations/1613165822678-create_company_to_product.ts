import {MigrationInterface, QueryRunner} from "typeorm";

export class createCompanyToProduct1613165822678 implements MigrationInterface {
    name = 'createCompanyToProduct1613165822678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar(300) NOT NULL, "price" integer NOT NULL, "forSales" boolean NOT NULL, "companyId" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar(300) NOT NULL, "price" integer NOT NULL, "forSales" boolean NOT NULL, "companyId" varchar, CONSTRAINT "FK_a331e634b87a7dbba2e7fccce19" FOREIGN KEY ("companyId") REFERENCES "company" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_product"("id", "name", "description", "price", "forSales", "companyId") SELECT "id", "name", "description", "price", "forSales", "companyId" FROM "product"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`ALTER TABLE "temporary_product" RENAME TO "product"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" RENAME TO "temporary_product"`);
        await queryRunner.query(`CREATE TABLE "product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar(300) NOT NULL, "price" integer NOT NULL, "forSales" boolean NOT NULL, "companyId" varchar)`);
        await queryRunner.query(`INSERT INTO "product"("id", "name", "description", "price", "forSales", "companyId") SELECT "id", "name", "description", "price", "forSales", "companyId" FROM "temporary_product"`);
        await queryRunner.query(`DROP TABLE "temporary_product"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
