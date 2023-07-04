import { createSlice } from '@reduxjs/toolkit';
import { IObjectData } from '../models/object';
import { IType, ITypeProperties } from '../models/type';

export interface ObjectState {
  objects: IObjectData[];
  activeObject: IObjectData | null;
  types: IType[];
  activeType: IType | null;
  properties: ITypeProperties[];
  activeProperty: ITypeProperties | null;
}

const initialObjects = () => {
  const data = window.localStorage.getItem('objects');
  return data ? JSON.parse(data) : [];
}
const initialProperties = () => {
  const data = window.localStorage.getItem('properties');
  return data ? JSON.parse(data) : [];
}

const initialTypes = () => {
  const data = window.localStorage.getItem('types');
  return data ? JSON.parse(data) : [];
}

const initialState: ObjectState = {
  objects: initialObjects(),
  activeObject: null,
  types: initialTypes(),
  activeType: null,
  properties: initialProperties(),
  activeProperty: null
};

export const globalSlice = createSlice({
  name: 'objects',
  initialState,
  reducers: {
    onAddNewObject: (state, { payload }) => {
      state.objects.push(payload);
    },
    onSetActiveObject: (state, { payload }) => {
      state.activeObject = payload;
    },
    onUpdateObject: (state, { payload }) => {
      const index = state.objects.findIndex(object => object.id === payload.id);
      state.objects[index] = payload;
    },
    onDeleteObject: (state, { payload }) => {
      state.objects = state.objects.filter(object => object.id !== payload.id);
      state.activeObject = null;
    },
    onAddNewType: (state, { payload }) => {
      state.types.push(payload);
    },
    onSetActiveType: (state, { payload }) => {
      state.activeType = payload;
    },
    onUpdateType: (state, { payload }) => {
      state.types = state.types.map(type => {
        if (type.id === payload.id) {
          return payload;
        }
        return type;
      })
    },
    onDeleteType: (state, { payload }) => {
      state.types = state.types.filter(type => type.id !== payload.id);
      state.activeType = null;
    },
    onAddNewProperty: (state, { payload }) => {
      state.properties.push(payload);
    },
    onSetActiveProperty: (state, { payload }) => {
      state.activeProperty = payload;
    },
    onUpdateProperty: (state, { payload }) => {
      const index = state.properties.findIndex(property => property.id === payload.id);
      state.properties[index] = payload;
    },
    onDeleteProperty: (state, { payload }) => {
      state.properties = state.properties.filter(property => property.id !== payload.id);
      state.activeProperty = null;
    }
  },
});

export const { 
  onAddNewObject,
  onSetActiveObject,
  onUpdateObject,
  onDeleteObject,
  onAddNewType, 
  onSetActiveType,
  onUpdateType, 
  onDeleteType,
  onAddNewProperty, 
  onSetActiveProperty,
  onUpdateProperty,
  onDeleteProperty
} = globalSlice.actions;

export default globalSlice.reducer;