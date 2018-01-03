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

    user_id := (SELECT "Id" FROM public."AspNetUsers" LIMIT 1);

    UPDATE public."AspNetUsers" set "IndividualId" = indiv_1;

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

    INSERT INTO public."Gifts"(
        "Description", "EventId", "OwnerId", "PriceInCents", "ReceiverId", "Title")
        VALUES ('a very nice box', evt_1, indiv_1, 254, indiv_1, 'a box');

    INSERT INTO public."Gifts"(
        "Description", "EventId", "OwnerId", "PriceInCents", "ReceiverId", "Title")
        VALUES ('an expensive toy', evt_1, indiv_1, 614, indiv_1, 'a toy');

    INSERT INTO public."Gifts"(
        "Description", "EventId", "OwnerId", "PriceInCents", "ReceiverId", "Title")
        VALUES ('an big bag', evt_1, indiv_1, 157, indiv_1, 'a big bag');

    INSERT INTO public."Gifts"(
        "Description", "EventId", "OwnerId", "PriceInCents", "ReceiverId", "Title")
        VALUES ('an big bag', evt_2, indiv_1, 157, indiv_1, 'a big bag');

    INSERT INTO public."Gifts"(
        "Description", "EventId", "OwnerId", "PriceInCents", "ReceiverId", "Title")
        VALUES ('a very nice box', evt_1, indiv_1, 254, indiv_2, 'a box');

    INSERT INTO public."Gifts"(
        "Description", "EventId", "OwnerId", "PriceInCents", "ReceiverId", "Title")
        VALUES ('an expensive toy', evt_1, indiv_1, 614, indiv_2, 'a toy');

END; $$;