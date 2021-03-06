var circular_buffer = (function (exports) {
    'use strict';

    const version = '0.15.6';

    class circular_buffer {
        constructor(uCapacity) {
            if (!(Number.isInteger(uCapacity))) {
                throw new RangeError(`Capacity must be an integer, received ${uCapacity}`);
            }
            if (uCapacity < 1) {
                throw new RangeError(`Capacity must be a positive integer, received ${uCapacity}`);
            }
            this._values = new Array(uCapacity);
            this._capacity = uCapacity;
            this._cursor = 0;
            this._length = 0;
        }
        capacity() { return this._capacity; }
        length() { return this._length; }
        available() { return this._capacity - this._length; }
        empty() { return this._length === 0; }
        full() { return this._length === this._capacity; }
        push(v) {
            if (this._length >= this._capacity) {
                throw new RangeError(`Cannot push, structure is full to capacity`);
            }
            this._values[(this._cursor + this._length++) % this._capacity] = v;
            return v;
        }
        pop() {
            if (this._length <= 0) {
                throw new RangeError(`Cannot pop, structure is empty`);
            }
            --this._length;
            if (this._cursor >= this._capacity) {
                this._cursor -= this._capacity;
            }
            return this._values[(this._cursor++) % this._capacity];
        }
        at(i) {
            if (i < 0) {
                throw new RangeError(`circular_buffer does not support negative traversals; called at(${i})`);
            }
            if (!(Number.isInteger(i))) {
                throw new RangeError(`Accessors must be non-negative integers; called at(${i})`);
            }
            if (i >= this._capacity) {
                throw new RangeError(`Requested cell ${i} exceeds container permanent capacity`);
            }
            if (i >= this._length) {
                throw new RangeError(`Requested cell ${i} exceeds container current length`);
            }
            return this._values[(this._cursor + i) % this._capacity];
        }
    }

    exports.circular_buffer = circular_buffer;
    exports.version = version;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}));
