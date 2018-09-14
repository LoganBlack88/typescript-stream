import { Optional } from './Optional';
import { Operator } from './ops/Operator';

export class Pipeline {

    private operators: Array<Operator<any>>;

    constructor() {
        this.operators = [];
    }

    public add<T>(operator: Operator<T>) {
        this.operators.push(operator);
    }

    public evaluate<T>(value: T): Optional<T> {
        let result = Optional.of(value);
        for (let i = 0; i < this.operators.length; i++) {
            if (!result.isDefined()) {
                break;
            }
            result = this.operators[i].apply(result.getValue());
        }
        return result;
    }
}