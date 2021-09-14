let mathEnforcer = {
    addFive: function (num) {
        if (typeof (num) !== 'number') {
            return undefined;
        }
        return num + 5;
    },
    subtractTen: function (num) {
        if (typeof (num) !== 'number') {
            return undefined;
        }
        return num - 10;
    },
    sum: function (num1, num2) {
        if (typeof (num1) !== 'number' || typeof (num2) !== 'number') {
            return undefined;
        }
        return num1 + num2;
    }
};

const expect = require('chai').expect;

describe('mathEnforcer', function () {
    describe('Add five', function () {
        it('Incorrect number', function () {
            expect(mathEnforcer.addFive('1')).to.equal(undefined);
        });
        it('Number is decimal', function () {
            expect(mathEnforcer.addFive(0.1)).to.equal(5.1);
        });
        it('Number is integer', function () {
            expect(mathEnforcer.addFive(1)).to.equal(6);
        });
        it('Number is equal to 0', function () {
            expect(mathEnforcer.addFive(0)).to.equal(5);
        });
        it('Number is negative', function () {
            expect(mathEnforcer.addFive(-10)).to.equal(-5);
        });

    });

    describe('subtractTen', function () {
        it('Incorrect number', function () {
            expect(mathEnforcer.subtractTen('10')).to.equal(undefined);
        });
        it('Number is decimal and lower', function () {
            expect(mathEnforcer.subtractTen(0.1)).to.equal(-9.9);
        });
        it('Number is decimal and bigger', function () {
            expect(mathEnforcer.subtractTen(10.5)).to.equal(0.5);
        });
        it('Number is equal to 10', function () {
            expect(mathEnforcer.subtractTen(10)).to.equal(0);
        });
        it('Number is less than 10', function () {
            expect(mathEnforcer.subtractTen(1)).to.equal(-9);
        });
        it('Number is bigger than 10', function () {
            expect(mathEnforcer.subtractTen(11)).to.equal(1);
        });
        it('Number is negative',function(){
            expect(mathEnforcer.subtractTen(-1)).to.equal(-11);
        });

    });

    describe('sum', function () {
        it('Incorrect num1', function () {
            expect(mathEnforcer.sum('1', 1)).to.equal(undefined);
        });
        it('Incorrect num2', function () {
            expect(mathEnforcer.sum(1, '1')).to.equal(undefined);
        });
        it('Two negative numbers', function () {
            expect(mathEnforcer.sum(-1, -2)).to.equal(-3);
        });
        it('Two positive numbers', function () {
            expect(mathEnforcer.sum(1, 2)).to.equal(3);
        });
        it('First decimal', function () {
            expect(mathEnforcer.sum(1.1, 2)).to.equal(3.1);
        });
        it('Second decimal', function () {
            expect(mathEnforcer.sum(1, 2.1)).to.equal(3.1);
        }); 
    });
});
