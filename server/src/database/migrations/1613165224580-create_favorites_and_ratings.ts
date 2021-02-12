import {MigrationInterface, QueryRunner} from "typeorm";

export default class createFavoritesAndRatings1613165224580 implements MigrationInterface {
    name = 'createFavoritesAndRatings1613165224580'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rating" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "stars" integer NOT NULL, "userId" varchar, "companyId" varchar)`);
        await queryRunner.query(`CREATE TABLE "favorites" ("id" varchar PRIMARY KEY NOT NULL, "userId" varchar, "companyId" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_rating" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "stars" integer NOT NULL, "userId" varchar, "companyId" varchar, CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_5ba60534dfab818ce79f6fd58c1" FOREIGN KEY ("companyId") REFERENCES "company" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_rating"("id", "title", "content", "stars", "userId", "companyId") SELECT "id", "title", "content", "stars", "userId", "companyId" FROM "rating"`);
        await queryRunner.query(`DROP TABLE "rating"`);
        await queryRunner.query(`ALTER TABLE "temporary_rating" RENAME TO "rating"`);
        await queryRunner.query(`CREATE TABLE "temporary_favorites" ("id" varchar PRIMARY KEY NOT NULL, "userId" varchar, "companyId" varchar, CONSTRAINT "FK_e747534006c6e3c2f09939da60f" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_7a4be58abb526277d1ab266d5f1" FOREIGN KEY ("companyId") REFERENCES "company" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_favorites"("id", "userId", "companyId") SELECT "id", "userId", "companyId" FROM "favorites"`);
        await queryRunner.query(`DROP TABLE "favorites"`);
        await queryRunner.query(`ALTER TABLE "temporary_favorites" RENAME TO "favorites"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites" RENAME TO "temporary_favorites"`);
        await queryRunner.query(`CREATE TABLE "favorites" ("id" varchar PRIMARY KEY NOT NULL, "userId" varchar, "companyId" varchar)`);
        await queryRunner.query(`INSERT INTO "favorites"("id", "userId", "companyId") SELECT "id", "userId", "companyId" FROM "temporary_favorites"`);
        await queryRunner.query(`DROP TABLE "temporary_favorites"`);
        await queryRunner.query(`ALTER TABLE "rating" RENAME TO "temporary_rating"`);
        await queryRunner.query(`CREATE TABLE "rating" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "stars" integer NOT NULL, "userId" varchar, "companyId" varchar)`);
        await queryRunner.query(`INSERT INTO "rating"("id", "title", "content", "stars", "userId", "companyId") SELECT "id", "title", "content", "stars", "userId", "companyId" FROM "temporary_rating"`);
        await queryRunner.query(`DROP TABLE "temporary_rating"`);
        await queryRunner.query(`DROP TABLE "favorites"`);
        await queryRunner.query(`DROP TABLE "rating"`);
    }

}
