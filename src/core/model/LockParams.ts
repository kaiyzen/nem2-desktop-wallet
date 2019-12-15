export class LockParams {
  constructor(
    public announceInLock: boolean,
    public transactionFee?: number | undefined,
  ) { }

  static default() {
    return new LockParams(false)
  }
}
