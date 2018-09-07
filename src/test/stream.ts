import {Stream} from '../lib/Stream';
import {expect, assert} from 'chai';


describe('Stream', () => {
    describe('of()', () => {
        it('should instantiate a new Stream', () => {
            const stream = Stream.of([1,2,3]);
            assert.instanceOf(stream, Stream);
        });
    });


});