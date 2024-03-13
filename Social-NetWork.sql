CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "username" varchar,
  "first_name" varchar,
  "last_name" varchar,
  "email" varchar,
  "birthday" timestamp,
  "gender" integer,
  "phone_number" varchar,
  "address" varchar,
  "avatar" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "posts" (
  "id" integer PRIMARY KEY,
  "caption" varchar,
  "tags" varchar,
  "imageUrl" varchar,
  "user_id" integer,
  "scope" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "like" (
  "id" integer PRIMARY KEY,
  "post_id" integer,
  "user_id" integer,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "comments" (
  "id" integer PRIMARY KEY,
  "content" varchar,
  "post_id" integer,
  "user_id" integer,
  "reply_id" integer,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "saved" (
  "id" integer,
  "user_id" integer,
  "post_id" integer,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "follow" (
  "id" integer,
  "user_id" integer,
  "follow_id" integer,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "groups" (
  "id" integer,
  "name" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "user_in_group" (
  "id" integer,
  "user_id" integer,
  "group_id" integer,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "message" (
  "id" integer,
  "content" varchar,
  "conversation_id" integer,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "conversations" (
  "id" integer,
  "title" varchar,
  "icon" varchar,
  "theme" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "users_in_conversations" (
  "id" integer,
  "conversation_id" integer,
  "user_id" integer,
  "created_at" timestamp,
  "updated_at" timestamp
);

ALTER TABLE "posts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "saved" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "saved" ADD FOREIGN KEY ("post_id") REFERENCES "posts" ("id");

ALTER TABLE "follow" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "follow" ADD FOREIGN KEY ("follow_id") REFERENCES "users" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("post_id") REFERENCES "posts" ("id");

ALTER TABLE "like" ADD FOREIGN KEY ("post_id") REFERENCES "posts" ("id");

ALTER TABLE "like" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_in_group" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_in_group" ADD FOREIGN KEY ("group_id") REFERENCES "groups" ("id");

ALTER TABLE "users_in_conversations" ADD FOREIGN KEY ("conversation_id") REFERENCES "conversations" ("id");

ALTER TABLE "users_in_conversations" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "message" ADD FOREIGN KEY ("conversation_id") REFERENCES "conversations" ("id");
