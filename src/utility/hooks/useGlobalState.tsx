import { useDispatch, useSelector } from "react-redux";
import { onAddNewObject, onSetActiveObject, onUpdateObject, onDeleteObject, onAddNewType, onSetActiveType, onUpdateType, onDeleteType, onAddNewProperty, onSetActiveProperty, onUpdateProperty, onDeleteProperty } from "../../store/globalSlice";
import { IObjectData } from "../../models/object";
import { IStore } from "../../models/store";
import { IType, ITypeProperties } from "../../models/type";
import { useLocalStorage } from "./useLocalStorage";

export const useGlobalState = () => {
  const dispatch = useDispatch();
  const { updateItemLocalStorageKey, addItemLocalStorageKey, removeItemLocalStorageKey } = useLocalStorage();
  const { objects, activeObject, types, activeType, properties, activeProperty } = useSelector((state: IStore) => state.globalState);

  // ** Objects
  const addNewObject = (object: IObjectData) => {
    addItemLocalStorageKey('objects', object);
    dispatch(onAddNewObject(object));
  }

  const setActiveObject = (objectId: string | null) => {
    const object = objects.find(object => object.id === objectId);
    dispatch(onSetActiveObject(object));
  }

  const updateObject = (object: IObjectData) => {
    updateItemLocalStorageKey('objects', object);
    dispatch(onUpdateObject(object));
  }

  const deleteObject = (object: IObjectData) => {
    removeItemLocalStorageKey('objects', object);
    dispatch(onDeleteObject(object));
  }

  // ** Types
  const addNewType = (type: IType) => {
    addItemLocalStorageKey('types', type); 
    dispatch(onAddNewType(type));
  }

  const setActiveType = (typeId: string | null) => {
    const type = types.find(type => type.id === typeId);
    dispatch(onSetActiveType(type));
  }

  const updateType = (type: IType) => {
    updateItemLocalStorageKey('types', type);
    dispatch(onUpdateType(type));
  }

  const deleteType = (type: IType) => {
    removeItemLocalStorageKey('types', type);
    dispatch(onDeleteType(type));
  }

  { /* 
    Deleting a type should also delete all the objects and properties that are related to that type.
  */ } 
  const deleteRecursive = (type: IType) => {
    removeItemLocalStorageKey('types', type);
    dispatch(onDeleteType(type));
    const objectsToDelete = objects.filter(object => object.type === type.id);
    objectsToDelete.forEach(object => {
      dispatch(onDeleteObject(object));
      removeItemLocalStorageKey('objects', object);
    })
    const propertiesToDelete = properties.filter(property => property.type === type.id);
    propertiesToDelete.forEach(property => {
      dispatch(onDeleteProperty(property));
      removeItemLocalStorageKey('properties', property);
    })
  }

  // ** Properties
  const addNewProperty = (property: ITypeProperties) => {
    addItemLocalStorageKey('properties', property);
    dispatch(onAddNewProperty(property));
  }

  const setActiveProperty = (propertyId: string | null) => {
    const property = properties.find(property => property.id === propertyId);
    dispatch(onSetActiveProperty(property));
  }

  const updateProperty = (property: ITypeProperties) => {
    updateItemLocalStorageKey('properties', property);
    dispatch(onUpdateProperty(property));
  }

  const deleteProperty = (property: ITypeProperties) => {
    removeItemLocalStorageKey('properties', property);
    dispatch(onDeleteProperty(property));
  }

  return {
    objects,
    activeObject,
    types,
    activeType,
    properties,
    activeProperty,
    addNewObject,
    setActiveObject,
    updateObject,
    deleteObject,
    addNewType,
    setActiveType,
    updateType,
    deleteType,
    deleteRecursive,
    addNewProperty,
    setActiveProperty,
    updateProperty,
    deleteProperty
  }
}