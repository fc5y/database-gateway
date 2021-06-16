import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Participations', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('Users.id');
    table.integer('contest_id').unsigned().notNullable().references('Contests.id');
    table.integer('rank_in_contest').notNullable();
    table.integer('rating').notNullable();
    table.integer('rating_change').notNullable();
    table.integer('score').notNullable();
    table.specificType('is_hidden', 'tinyint(1)').notNullable().defaultTo(0);
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.string('contest_password').notNullable();
    table.specificType('synced', 'tinyint(1)').notNullable().defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('Participations');
}
