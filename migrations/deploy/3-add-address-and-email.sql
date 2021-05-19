BEGIN;

    ALTER TABLE "public"."user" RENAME COLUMN "login" TO "email";
    ALTER TABLE "public"."user" RENAME CONSTRAINT "user_id_login_idx" TO "user_email_idx";
    ALTER TABLE "public"."pharmacy" ADD "city" text NOT NULL;
    ALTER TABLE "public"."pharmacy" ADD "province" text NOT NULL;
    ALTER TABLE "public"."pharmacy" ADD CONSTRAINT "pharmacy_cnpj_idx" UNIQUE ("cnpj");
    ALTER TABLE "public"."patient" ADD "city" text NOT NULL;
    ALTER TABLE "public"."patient" ADD "province" text NOT NULL;
    ALTER TABLE "public"."patient" ADD CONSTRAINT "patient_cpf_idx" UNIQUE ("cpf");
    ALTER TABLE "public"."prescription" ADD "external_id" text;
    ALTER TABLE "public"."doctor" ADD "address" text NOT NULL;
    ALTER TABLE "public"."doctor" ADD "city" text NOT NULL;
    ALTER TABLE "public"."doctor" ADD "province" text NOT NULL;
    ALTER TABLE "public"."doctor" ADD CONSTRAINT "doctor_uf_crx_cpf_idx" UNIQUE ("uf_crx", "cpf");
    COMMENT ON COLUMN "public"."pharmacy"."cnpj" IS NULL;
    COMMENT ON COLUMN "public"."patient"."cpf" IS NULL;

COMMIT;