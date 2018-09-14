import { Operator } from './Operator';
import { Optional } from '../Optional';

export class FilterOp<T> extends Operator<T> {

    constructor(private predicate: (a: T) => boolean) {
        super();
    }

    public apply(value: T): Optional<T> {
        return (this.predicate(value)) ? Optional.of(value) : Optional.empty();
    }
}