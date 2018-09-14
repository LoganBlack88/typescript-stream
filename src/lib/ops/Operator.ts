import { Optional } from '../Optional';

export abstract class Operator<T> {

    abstract apply(value: T): Optional<T>;

}