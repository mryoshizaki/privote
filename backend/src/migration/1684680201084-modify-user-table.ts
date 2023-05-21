import {MigrationInterface, QueryRunner} from "typeorm";
import { User } from "../entity/User";
import usersData from "../seed/users";

export class modifyUserTable1684680042496 implements MigrationInterface {
    name = 'modifyUserTable1684680042496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`verified\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`first_name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`last_name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`sex\` enum ('Male', 'Female') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`address\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`valid_id_type\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`birthday\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`age\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`age\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`birthday\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`valid_id_type\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`address\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`sex\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`last_name\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`first_name\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`verified\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`name\` varchar(100) NOT NULL`);
    }

}
