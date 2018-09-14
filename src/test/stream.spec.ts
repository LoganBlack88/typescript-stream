import { Stream } from '../lib/Stream';
import { expect, assert } from 'chai';


describe('Stream', () => {
    describe('.of()', () => {
        it('should instantiate a new Stream', () => {
            const stream = Stream.of([1,2,3]);
            assert.instanceOf(stream, Stream);
        });
    });

    describe('.filter()', () => {
        it('should only return values for which the predicate returns truthy.', () => {
            const evens = Stream.of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
                                .filter((val: number) => val % 2 === 0)
                                .toArray();

            expect(evens.length).to.equal(5);
            expect(evens).to.have.same.members([2,4,6,8,10]);
        });
    });

    /*
    describe('.map()', () => {
        it('should convert the item value from one type to another', () => {
           const nums: number[] = Stream.of(['1', '2', '3', '4', '5'])
                                        .map((val: string) => parseInt(val))
                                        .toArray();

           expect(nums.length).to.equal(5);
           expect(nums).to.have.same.members([1, 2, 3, 4, 5]);
        });
    });
    */

    describe('.max()', () => {
        it('should return the maximum value using the ">" operator if no comparator is provided', () => {
            const max: number = Stream.of([2,4,5,1,3])
                                      .max();

            expect(max).to.equal(5);
        });
        it('should return the maximum value using a comparator function if one is provided', () => {
            const oldest: {} = Stream.of([{ name: 'Al', age: 30 }, { name: 'Bob', age: 40}, { name: 'Cathy', age: 25 }])
                                     .max((p1, p2) => (p1.age > p2.age) ? 1 : -1);

            expect(oldest).to.deep.equal({ name: 'Bob', age: 40 });
        });
    });

    describe('.min()', () => {
        it('should return the minimum value using the "<" operator if no comparator is provided', () => {
            const max: number = Stream.of([2,4,5,1,3])
                                      .min();

            expect(max).to.equal(1);
        });
        it('should return the minimum value using a comparator function if one is provided', () => {
            const oldest: {} = Stream.of([{ name: 'Al', age: 30 }, { name: 'Bob', age: 40}, { name: 'Cathy', age: 25 }])
                                     .min((p1, p2) => (p1.age > p2.age) ? 1 : -1);

            expect(oldest).to.deep.equal({ name: 'Cathy', age: 25 });
        });
    });

});