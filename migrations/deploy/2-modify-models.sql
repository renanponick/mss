BEGIN;

ALTER TABLE "prescription" DROP CONSTRAINT "prescription_doctor_id_fkey";
ALTER TABLE "prescription" DROP CONSTRAINT "prescription_patient_id_fkey";
ALTER TABLE "prescription" ALTER COLUMN "doctor_id" DROP NOT NULL;
ALTER TABLE "prescription" ALTER COLUMN "patient_id" DROP NOT NULL;
ALTER TABLE "prescription"
    ADD CONSTRAINT "prescription_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE;
ALTER TABLE "prescription"
    ADD CONSTRAINT "prescription_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE;
COMMENT ON COLUMN "prescription"."doctor_id" IS NULL;
COMMENT ON COLUMN "prescription"."patient_id" IS NULL;

COMMIT;