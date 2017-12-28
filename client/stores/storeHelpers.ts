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