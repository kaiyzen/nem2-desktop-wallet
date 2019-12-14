import {Address, Deadline} from 'nem2-sdk'
import {explorerUrlHead} from '@/config'
import {NetworkCurrency} from '../model'
import {getRelativeMosaicAmount} from '../utils'

export const formatNumber = (num: number): string => {
  if (num <= 1) return `${num}`
  if (num === Number(num.toFixed(0))) return num.toLocaleString('en-US', {minimumFractionDigits: 0})

  const stringOfNumber = `${num}`
  const minimumFractionDigits = stringOfNumber.length - stringOfNumber.indexOf('.') - 1
  return num.toLocaleString('en-US', {minimumFractionDigits})
}

export const formatAddress = (address: string): string => {
  if (!address) return
  return Address.createFromRawAddress(address).pretty()
}
export const formatExplorerUrl = transactionHash => {
  return explorerUrlHead + transactionHash
}

export const absoluteAmountToRelativeAmountWithTicker = (
    amount: number,
    networkCurrency: NetworkCurrency,
): string => {
  const relativeAmount = getRelativeMosaicAmount(amount, networkCurrency.divisibility)
  return `${formatNumber(relativeAmount)} ${networkCurrency.ticker}`
}
