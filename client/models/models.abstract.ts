namespace GT {
    export type Id = string;

    export type KeyMap<T> = {[id: string]: T}

    export type ChildMap = {[id: string]: Id[]}

    export interface Field<TO, TV> {
        label: string;
        key: keyof TO;
        value: TV;
    }
}