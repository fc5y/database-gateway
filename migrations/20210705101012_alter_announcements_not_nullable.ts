import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('Announcements', (table: Knex.TableBuilder) => {
    table.string('announcement_name').notNullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('Announcements', (table: Knex.TableBuilder) => {
    table.string('announcement_name').nullable().alter();
  });
}
