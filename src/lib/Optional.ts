
export class Optional<T> {

    private value: T;

    private constructor(value: T) {
        this.value = value;
    }

    public static empty<undefined>(): Optional<undefined> {
        return new Optional(undefined);
    }

    public static of<T>(value: T): Optional<T> {
        return new Optional(value);
    }

    public isDefined(): boolean {
        return this.value !== undefined;
    }

    public getValue(): T {
        return this.value;
    }

}
