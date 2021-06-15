import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('EmailVerifications', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.string('email').notNullable();
    table.string('otp').notNullable();
    table.dateTime('expired_time').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('EmailVerifications');
}
