DO $$
    DECLARE sbergot int;
    DECLARE cabollengier int;
    DECLARE mbergot int;
    DECLARE dbergot int;
    DECLARE fbergot int;
    DECLARE jybergot int;
    DECLARE cybollengier int;
    DECLARE clbollengier int;
    DECLARE mbollengier int;
    DECLARE rmbollengier int;
    DECLARE brossi int;
    DECLARE nhenderson int;
    DECLARE gbollengier int;
    DECLARE adegroot int;
    DECLARE evt_1 int;
    DECLARE evt_2 int;
    DECLARE evt_3 int;
    DECLARE evt_4 int;
    BEGIN

    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('Simon', 'Bergot', '1985-05-24')
    RETURNING "Id" INTO sbergot;

    INSERT INTO public."UserMails"(
        "Mail", "IndividualId")
        VALUES ('simon.bergot@gmail.com', sbergot);

    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('Camille', 'Bollengier', '1985-03-19')
    RETURNING "Id" INTO cabollengier;

    INSERT INTO public."UserMails"(
        "Mail", "IndividualId")
        VALUES ('camille.bollengier@gmail.com', cabollengier);

    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('Mathieu', 'Bergot', '1983-02-24')
    RETURNING "Id" INTO mbergot;

    INSERT INTO public."UserMails"(
        "Mail", "IndividualId")
        VALUES ('mathieu.bergot@gmail.com', mbergot);

    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('David', 'Bergot', '1983-02-24')
    RETURNING "Id" INTO dbergot;

    INSERT INTO public."UserMails"(
        "Mail", "IndividualId")
        VALUES ('david.bergot@gmail.com', dbergot);

    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('Françoise', 'Bergot', '1960-09-19')
    RETURNING "Id" INTO fbergot;

    INSERT INTO public."UserMails"(
        "Mail", "IndividualId")
        VALUES ('francoise.marie.bergot@gmail.com', fbergot);

    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('Jean-Yves', 'Bergot', '1957-07-04')
    RETURNING "Id" INTO jybergot;

    INSERT INTO public."UserMails"(
        "Mail", "IndividualId")
        VALUES ('jeanyves.bergot@gmail.com', jybergot);

    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('Cyrille', 'Bollengier', '1980-01-31')
    RETURNING "Id" INTO cybollengier;

    INSERT INTO public."UserMails"(
        "Mail", "IndividualId")
        VALUES ('cyrille.bollengier@gmail.com', cybollengier);

    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('Clément', 'Bollengier', '1988-02-07')
    RETURNING "Id" INTO clbollengier;

    INSERT INTO public."UserMails"(
        "Mail", "IndividualId")
        VALUES ('clement.bollengier@gmail.com', clbollengier);

    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('Rose-Marie', 'Bollengier', '1949-01-24')
    RETURNING "Id" INTO rmbollengier;

    INSERT INTO public."UserMails"(
        "Mail", "IndividualId")
        VALUES ('rose.marie.bollengier@gmail.com', rmbollengier);

    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('Marcel', 'Bollengier', '1950-03-13')
    RETURNING "Id" INTO mbollengier;

    INSERT INTO public."UserMails"(
        "Mail", "IndividualId")
        VALUES ('mbollengier@gmail.com', mbollengier);

    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('Bérangère', 'Rossi', '1985-03-19')
    RETURNING "Id" INTO brossi;

    INSERT INTO public."UserMails"(
        "Mail", "IndividualId")
        VALUES ('berangere.rossi@gmail.com', brossi);

    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('Narelle', 'Henderson', '1987-01-30')
    RETURNING "Id" INTO nhenderson;

    INSERT INTO public."UserMails"(
        "Mail", "IndividualId")
        VALUES ('narelle.henderson@hotmail.com', nhenderson);

    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('Georgina', 'Bollengier', '1978-05-23')
    RETURNING "Id" INTO gbollengier;

    INSERT INTO public."UserMails"(
        "Mail", "IndividualId")
        VALUES ('georginarivera.sanchez@gmail.com', gbollengier);

    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('Aurélie', 'Degroote', '1988-04-06')
    RETURNING "Id" INTO adegroot;

    INSERT INTO public."UserMails"(
        "Mail", "IndividualId")
        VALUES ('aurelie.degroote@gmail.com', adegroot);

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
        VALUES ('a very nice box', evt_1, sbergot, 254, sbergot, 'a box');

    INSERT INTO public."Gifts"(
        "Description", "EventId", "OwnerId", "PriceInCents", "ReceiverId", "Title")
        VALUES ('an expensive toy', evt_1, sbergot, 614, sbergot, 'a toy');

    INSERT INTO public."Gifts"(
        "Description", "EventId", "OwnerId", "PriceInCents", "ReceiverId", "Title")
        VALUES ('an big bag', evt_1, sbergot, 157, sbergot, 'a big bag');

    INSERT INTO public."Gifts"(
        "Description", "EventId", "OwnerId", "PriceInCents", "ReceiverId", "Title")
        VALUES ('an big bag', evt_2, sbergot, 157, sbergot, 'a big bag');

    INSERT INTO public."Gifts"(
        "Description", "EventId", "OwnerId", "PriceInCents", "ReceiverId", "Title")
        VALUES ('a very nice box', evt_1, sbergot, 254, cabollengier, 'a box');

    INSERT INTO public."Gifts"(
        "Description", "EventId", "OwnerId", "PriceInCents", "ReceiverId", "Title")
        VALUES ('an expensive toy', evt_1, sbergot, 614, cabollengier, 'a toy');

END; $$;