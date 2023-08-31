\c ecommerce;

CREATE TABLE IF NOT EXISTS public."users"(
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "hash_password" TEXT NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL
);
ALTER TABLE "users" ADD PRIMARY KEY("id");
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");

CREATE TABLE IF NOT EXISTS public."users_sessions"(
    "id" SERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "start_login" TIMESTAMP(0) WITHOUT TIME ZONE NULL,
    "end_login" TIMESTAMP(0) WITHOUT TIME ZONE NULL,
    "token" TEXT NOT NULL
);
ALTER TABLE "users_sessions" ADD PRIMARY KEY("id");
ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");

