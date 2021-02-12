import {MigrationInterface, QueryRunner} from "typeorm";

export default class createTables1612302470355 implements MigrationInterface {
    name = 'createTables1612302470355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "cnpj" varchar NOT NULL, "description" varchar NOT NULL, "latitude" integer NOT NULL, "longitude" integer NOT NULL, "isPremium" boolean NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "produto" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar(300) NOT NULL, "price" integer NOT NULL, "forSales" boolean NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "produto"`);
        await queryRunner.query(`DROP TABLE "company"`);
    }

}
