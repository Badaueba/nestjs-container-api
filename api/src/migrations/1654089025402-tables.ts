import {MigrationInterface, QueryRunner} from "typeorm";

export class tables1654089025402 implements MigrationInterface {
    name = 'tables1654089025402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`favourite-products\` (\`product\` varchar(255) NOT NULL, \`listId\` varchar(36) NULL, PRIMARY KEY (\`product\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`favourites\` (\`id\` varchar(255) NOT NULL, \`userId\` varchar(36) NULL, UNIQUE INDEX \`REL_b75b5e4a2475d03acfe11eac1d\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`favourite-products\` ADD CONSTRAINT \`FK_1566a14187ef8f1bf012e2aac8d\` FOREIGN KEY (\`listId\`) REFERENCES \`favourites\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`favourites\` ADD CONSTRAINT \`FK_b75b5e4a2475d03acfe11eac1d1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`favourites\` DROP FOREIGN KEY \`FK_b75b5e4a2475d03acfe11eac1d1\``);
        await queryRunner.query(`ALTER TABLE \`favourite-products\` DROP FOREIGN KEY \`FK_1566a14187ef8f1bf012e2aac8d\``);
        await queryRunner.query(`DROP INDEX \`REL_b75b5e4a2475d03acfe11eac1d\` ON \`favourites\``);
        await queryRunner.query(`DROP TABLE \`favourites\``);
        await queryRunner.query(`DROP TABLE \`favourite-products\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
