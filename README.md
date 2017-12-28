# Now

# lien account / individu
- [ ] créer fonction getcurrentindividu basée sur le lien user/individu et getcurrentuser
- [ ] migrer lien gift owner vers l'individu. Migrer les controllers qui se basent sur ce lien.
- [ ] alimenter le lien individu vers user dans le script init
- [ ] ajouter la liste de mails dans l'individu
- [ ] alimenter le lien individu vers user à la création du compte

## status sur le cadeau
ajouter un statut "acheté" ou "pris par" avec un lien vers un individu acheteur

- [ ] enum gift status (None/Reserved/Bought)
- [ ] gift link to individual_id "Buyer"
- [ ] edit status + link in the gift edit modal

# Next

## vue personne
timeline des cadeaux offerts à cette personne (par tout le monde)

## vue évennements
liste des prochaines occurences avec la liste des personnes concernées et les idées cadeaux associées. Chanque cadeau n'est représenté que par son lien et son titre. Il est possible de supprimer, d'ajouter, ou d'éditer les cadeaux, ou simplement de suivre le lien. Il est possible d'aller sur la page d'une personne en cliquant sur son nom.

- [ ] naviguer vers la page d'une personne

## gestion des individus
- [ ] Création de groupes d'individus (admin only)
- [ ] Lien d'apartenance nn entre un individu et un groupe (admin only)
- [ ] Chaque individu a une liste de mails connus (admin). Pas de doublon possible dans la liste complète de mails
- [ ] A la création du compte, le compte est rattaché à un individu connu selon le mail
- [ ] lien de visibilité nn entre un compte et les individus (configurable par le compte en question).
- [ ] par défaut un compte voit les individus des groupes auxquels il appartient
- [ ] dans l'interface, les dropdowns ne montrent que les individus visibles pour ce compte

## gestion des events
- [ ] les events sont administrés par requêtes
- [ ] lien de visibilité nn entre un compte et les events (configurable par le compte en question).
- [ ] par défaut un compte voit les events de l'année courante
- [ ] dans l'interface, les dropdowns ne montrent que les events visibles pour ce compte

## Gestion des droits
flags sur un cadeau (ou sur un lien user / individu?):
- permettre au destinataire de voir l'idée
- permettre aux autres de voir l'idée

L'owner voit toujours l'idée

## édition cadeaux
- [ ] valider les entrées du formulaire (prix, url?)

## autres
pouvoir lister les cadeaux pour une personne
pouvoir filtrer sur mes idées ou les idées des autres
détection de doublons avec un cadeau passé ou une idée de cadeaux
