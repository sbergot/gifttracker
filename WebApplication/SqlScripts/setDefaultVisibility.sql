insert into "IndividualVisibility"
select distinct
    a."IndividualId" as ViewerId,
    b."IndividualId" as ViewedId
from "IndividualInGroups" a
inner join "IndividualInGroups" b on
    a."GroupId" = b."GroupId" and
    b."IndividualId" != a."IndividualId"