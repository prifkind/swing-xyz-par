import { ITransactionParams } from "./ITransactionPrams";

export interface IGetQuote {
  (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    params: ITransactionParams
  ): void;
}
