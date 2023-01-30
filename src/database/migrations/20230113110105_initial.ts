import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

  await knex.schema.raw(`
    create extension if not exists "uuid-ossp";
  `);
  
  await knex.raw(`
    create table if not exists users(
      user_id uuid primary key default uuid_generate_v4(),
      first_name varchar(64) not null,
      last_name varchar(64) not null,
      email varchar(128) not null,
      password varchar(64) not null,
      is_active bool not null default true,
      is_verified bool not null default false,
      created_at timestamp not null default current_timestamp
    );
  `);

  await knex.raw(`
    create table user_sessions (
      session_id uuid primary key default uuid_generate_v4(),
      user_id uuid references users (user_id) not null,
      refresh_token character varying(1024) not null,
      refresh_token_expires_at timestamp with time zone not null,
      logged_in_at timestamp with time zone not null default current_timestamp,
      logged_out_at timestamp with time zone,
      is_logged_out boolean not null default false,
      remote_ip character varying(36) not null,
      device text not null
    );
  `);

  await knex.raw(`
    create table if not exists otp_logs(
      otp_id uuid primary key default uuid_generate_v4(),
      created_at timestamp not null default current_timestamp,
      code varchar(12) not null,
      user_id uuid not null references users(user_id),
      is_active bool not null default true
    );
  `);
}


export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    drop table otp_logs;

  `);
  await knex.raw(`
    drop table user_sessions;
  `);
  
  await knex.raw(`
    drop table users;
  `);

}

