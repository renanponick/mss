BEGIN;

    ALTER TABLE "user" ADD CONSTRAINT "user_id_login_idx" UNIQUE ("login");

COMMIT;