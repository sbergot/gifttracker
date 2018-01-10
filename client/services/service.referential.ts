import * as lodash from "lodash";

export function sortEvents(events: GT.Event[]): GT.Event[] {
    return sortByEvents(events, i => i);
}

export function sortByEvents<T>(events: T[], convert: (i: T) => GT.Event): T[] {
    return lodash(events)
        .chain()
        .sortBy(e => convert(e).type)
        .sortBy(e => (-convert(e).year))
        .value();
}

export function sortIndividuals(individuals: GT.Individual[]): GT.Individual[] {
    return sortByIndividuals(individuals, (i) => i);
}

export function sortByIndividuals<T>(individuals: T[], convert: (i: T) => GT.Individual): T[] {
    return lodash(individuals)
        .chain()
        .sortBy(i => convert(i).firstName)
        .sortBy(i => convert(i).lastName)
        .value();
}

export function showEventType(et: GT.EventType): string {
    switch(et) {
        case GT.EventType.Birthday:
            return 'Birthday';
        case GT.EventType.Christmas:
            return 'Christmas';
    }
}

export function showEvent(event: GT.Event): string {
    return `${showEventType(event.type)} - ${event.year}`;
}

export function showGiftStatus(gs: GT.GiftStatus): string {
    switch(gs) {
        case GT.GiftStatus.None:
            return 'None';
        case GT.GiftStatus.Reserved:
            return 'Reserved';
        case GT.GiftStatus.Bought:
            return 'Bought';
    }
}

export const allGiftStatus = [ GT.GiftStatus.None, GT.GiftStatus.Reserved, GT.GiftStatus.Bought ];