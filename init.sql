INSERT INTO public."Individuals"(
	"FirstName", "LastName", "BirthDay")
	VALUES ('John', 'Smith', '1985-05-24');

INSERT INTO public."Individuals"(
	"FirstName", "LastName", "BirthDay")
	VALUES ('John', 'Smith', '1985-05-24');

INSERT INTO public."Events"(
	"Type", "Year")
	VALUES (0, 2016);

INSERT INTO public."Events"(
	"Type", "Year")
	VALUES (1, 2016);

INSERT INTO public."Gifts"(
	"Title", "Description", "PriceInCents", "OwnerId", "ReceiverId", "EventId")
	VALUES ('test 1 ', 'bla bla bla', 58, 1, 2, 1)