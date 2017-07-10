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

INSERT INTO public."Gifts"(
	"Title",
	"Description",
	"PriceInCents",
	"OwnerId",
	"ReceiverId",
	"EventId")
SELECT
	'test 1 ',
	'bla bla bla',
	58,
	"AspNetUsers"."Id",
	2,
	1
FROM "AspNetUsers" WHERE "Email" = 'simon.bergot@gmail.com'
FROM "Individuals" WHERE "Name" = 'Smith'

INSERT INTO public."Gifts"(
	"Title",
	"Description",
	"PriceInCents",
	"OwnerId",
	"ReceiverId",
	"EventId")
SELECT
	'test 1 ',
	'bla bla bla',
	58,
	"AspNetUsers"."Id",
	2,
	1
FROM "AspNetUsers" WHERE "Email" = 'simon.bergot@gmail.com'
FROM "Individuals" WHERE "Name" = 'Smith'

INSERT INTO public."Gifts"(
	"Title",
	"Description",
	"PriceInCents",
	"OwnerId",
	"ReceiverId",
	"EventId")
SELECT
	'test 1 ',
	'bla bla bla',
	58,
	"AspNetUsers"."Id",
	2,
	1
FROM "AspNetUsers" WHERE "Email" = 'simon.bergot@gmail.com'
FROM "Individuals" WHERE "Name" = 'Smith'
