import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

  await knex.raw(`
    create table if not exists posts(
      post_id uuid primary key default uuid_generate_v4(),
      title varchar(64) not null,
      content text not null,
      author_id uuid references users(user_id) not null,
      created_at timestamp not null default current_timestamp
    );
  `);

}


export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    drop table posts;
  `);
}

