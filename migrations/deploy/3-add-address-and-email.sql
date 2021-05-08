BEGIN;

    ALTER TABLE "user" RENAME COLUMN "login" TO "email";
    ALTER TABLE "user" RENAME CONSTRAINT "user_id_login_idx" TO "user_email_idx";
    ALTER TABLE "pharmacy" ADD "city" text NOT NULL;
    ALTER TABLE "pharmacy" ADD "province" text NOT NULL;
    ALTER TABLE "pharmacy" ADD CONSTRAINT "pharmacy_cnpj_idx" UNIQUE ("cnpj");
    ALTER TABLE "patient" ADD "city" text NOT NULL;
    ALTER TABLE "patient" ADD "province" text NOT NULL;
    ALTER TABLE "patient" ADD CONSTRAINT "patient_cpf_idx" UNIQUE ("cpf");
    ALTER TABLE "prescription" ADD "external_id" text;
    ALTER TABLE "doctor" ADD "address" text NOT NULL;
    ALTER TABLE "doctor" ADD "city" text NOT NULL;
    ALTER TABLE "doctor" ADD "province" text NOT NULL;
    ALTER TABLE "doctor" ADD CONSTRAINT "doctor_uf_crx_cpf_idx" UNIQUE ("uf_crx", "cpf");
    COMMENT ON COLUMN "pharmacy"."cnpj" IS NULL;
    COMMENT ON COLUMN "patient"."cpf" IS NULL;

COMMIT;