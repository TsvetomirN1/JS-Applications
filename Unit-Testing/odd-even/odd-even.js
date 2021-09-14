const expect = require('chai').expect;

function isOddOrEven(string) {
    if (typeof (string) !== 'string') {
        return undefined;
    }
    if (string.length % 2 === 0) {
        return "even";
    }

    return "odd";
}

describe(' Od or Even', () => {
    it('should return odd', () => {
        expect(isOddOrEven('bbb')).equal('odd');
    });

    it('should return even', () => {
        expect(isOddOrEven('bbba')).equal('even');
    });

    it('should return undefined', () => {
        expect(isOddOrEven(5)).equal(undefined);
        expect(isOddOrEven([])).equal(undefined);
        expect(isOddOrEven({})).equal(undefined);
    });

});
