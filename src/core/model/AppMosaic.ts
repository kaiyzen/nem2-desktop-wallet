import {
  UInt64,
  MosaicAmountView,
  MosaicDefinitionTransaction,
  MosaicInfo,
  Namespace,
} from 'nem2-sdk'
import {MosaicProperties, AppNamespace, MosaicNamespaceStatusType} from '@/core/model'
import {getRelativeMosaicAmount} from '@/core/utils'


export class AppMosaic {

  static fromGetCurrentNetworkMosaic( 
    mosaicDefinitionTransaction: MosaicDefinitionTransaction,
    namespace: Namespace): AppMosaic {
    const {mosaicId} = mosaicDefinitionTransaction
    return new AppMosaic({
      hex: mosaicId.toHex(),
      properties: new MosaicProperties(
        mosaicDefinitionTransaction.flags.supplyMutable,
        mosaicDefinitionTransaction.flags.transferable,
        mosaicDefinitionTransaction.divisibility,
        mosaicDefinitionTransaction.duration.compact(),
        mosaicDefinitionTransaction.flags.restrictable,
      ),
      name: namespace.name,
      namespaceHex: namespace.id.toHex(),
    })
  }

  static fromMosaicAmountView(mosaic: MosaicAmountView): AppMosaic {
    const mosaicHex = mosaic.mosaicInfo.id.toHex()
    return new AppMosaic({
      ...mosaic,
      hex: mosaicHex,
      balance: getRelativeMosaicAmount(
        mosaic.amount.compact(),
        mosaic.mosaicInfo.divisibility,
      ),
    })
  }

  static fromNamespace(namespace: Namespace | AppNamespace): AppMosaic {
    const namespaceHex = namespace instanceof AppNamespace ? namespace.hex : namespace.id.toHex()

    return new AppMosaic({
      hex: namespace.alias.mosaicId.toHex(),
      namespaceHex,
      name: namespace.name,
    })
  }

  constructor(appMosaic?: {
    hex: string
    expirationHeight?: number | MosaicNamespaceStatusType.FOREVER
    balance?: number
    name?: string
    amount?: any
    mosaicInfo?: MosaicInfo
    properties?: MosaicProperties
    hide?: boolean
    namespaceHex?: string
  }) {
    Object.assign(this, appMosaic)
    delete this.amount
    if (this.mosaicInfo) {
      const duration = this.mosaicInfo.duration.compact()
      this.expirationHeight = duration === 0
        ? MosaicNamespaceStatusType.FOREVER : this.mosaicInfo.height.compact() + duration
      this.expirationHeight = appMosaic.expirationHeight ? appMosaic.expirationHeight : this.expirationHeight
      this.properties = new MosaicProperties(
        this.mosaicInfo.isSupplyMutable(),
        this.mosaicInfo.isTransferable(),
        this.mosaicInfo.divisibility,
        this.mosaicInfo.duration.compact(),
        this.mosaicInfo.isRestrictable(),
      )
    }
  }
  hex: string
  namespaceHex: string
  amount: any
  balance?: number
  expirationHeight: number | MosaicNamespaceStatusType.FOREVER
  height: UInt64
  mosaicInfo: MosaicInfo
  name: string
  properties: MosaicProperties
  hide: boolean
}
