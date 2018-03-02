import * as lodash from "lodash";
import { GiftStatus, EventType } from '../models/enums';

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

export function showEventType(et: EventType): string {
    switch(et) {
        case EventType.Birthday:
            return 'Birthday';
        case EventType.Christmas:
            return 'Christmas';
    }
}

export function showEvent(event: GT.Event): string {
    return `${showEventType(event.type)} - ${event.year}`;
}

export function showGiftStatus(gs: GiftStatus): string {
    switch(gs) {
        case GiftStatus.None:
            return 'None';
        case GiftStatus.Reserved:
            return 'Reserved';
        case GiftStatus.Bought:
            return 'Bought';
    }
}

export const allGiftStatus = [ GiftStatus.None, GiftStatus.Reserved, GiftStatus.Bought ];