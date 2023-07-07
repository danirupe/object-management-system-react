import { IObjectData } from "../models/object";
import { IType } from "../models/type";

export const returnTypeNameById = (id: string, types: IType[]) => {
    if (types && types.length) {
      const type = types.find((type: IType) => type.id === id);
      return type ? type.name : '';
    } else {
      return '';
    }
}

export const returnObjectPropertiesOrderedAlphabetically = (object: IObjectData) => {
  const sortedKeys = Object.keys(object).sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });
  const sortedObject: IObjectData = {} as IObjectData;
  sortedKeys.forEach(key => {
    sortedObject[key] = object[key];
  });
  return sortedObject;
}