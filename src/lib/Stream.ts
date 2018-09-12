
export class Stream<T> {

    private array: Array<T>;


    private constructor(array: Array<T>) {
        this.array = array;
    }

    public static of<T>(array: Array<T>): Stream<T> {
        return new Stream(array);
    }

    public filter(predicate: (a: T) => boolean): Stream<T> {
        const results: T[] = [];
        this.array.forEach((value: T) => {
            if (predicate(value)) {
                results.push(value);
            }
        });
        return new Stream(results);
    }

    public map<R>(mapper: (a: T) => R): Stream<R> {
        const results: R[] = [];
        this.array.forEach((item: T, index: number, array: T[]) => {
            results.push(mapper(item));
        });
        return new Stream(results);
    }

    public max(comparator?: (a1: T, a2: T) => number): T {
        let max: T = this.array[0];
        this.array.forEach((value: T, index: number) => {
            if ((!max || index < 1)
                || (!comparator && value > max)
                || (comparator && comparator(value, max) > 0)) {
                max = value;
            }
        });
        return max;
    }

    public min(comparator?: (a1: T, a2: T) => number): T {
        let min: T = this.array[0];
        this.array.forEach((value: T, index: number) => {
            if ((!min || index < 1)
                || (!comparator && value < min)
                || (comparator && comparator(value, min) < 0)) {
                min = value;
            }
        });
        return min;
    }

    public toArray(): Array<T> {
        return this.array;
    }

}
