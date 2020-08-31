interface Dictionary {
    [key: string]: any;
}
export declare function extend<B extends Dictionary, E extends Dictionary>(base: B, extension: E): B & E;
export {};
