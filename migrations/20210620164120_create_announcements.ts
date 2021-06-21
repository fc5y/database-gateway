import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('Announcements', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.string('announcement_name');
        table.string('announcement_title');
        table.string('announcement_description');
        table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('Announcements');
}

