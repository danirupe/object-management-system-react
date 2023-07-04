export interface IType {
  id?: string;
  name: string;
  description: string;
}

export interface ITypeProperties {
  id: string;
  type: string;
  [key: string]: string;
}