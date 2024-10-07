import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1728308592852 implements MigrationInterface {
  name = 'Migrations1728308592852';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "videos" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "youtube_url" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "thumbnail" character varying NOT NULL, "user_id" integer, CONSTRAINT "PK_e4c86c0cf95aff16e9fb8220f6b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "videos" ADD CONSTRAINT "FK_900733992fb36a6d855308c0039" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "videos" DROP CONSTRAINT "FK_900733992fb36a6d855308c0039"`,
    );
    await queryRunner.query(`DROP TABLE "videos"`);
  }
}
