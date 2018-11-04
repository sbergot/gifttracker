namespace GT {
    export type Id = string;

    export type KeyMap<T> = {[id: string]: T}

    export type ChildMap = {[id: string]: Id[]}
}