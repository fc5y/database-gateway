import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Users', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.string('username').notNullable().unique();
    table.string('full_name').notNullable();
    table.string('email').notNullable().unique();
    table.string('school_name');
    table.string('password').notNullable();
    table.string('avatar').unique();
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('Users');
}
