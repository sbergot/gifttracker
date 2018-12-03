interface ArrayDiff<T> {
    added: T[];
    removed: T[]
}

function computeMissing<T>(reference: T[], candidate: T[]): T[] {
    const oldMap: Record<string, boolean> = {};
    reference.forEach((elt) => {
        oldMap[elt.toString()] = true;
    });

    return candidate.filter((elt) => {
        return !(elt.toString() in oldMap);
    });
}

export function diffArray<T>(oldArray: T[], newArray: T[]): ArrayDiff<T> {
    const removed: T[] = computeMissing(oldArray, newArray);
    const added: T[] = computeMissing(newArray, oldArray);
    return { added, removed };
}