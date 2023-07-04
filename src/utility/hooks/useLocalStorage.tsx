import { IObjectData } from "../../models/object";
import { IType, ITypeProperties } from "../../models/type";

export const useLocalStorage = () => {
  
  const addItemLocalStorageKey = (key: string, value: string | IObjectData | ITypeProperties | IType) => {
    const data = getLocalStorage(key);
    data.push(value);
    window.localStorage.setItem(key, JSON.stringify(data));
  }

  const updateItemLocalStorageKey = (key: string, value: IObjectData | ITypeProperties | IType) => {
    const data = getLocalStorage(key);
    const newData = data.map((item: IObjectData | ITypeProperties | IType) => {
      if (item.id === value.id) {
        return value;
      }
      return item;
    });
    window.localStorage.setItem(key, JSON.stringify(newData));
  }

  const removeItemLocalStorageKey = (key: string, value: IObjectData | ITypeProperties | IType) => {
    const data = getLocalStorage(key);
    const newData = data.filter((item: IObjectData | ITypeProperties | IType) => item.id !== value.id);
    window.localStorage.setItem(key, JSON.stringify(newData));
  }

  const getLocalStorage = (key: string) => {
    const data = window.localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  const removeLocalStorage = (key: string) => {
    window.localStorage.removeItem(key);
  }

  return {
    addItemLocalStorageKey,
    updateItemLocalStorageKey,
    removeItemLocalStorageKey,
    getLocalStorage,
    removeLocalStorage
  }
}
