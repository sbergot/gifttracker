interface ArrayDiff<T> {
    added: T[];
    removed: T[]
}

function computeMissing<T>(reference: T[], candidate: T[]): T[] {
    const newMap: Record<string, boolean> = {};
    candidate.forEach((elt) => {
        newMap[elt.toString()] = true;
    });

    return reference.filter((elt) => {
        return !(elt.toString() in newMap);
    });
}

export function diffArray<T>(oldArray: T[], newArray: T[]): ArrayDiff<T> {
    const removed: T[] = computeMissing(oldArray, newArray);
    const added: T[] = computeMissing(newArray, oldArray);
    return { added, removed };
}