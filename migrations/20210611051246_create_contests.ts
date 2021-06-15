import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Contests', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.string('contest_name').notNullable().unique();
    table.dateTime('start_time').notNullable();
    table.integer('duration').notNullable();
    table.string('contest_title');
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.specificType('can_enter', 'tinyint(1)').notNullable();
    table.json('materials').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('Contests');
}
