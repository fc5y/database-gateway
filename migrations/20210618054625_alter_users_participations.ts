import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(
    'ALTER TABLE `Users` MODIFY `username` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL;',
  );
  await knex.schema.alterTable('Participations', (table: Knex.TableBuilder) => {
    table.integer('rank_in_contest').alter();
    table.integer('rating').alter();
    table.integer('rating_change').alter();
    table.integer('score').alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw('ALTER TABLE `Users` MODIFY `username` VARCHAR(255) NOT NULL;');
  await knex.schema.alterTable('Participations', (table: Knex.TableBuilder) => {
    table.integer('rank_in_contest').notNullable().alter();
    table.integer('rating').notNullable().alter();
    table.integer('rating_change').notNullable().alter();
    table.integer('score').notNullable().alter();
  });
}
