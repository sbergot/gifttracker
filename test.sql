DO $$ BEGIN
    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('Michael', 'Keaton', '1984-06-18');

    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('John', 'Smith', '1985-05-24');

    INSERT INTO public."Events"(
        "Type", "Year")
        VALUES (0, 2016);

    INSERT INTO public."Events"(
        "Type", "Year")
        VALUES (1, 2016);

    INSERT INTO public."Events"(
        "Type", "Year")
        VALUES (0, 2017);

    INSERT INTO public."Events"(
        "Type", "Year")
        VALUES (1, 2017);
END; $$;