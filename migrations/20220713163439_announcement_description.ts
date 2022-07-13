import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('Announcements', (table: Knex.TableBuilder) => {
    table.text('announcement_description').alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('Announcements', (table: Knex.TableBuilder) => {
    table.string('announcement_description').alter();
  });
}
