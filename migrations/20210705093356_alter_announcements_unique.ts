import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('Announcements', (table: Knex.TableBuilder) => {
    table.string('announcement_name').unique().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('Announcements', (table: Knex.TableBuilder) => {
    table.dropUnique(['announcement_name']);
  });
}
