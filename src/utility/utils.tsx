import { IType } from "../models/type";

export const returnTypeNameById = (id: string, types: IType[]) => {
    if (types && types.length) {
      const type = types.find((type: IType) => type.id === id);
      return type ? type.name : '';
    } else {
      return '';
    }
}