import {Rent} from '@/core/services/fees/Rent.ts'
import {defaultNetworkConfig} from '@/config'
import {NetworkCurrency} from '@/core/model';
const {dynamicDefaultFeeMultiplier} = defaultNetworkConfig

const mockNetworkMosaic: NetworkCurrency = {
 hex: 'thisIsAHex',
 divisibility: 6,
 ticker: 'XEM',
 name: 'nem.xem',
}

describe('getCostFromDurationInBlock', () => {
 it('should return correct values', () => {
  const rent = Rent.getFromDurationInBlocks(1000, mockNetworkMosaic)
  expect(rent).toBeInstanceOf(Rent)
  expect(rent.absolute).toBe(1000 * dynamicDefaultFeeMultiplier)
  expect(rent.relativeWithTicker).toBe('1 XEM')
  expect(rent.relative).toBe(1000 * dynamicDefaultFeeMultiplier / Math.pow(10, 6))
 });
});
