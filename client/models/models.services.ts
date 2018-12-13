namespace GT {
    export interface ContextService {
        getGift(id: Id): Gift;
        getEvent(id: Id): Event;
        getIndividual(id: Id): Individual;
        getAllGifts(): Gift[];
        getAllEvents(): Event[];
        getAllIndividuals(): Individual[];
        getSortedEvents(): Event[];
        getSortedIndividuals(): Individual[];
        getReceiverIds(giftId: Id): Id[];
        getReceivers(giftId: Id): Individual[];
        getGiftsReceived(indivId: Id): Gift[];
        getCurrentUser(): Individual;
    }
}