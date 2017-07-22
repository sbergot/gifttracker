DO $$
    DECLARE user_id TEXT;
    DECLARE indiv_1 int;
    DECLARE indiv_2 int;
    DECLARE evt_1 int;
    DECLARE evt_2 int;
    DECLARE evt_3 int;
    DECLARE evt_4 int;
    BEGIN
    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('Michael', 'Keaton', '1984-06-18')
    RETURNING "Id" INTO indiv_1;

    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('John', 'Smith', '1985-05-24')
    RETURNING "Id" INTO indiv_2;

    INSERT INTO public."Events"(
        "Type", "Year")
        VALUES (0, 2016)
    RETURNING "Id" INTO evt_1;

    INSERT INTO public."Events"(
        "Type", "Year")
        VALUES (1, 2016)
    RETURNING "Id" INTO evt_2;

    INSERT INTO public."Events"(
        "Type", "Year")
        VALUES (0, 2017)
    RETURNING "Id" INTO evt_3;

    INSERT INTO public."Events"(
        "Type", "Year")
        VALUES (1, 2017)
    RETURNING "Id" INTO evt_4;

    user_id := (SELECT "Id" FROM public."AspNetUsers" LIMIT 1);

    INSERT INTO public."Gifts"(
        "Description", "EventId", "OwnerId", "PriceInCents", "ReceiverId", "Title")
        VALUES ('a description', evt_1, user_id, 54, indiv_1, 'a title');
END; $$;