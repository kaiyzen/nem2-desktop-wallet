import {Address, NamespaceId, PublicAccount, NetworkType, MosaicId} from 'nem2-sdk'
import {networkConfig} from '@/config/constants'
import {ValidationObject} from '@/core/model'
const {NAMESPACE_MAX_LENGTH} = networkConfig

export const validateAddress = (address): ValidationObject => {
  try {
    Address.createFromRawAddress(address)
    return {valid: address}
  } catch (error) {
    return {valid: false}
  }
}

export const validatePublicKey = (publicKey): ValidationObject => {
  try {
    /** The NetworkType below is for public key testing only */
    PublicAccount.createFromPublicKey(publicKey, NetworkType.TEST_NET)
    return {valid: publicKey}
  } catch (error) {
    return {valid: false}
  }
}

export const validateAlias = (alias): ValidationObject => {
  if (alias.length > NAMESPACE_MAX_LENGTH) return {valid: false}
  try {
    // tslint:disable-next-line:no-unused-expression
    new NamespaceId(alias)
    return {valid: alias}
  } catch (error) {
    return {valid: false}
  }
}

export const validateMosaicId = (mosaicId): ValidationObject => {
  try {
    // tslint:disable-next-line:no-unused-expression
    new MosaicId(mosaicId)
    return {valid: mosaicId}
  } catch (error) {
    return {valid: false}
  }
}

export const validateNamespace = (namespace): ValidationObject => {
  try {
    // tslint:disable-next-line:no-unused-expression
    new NamespaceId(namespace)
    return {valid: namespace}
  } catch (error) {
    return {valid: false}
  }
}
