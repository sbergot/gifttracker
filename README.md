# Now

## Receveur mutliples

- [x] ajouter table
- [~] implémenter règles de visibilité
- [ ] mettre à jour client (update / display)

## Lien individu/compte

- [x] créer une table UserMail qui lie un mail à un individu
- [ ] à la création du compte, faire le lien

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

## write some documentation

## init data
- [ ] add the younger generation
- [ ] check birthdates

## gestion des individus
Création de groupes d'individus (admin only)
Lien d'apartenance nn entre un individu et un groupe (admin only)

lien de visibilité nn entre un compte et les individus (configurable par le compte en question).
par défaut un compte voit les individus des groupes auxquels il appartient
dans l'interface, les dropdowns ne montrent que les individus visibles pour ce compte

- [ ] créer page d'administration de la visibilité

## gestion des events
- [ ] les events sont administrés par requêtes
- [ ] lien de visibilité nn entre un compte et les events (configurable par le compte en question).
- [ ] par défaut un compte voit les events de l'année courante
- [ ] dans l'interface, les dropdowns ne montrent que les events visibles pour ce compte


## layout général
- [ ] display user name at the top

## vue personne
timeline des cadeaux offerts à cette personne (par tout le monde)

## vue évennements
liste des prochaines occurences avec la liste des personnes concernées et les idées cadeaux associées. Chanque cadeau n'est représenté que par son lien et son titre. Il est possible de supprimer, d'ajouter, ou d'éditer les cadeaux, ou simplement de suivre le lien. Il est possible d'aller sur la page d'une personne en cliquant sur son nom.

- [ ] naviguer vers la page d'une personne

## édition cadeaux
- [ ] valider les entrées du formulaire (prix, url?)

## autres
pouvoir filtrer sur mes idées ou les idées des autres

