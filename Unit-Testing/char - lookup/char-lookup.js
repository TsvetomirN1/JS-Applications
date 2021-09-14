function lookupChar(string, index) {
    if (typeof (string) !== 'string' || !Number.isInteger(index)) {
        return undefined;
    }
    if (string.length <= index || index < 0) {
        return "Incorrect index";
    }

    return string.charAt(index);
}

const expect = require('chai').expect;

describe(' Main', () => {
    describe(' Invalid parameters', () => {
        it('should return undefined for non-string first param', () => {
            expect(lookupChar(null, 0)).equal(undefined);
        });

        it('should return undefined for non-string second param', () => {
            expect(lookupChar('seagull', '1')).equal(undefined);
        });

        it('should return undefined for non-integer second param', () => {
            expect(lookupChar('seagull', 3.14)).equal(undefined);
        });

    });

    describe(' Out of range', () => {
        it('should return undefined below zero', () => {
            expect(lookupChar('seagull', -1)).equal('Incorrect index');
        });

        it('should return undefined below zero', () => {
            expect(lookupChar('seagull', 7)).equal('Incorrect index');
        });

    });

    describe(' happy path', () => {
        it('should return s', () => {
            expect(lookupChar('seagull', 0)).equal('s');
        });

        it('should return g', () => {
            expect(lookupChar('seagull', 3)).equal('g');
        });

    });


});
