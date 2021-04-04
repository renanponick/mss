BEGIN;

--
-- PostgreSQL database dump
--

-- Dumped from database version 10.4 (Debian 10.4-2.pgdg90+1)
-- Dumped by pg_dump version 10.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: saas; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA IF NOT EXISTS public;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;

SET default_tablespace = '';

SET default_with_oids = false;

CREATE TABLE "public"."pharmacy" (
    "id" uuid NOT NULL DEFAULT public.uuid_generate_v1mc(),
    "user_id" uuid NOT NULL,
    "social_name" text NOT NULL,
    "cnpj" text NOT NULL,
    "address" text NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT "REL_672832178b734bba48fe9438ed" UNIQUE ("user_id"),
    CONSTRAINT "pharmacy_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."user" (
    "id" uuid NOT NULL DEFAULT public.uuid_generate_v1mc(),
    "login" text NOT NULL,
    "password" text NOT NULL,
    "is_active" boolean NOT NULL DEFAULT true,
    "type" text NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."patient" (
    "id" uuid NOT NULL DEFAULT public.uuid_generate_v1mc(),
    "user_id" uuid NOT NULL,
    "name" text NOT NULL,
    "cpf" text NOT NULL,
    "address" text NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT "REL_f20f0bf6b734938c710e12c278" UNIQUE ("user_id"),
    CONSTRAINT "patient_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."prescription" (
    "id" uuid NOT NULL DEFAULT public.uuid_generate_v1mc(),
    "composed" text NOT NULL,
    "dosage" text NOT NULL,
    "times_day" integer NOT NULL,
    "note" text NOT NULL,
    "validity" TIMESTAMP WITH TIME ZONE NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "doctor_id" uuid NOT NULL,
    "patient_id" uuid NOT NULL,
    "pharmacy_id" uuid,
    CONSTRAINT "prescription_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."doctor" (
    "id" uuid NOT NULL DEFAULT public.uuid_generate_v1mc(),
    "user_id" uuid NOT NULL,
    "name" text NOT NULL,
    "crx" text NOT NULL,
    "uf_crx" text NOT NULL,
    "cpf" text NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT "REL_a685e79dc974f768c39e5d1228" UNIQUE ("user_id"),
    CONSTRAINT "doctor_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "public"."pharmacy"
    ADD CONSTRAINT "pharmacy_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE;
ALTER TABLE "public"."patient"
    ADD CONSTRAINT "patient_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE;
ALTER TABLE "public"."prescription" 
    ADD CONSTRAINT "prescription_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "public"."doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE;
ALTER TABLE "public"."prescription"
    ADD CONSTRAINT "prescription_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "public"."patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE;
ALTER TABLE "public"."prescription"
    ADD CONSTRAINT "prescription_pharmacy_id_fkey" FOREIGN KEY ("pharmacy_id") REFERENCES "public"."pharmacy"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE;
ALTER TABLE "public"."doctor"
    ADD CONSTRAINT "doctor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE;

--
-- PostgreSQL database dump complete
--

COMMIT;