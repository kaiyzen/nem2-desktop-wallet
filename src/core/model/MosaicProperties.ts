export class MosaicProperties {

  constructor( supplyMutable: boolean,
    transferable: boolean,
    divisibility: number,
    duration: number,
    restrictable: boolean,
  ) {
    this.supplyMutable = supplyMutable
    this.transferable = transferable
    this.divisibility = divisibility
    this.duration = duration
    this.restrictable = restrictable
  }
  supplyMutable: boolean
  transferable: boolean
  divisibility: number
  duration: number
  restrictable: boolean
}
