import { FilterOp } from './ops/FilterOp';
import { Optional } from './Optional';
import { Pipeline } from './Pipeline';


export class Stream<T> {

    private array: Array<T>;
    private pipeline: Pipeline;

    private constructor(array: Array<T>) {
        this.array = array;
        this.pipeline = new Pipeline();
    }

    public static of<T>(array: Array<T>): Stream<T> {
        return new Stream(array);
    }

    public filter(predicate: (a: T) => boolean): Stream<T> {
        this.pipeline.add(new FilterOp(predicate));
        return this;
    }

    /*
    public map<R>(mapper: (a: T) => R): Stream<R> {
        //this.pipeline.add(new MapOp(mapper));
        //return new Stream<R>(this.array as Array<R>, this.pipeline);
    }
    */

    //
    // Terminal evaluation methods
    //

    public max(comparator?: (a1: T, a2: T) => number): T {
        let values: Array<T> = this.evaluateAll();
        let max: T = values[0];
        values.forEach((value: T, index: number) => {
            if ((!max || index < 1) || (!comparator && value > max) || (comparator && comparator(value, max) > 0)) {
                max = value;
            }
        });
        return max;
    }

    public min(comparator?: (a1: T, a2: T) => number): T {
        let values: Array<T> = this.evaluateAll();
        let min: T = values[0];
        values.forEach((value: T, index: number) => {
            if ((!min || index < 1) || (!comparator && value < min) || (comparator && comparator(value, min) < 0)) {
                min = value;
            }
        });
        return min;
    }

    public toArray(): Array<T> {
        return this.evaluateAll();
    }


    private evaluateAll(): Array<T> {
        let results: Array<T> = [];
        this.array.forEach((value) => {
            let res: Optional<T> = this.pipeline.evaluate(value);
            if (res.isDefined()) {
                results.push(res.getValue());
            }
        });
        return results;
    }

}