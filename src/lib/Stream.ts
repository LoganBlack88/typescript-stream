
export class Stream<T> {

    private array: T[];

    private constructor(array: Array<T>) {
        this.array = array;
    }

    public static of<T>(array: Array<T>): Stream<T> {
        return new Stream(array);
    }


}
