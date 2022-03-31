BEGIN;

ALTER TABLE "doctor" DROP CONSTRAINT "doctor_uf_crx_cpf_idx"
ALTER TABLE "doctor" DROP COLUMN "address"
ALTER TABLE "doctor" DROP COLUMN "city"
ALTER TABLE "doctor" DROP COLUMN "province"
ALTER TABLE "user" RENAME COLUMN "email" TO "login"
ALTER TABLE "user" RENAME CONSTRAINT "user_email_idx" TO "user_login_idx"
ALTER TABLE "pharmacy" DROP COLUMN "city"
ALTER TABLE "pharmacy" DROP COLUMN "province"
ALTER TABLE "pharmacy" DROP CONSTRAINT "pharmacy_cnpj_idx"
ALTER TABLE "patient" DROP COLUMN "city"
ALTER TABLE "patient" DROP COLUMN "province"
ALTER TABLE "patient" DROP CONSTRAINT "patient_cpf_idx"
ALTER TABLE "prescription" DROP COLUMN "external_id"
COMMENT ON COLUMN "pharmacy"."cnpj" IS NULL
COMMENT ON COLUMN "patient"."cpf" IS NULL

COMMIT;