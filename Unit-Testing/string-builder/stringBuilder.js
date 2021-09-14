class StringBuilder {
    constructor(string) {
        if (string !== undefined) {
            StringBuilder._vrfyParam(string);
            this._stringArray = Array.from(string);
        } else {
            this._stringArray = [];
        }
    }

    append(string) {
        StringBuilder._vrfyParam(string);
        for (let i = 0; i < string.length; i++) {
            this._stringArray.push(string[i]);
        }
    }
    prepend(string) {
        StringBuilder._vrfyParam(string);
        for (let i = string.length - 1; i >= 0; i--) {
            this._stringArray.unshift(string[i]);
        }
    }

    insertAt(string, startIndex) {
        StringBuilder._vrfyParam(string);
        this._stringArray.splice(startIndex, 0, ...string);
    }

    remove(startIndex, length) {
        this._stringArray.splice(startIndex, length);
    }

    static _vrfyParam(param) {
        if (typeof param !== 'string') throw new TypeError('Argument must be string');
    }

    toString() {
        return this._stringArray.join('');
    }
}

let expect = require('chai').expect;

describe('Test StringBuilder class', function () {
    it('Has initial param', function () {
        expect(StringBuilder.prototype.hasOwnProperty('append')).to.be.equal(true);
        expect(StringBuilder.prototype.hasOwnProperty('prepend')).to.be.equal(true);
        expect(StringBuilder.prototype.hasOwnProperty('insertAt')).to.be.equal(true);
        expect(StringBuilder.prototype.hasOwnProperty('remove')).to.be.equal(true);
        expect(StringBuilder.prototype.hasOwnProperty('toString')).to.be.equal(true);
    });

    it('If param is undefined should return obj with empty arr', function () {
        let str = new StringBuilder();
        expect(str._stringArray.length).to.be.equal(0);
    });


    it('_stringArray must be array ', function () {
        let str = new StringBuilder();
        expect(Array.isArray(str._stringArray)).to.be.equal(true);
    });

    it('Should return not empty arr if passed param is not undefined', function () {
        let str = new StringBuilder('test');
        expect(str._stringArray.length).to.be.equal(4);
    });

    it('Should throw error if param is not string type', function () {
        let str = new StringBuilder();
        let willThrow = () => str.append(5);
        expect(willThrow).to.throw();
    });

    it('Test append function', function () {
        let str = new StringBuilder('str');
        str.append('newStr');
        expect(str._stringArray.join('')).to.be.equal('strnewStr');
    });

    it('Test prepend function', function () {
        let str = new StringBuilder('str');
        str.prepend('newStr');
        expect(str._stringArray.join('')).to.be.equal('newStrstr');
    });

    it('Test insertAt function', function () {
        let str = new StringBuilder('s');
        str.insertAt('st', 0);
        expect(str._stringArray.join('')).to.be.equal('sts');
        expect(str._stringArray.length).to.be.equal(3);
    });

    it('Test remove function', function () {
        let str = new StringBuilder('str');
        str.remove(0, 2);
        expect(str._stringArray.join('')).to.be.equal('r');
    });

    it('Test toString function', function () {
        let str = new StringBuilder('str');
        str.append('newStr');
        str.remove(0, 1);
        str.append('testnewstr');
        expect(str.toString()).to.be.equal('trnewStrtestnewstr');
    });
});
