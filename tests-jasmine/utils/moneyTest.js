import {formatCurrency} from "../../scripts/utils/money.js";

describe('test suite: formatCurrency', () => {
    it ('converts cents into dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });
    it ('converts 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });
    it ('converts 2000.5', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
});