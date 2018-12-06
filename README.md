# Now

## layout général
- [ ] display user name at the top
- [ ] use tile to display gifts
- [ ] no-gift icon
- [ ] mean price per person for an event
- [ ] rework menu (event view, individual view, manage screen (with indiv visibility admin))

## Gestion des droits

flag sur une idée de cadeau: permettre aux autres de voir l'idée (sauf destinataire)
Seul l'owner peut modifier le flag. L'owner voit toujours l'idée.
Ceux qui peuvent voir l'idée ne peuvent pas la modifier.

- [x] créer les flags sur la table gift (VisibleToOthers)
- [~] implémenter les règles de visibilité
- [ ] si on veut éditer une idée et que l'on n'est pas owner, la modale s'affiche en désactivée
- [ ] afficher le owner de l'idée dans la boîte d'édition
- [ ] corriger erreur forbidden qui donne redirect/404 ??
- [ ] permettre à l'owner de modifier les flags dans l'édition de l'idée

# Next

## improve typeahead
- [ ] up/down arrows to select entries
- [ ] tab key to validate
- [ ] by default the first entry is selected

# fix entity framework warning
query run locally :-(

## write some documentation

## filter gifts
- [ ] pouvoir filtrer sur mes idées ou les idées des autres

## init data
- [ ] add the younger generation
- [ ] check birthdates

## vue personne
timeline des cadeaux offerts à cette personne (par tout le monde)

## vue évennements

liste des prochaines occurences avec la liste des personnes concernées et les
idées cadeaux associées. Chanque cadeau n'est représenté que par son lien et
son titre. Il est possible de supprimer, d'ajouter, ou d'éditer les cadeaux, ou
simplement de suivre le lien. Il est possible d'aller sur la page d'une
personne en cliquant sur son nom.

- [ ] naviguer vers la page d'une personne

## édition cadeaux
- [ ] valider les entrées du formulaire (prix, url?)

## SAGA: cadeaux par tirage au sort

Sur un évennement et un groupe de personne données, permettre de faire un
tirage au sort pour décider de qui doit trouver un cadeau pour qui.

## individual visibility administration
- [ ] list of all members of which the user is a member
- [ ] checkbox for each individual. When checked, a visibility link is inserted. It is removed when unchecked
