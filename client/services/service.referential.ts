function compareObjFor<T>(convert: (i: T) => string) {
    return function (a: T, b: T) {
        const keyA = convert(a);
        const keyB = convert(b);
        if (keyA < keyB) {
            return -1;
        }
        if (keyA > keyB) {
            return 1;
        }
        return 0;
    }
}

function getEventCompareKey(evt: GT.Event): string {
    return evt.type.toString() + evt.year.toString();
}

export function sortByEvents<T>(events: T[], convert: (i: T) => GT.Event): T[] {
    return events.sort(compareObjFor((i) => getEventCompareKey(convert(i))));
}

export function sortEvents(events: GT.Event[]): GT.Event[] {
    return sortByEvents(events, i => i);
}

function getIndividualCompareKey(indiv: GT.Individual): string {
    return indiv.firstName + indiv.lastName;
}

export function sortByIndividuals<T>(individuals: T[], convert: (i: T) => GT.Individual): T[] {
    return individuals.sort(compareObjFor((i) => getIndividualCompareKey(convert(i))));
}

export function sortIndividuals(individuals: GT.Individual[]): GT.Individual[] {
    return sortByIndividuals(individuals, (i) => i);
}

function showEventType(et: number): GT.EventType {
    return et == 0 ? "Christmas" : "Birthday";
}

export function showEvent(event: GT.Event): string {
    return `${showEventType(event.type)} - ${event.year}`;
}

export function showGiftStatus(gs: GT.GiftStatus): string {
    return gs;
}

export const allGiftStatus: GT.GiftStatus[] = [ "None", "Reserved", "Bought" ];

function groupBy<T, V>(
    coll: T[],
    keyResolver: (o: T) => string,
    valueResolver: (o: T) => V): Record<string, V[]> {
    const result: Record<string, V[]> = {};
    coll.forEach(v => {
        const key = keyResolver(v);
        if (!(key in result)) {
            result[key] = [];
        }
        result[key].push(valueResolver(v));
    })
    return result;
}

export function refreshDataContext(context: GT.DataContext): GT.DataContext {
    return {
        ...context,
        eventGiftsMap: groupBy(Object.values(context.giftMap), g => g.eventId!, g => g.id),
        giftReceiversMap: groupBy(context.giftReceiverPairs, gr => gr[0].toString(), gr => gr[1].toString()),
        receiverGiftsMap: groupBy(context.giftReceiverPairs, gr => gr[1].toString(), gr => gr[0].toString()),
    }
}