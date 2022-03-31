BEGIN;

    SELECT 1 FROM public."user";
    SELECT 1 FROM public."doctor";
    SELECT 1 FROM public."patient";
    SELECT 1 FROM public."pharmacy";

ROLLBACK;