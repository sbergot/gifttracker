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
    DECLARE adegroote int;

    DECLARE group_bergot int;
    DECLARE group_bollengier int;

    DECLARE evt_1 int;
    DECLARE evt_2 int;
    DECLARE evt_3 int;
    DECLARE evt_4 int;

    DECLARE last_gift int;

    BEGIN

    INSERT INTO public."IndividualGroup"(
        "Name")
        VALUES ('Bergot')
    RETURNING "Id" INTO group_bergot;

    INSERT INTO public."IndividualGroup"(
        "Name")
        VALUES ('Bollengier')
    RETURNING "Id" INTO group_bollengier;

    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('Simon', 'Bergot', '1985-05-24')
    RETURNING "Id" INTO sbergot;

    INSERT INTO public."UserMails"(
        "Mail", "IndividualId")
        VALUES ('simon.bergot@gmail.com', sbergot);

    INSERT INTO public."IndividualInGroups"(
        "IndividualId", "GroupId")
        VALUES (sbergot, group_bergot);

    INSERT INTO public."IndividualInGroups"(
        "IndividualId", "GroupId")
        VALUES (sbergot, group_bollengier);

    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('Camille', 'Bollengier', '1985-03-19')
    RETURNING "Id" INTO cabollengier;

    INSERT INTO public."UserMails"(
        "Mail", "IndividualId")
        VALUES ('camille.bollengier@gmail.com', cabollengier);

    INSERT INTO public."IndividualInGroups"(
        "IndividualId", "GroupId")
        VALUES (cabollengier, group_bergot);

    INSERT INTO public."IndividualInGroups"(
        "IndividualId", "GroupId")
        VALUES (cabollengier, group_bollengier);

    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('Mathieu', 'Bergot', '1983-02-24')
    RETURNING "Id" INTO mbergot;

    INSERT INTO public."UserMails"(
        "Mail", "IndividualId")
        VALUES ('mathieu.bergot@gmail.com', mbergot);

    INSERT INTO public."IndividualInGroups"(
        "IndividualId", "GroupId")
        VALUES (mbergot, group_bergot);

    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('David', 'Bergot', '1983-02-24')
    RETURNING "Id" INTO dbergot;

    INSERT INTO public."UserMails"(
        "Mail", "IndividualId")
        VALUES ('david.bergot@gmail.com', dbergot);

    INSERT INTO public."IndividualInGroups"(
        "IndividualId", "GroupId")
        VALUES (dbergot, group_bergot);

    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('Françoise', 'Bergot', '1960-09-19')
    RETURNING "Id" INTO fbergot;

    INSERT INTO public."UserMails"(
        "Mail", "IndividualId")
        VALUES ('francoise.marie.bergot@gmail.com', fbergot);

    INSERT INTO public."IndividualInGroups"(
        "IndividualId", "GroupId")
        VALUES (fbergot, group_bergot);

    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('Jean-Yves', 'Bergot', '1957-07-04')
    RETURNING "Id" INTO jybergot;

    INSERT INTO public."UserMails"(
        "Mail", "IndividualId")
        VALUES ('jeanyves.bergot@gmail.com', jybergot);

    INSERT INTO public."IndividualInGroups"(
        "IndividualId", "GroupId")
        VALUES (jybergot, group_bergot);

    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('Cyrille', 'Bollengier', '1980-01-31')
    RETURNING "Id" INTO cybollengier;

    INSERT INTO public."UserMails"(
        "Mail", "IndividualId")
        VALUES ('cyrille.bollengier@gmail.com', cybollengier);

    INSERT INTO public."IndividualInGroups"(
        "IndividualId", "GroupId")
        VALUES (cybollengier, group_bollengier);

    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('Clément', 'Bollengier', '1988-02-07')
    RETURNING "Id" INTO clbollengier;

    INSERT INTO public."UserMails"(
        "Mail", "IndividualId")
        VALUES ('clement.bollengier@gmail.com', clbollengier);

    INSERT INTO public."IndividualInGroups"(
        "IndividualId", "GroupId")
        VALUES (clbollengier, group_bollengier);

    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('Rose-Marie', 'Bollengier', '1949-01-24')
    RETURNING "Id" INTO rmbollengier;

    INSERT INTO public."UserMails"(
        "Mail", "IndividualId")
        VALUES ('rose.marie.bollengier@gmail.com', rmbollengier);

    INSERT INTO public."IndividualInGroups"(
        "IndividualId", "GroupId")
        VALUES (rmbollengier, group_bollengier);

    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('Marcel', 'Bollengier', '1950-03-13')
    RETURNING "Id" INTO mbollengier;

    INSERT INTO public."UserMails"(
        "Mail", "IndividualId")
        VALUES ('mbollengier@gmail.com', mbollengier);

    INSERT INTO public."IndividualInGroups"(
        "IndividualId", "GroupId")
        VALUES (mbollengier, group_bollengier);

    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('Bérangère', 'Rossi', '1985-03-19')
    RETURNING "Id" INTO brossi;

    INSERT INTO public."UserMails"(
        "Mail", "IndividualId")
        VALUES ('berangere.rossi@gmail.com', brossi);

    INSERT INTO public."IndividualInGroups"(
        "IndividualId", "GroupId")
        VALUES (brossi, group_bergot);

    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('Narelle', 'Henderson', '1987-01-30')
    RETURNING "Id" INTO nhenderson;

    INSERT INTO public."UserMails"(
        "Mail", "IndividualId")
        VALUES ('narelle.henderson@hotmail.com', nhenderson);

    INSERT INTO public."IndividualInGroups"(
        "IndividualId", "GroupId")
        VALUES (nhenderson, group_bergot);

    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('Georgina', 'Bollengier', '1978-05-23')
    RETURNING "Id" INTO gbollengier;

    INSERT INTO public."UserMails"(
        "Mail", "IndividualId")
        VALUES ('georginarivera.sanchez@gmail.com', gbollengier);

    INSERT INTO public."IndividualInGroups"(
        "IndividualId", "GroupId")
        VALUES (gbollengier, group_bollengier);

    INSERT INTO public."Individuals"(
        "FirstName", "LastName", "BirthDay")
        VALUES ('Aurélie', 'Degroote', '1988-04-06')
    RETURNING "Id" INTO adegroote;

    INSERT INTO public."UserMails"(
        "Mail", "IndividualId")
        VALUES ('aurelie.degroote@gmail.com', adegroote);

    INSERT INTO public."IndividualInGroups"(
        "IndividualId", "GroupId")
        VALUES (adegroote, group_bollengier);

    INSERT INTO public."Events"(
        "Type", "Year")
        VALUES (0, 2018)
    RETURNING "Id" INTO evt_1;

    INSERT INTO public."Events"(
        "Type", "Year")
        VALUES (1, 2018)
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
        "Description", "EventId", "OwnerId", "PriceInCents", "Title")
        VALUES ('a very nice box', evt_1, sbergot, 254, 'a box')
    RETURNING "Id" INTO last_gift;

    INSERT INTO public."GiftReceiver"(
        "ReceiverId", "GiftId")
        VALUES (sbergot, last_gift);

    INSERT INTO public."GiftReceiver"(
        "ReceiverId", "GiftId")
        VALUES (cabollengier, last_gift);


    INSERT INTO public."Gifts"(
        "Description", "EventId", "OwnerId", "PriceInCents", "Title")
        VALUES ('an expensive toy', evt_1, sbergot, 614, 'a toy')
    RETURNING "Id" INTO last_gift;

    INSERT INTO public."GiftReceiver"(
        "ReceiverId", "GiftId")
        VALUES (sbergot, last_gift);

    INSERT INTO public."Gifts"(
        "Description", "EventId", "OwnerId", "PriceInCents", "Title")
        VALUES ('an big bag', evt_1, sbergot, 157, 'a big bag')
    RETURNING "Id" INTO last_gift;

    INSERT INTO public."GiftReceiver"(
        "ReceiverId", "GiftId")
        VALUES (sbergot, last_gift);

    INSERT INTO public."Gifts"(
        "Description", "EventId", "OwnerId", "PriceInCents", "Title")
        VALUES ('an big bag', evt_2, sbergot, 157, 'a big bag')
    RETURNING "Id" INTO last_gift;

    INSERT INTO public."GiftReceiver"(
        "ReceiverId", "GiftId")
        VALUES (sbergot, last_gift);

    INSERT INTO public."Gifts"(
        "Description", "EventId", "OwnerId", "PriceInCents", "Title")
        VALUES ('a very nice box', evt_1, sbergot, 254, 'a box')
    RETURNING "Id" INTO last_gift;

    INSERT INTO public."GiftReceiver"(
        "ReceiverId", "GiftId")
        VALUES (cabollengier, last_gift);

    INSERT INTO public."Gifts"(
        "Description", "EventId", "OwnerId", "PriceInCents", "Title")
        VALUES ('an expensive toy', evt_1, sbergot, 614, 'a toy')
    RETURNING "Id" INTO last_gift;

    INSERT INTO public."GiftReceiver"(
        "ReceiverId", "GiftId")
        VALUES (cabollengier, last_gift);

    INSERT INTO public."Gifts"(
        "Description", "EventId", "OwnerId", "PriceInCents", "Title", "IsVisibleToOthers")
        VALUES ('an expensive toy', evt_1, cabollengier, 614, 'a toy', True)
    RETURNING "Id" INTO last_gift;

    INSERT INTO public."GiftReceiver"(
        "ReceiverId", "GiftId")
        VALUES (cabollengier, last_gift);

END; $$;