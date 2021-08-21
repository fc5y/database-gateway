import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('Users', (table: Knex.TableBuilder) => {
    table.dropUnique(['avatar']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('Users', (table: Knex.TableBuilder) => {
    table.string('avatar').unique().alter();
  });
}
