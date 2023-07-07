import { useDispatch, useSelector } from "react-redux";
import { onSetObjects, onAddNewObject, onSetActiveObject, onUpdateObject, onDeleteObject, onAddNewType, onSetActiveType, onUpdateType, onDeleteType, onAddNewProperty, onSetActiveProperty, onUpdateProperty, onDeleteProperty } from "../../store/globalSlice";
import { IObjectData } from "../../models/object";
import { IStore } from "../../models/store";
import { IType, ITypeProperties } from "../../models/type";
import { useLocalStorage } from "./useLocalStorage";

export const useGlobalState = () => {
  const dispatch = useDispatch();
  const { updateItemLocalStorageKey, addItemLocalStorageKey, removeItemLocalStorageKey, addItemLocalStorage } = useLocalStorage();
  const { objects, activeObject, types, activeType, properties, activeProperty } = useSelector((state: IStore) => state.globalState);

  const getData = async () => {
    // Fetch data from assets/data/[books, properties, types].json
    const books = await fetch(`${process.env.PUBLIC_URL}/data/books.json}`);
    const booksData = await books.json();
    const properties = await fetch(`${process.env.PUBLIC_URL}/data/properties.json`);
    const propertiesData = await properties.json();
    const types = await fetch(`${process.env.PUBLIC_URL}/data/types.json`);
    const typesData = await types.json();
    // Set data to local storage
    addItemLocalStorage('objects', booksData);
    addItemLocalStorage('properties', propertiesData);
    addItemLocalStorage('types', typesData);
  }

  // ** Objects
  const addNewObject = (object: IObjectData) => {
    addItemLocalStorageKey('objects', object);
    dispatch(onAddNewObject(object));
  }

  const setActiveObject = (objectId: string | null) => {
    if (!objectId) {
      dispatch(onSetActiveObject(null));
    } else {
      const object = objects.find(object => object.id === objectId);
      dispatch(onSetActiveObject(object));
    }
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
    if (!typeId) {
      dispatch(onSetActiveType(null));
    } else {
      const type = types.find(type => type.id === typeId);
      dispatch(onSetActiveType(type));
    }
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
  const deleteTypeRecursive = (type: IType) => {
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
    if (!propertyId) {
      dispatch(onSetActiveProperty(null));
    } else {
      const property = properties.find(property => property.id === propertyId);
      dispatch(onSetActiveProperty(property));
    }
  }

  const updateProperty = (property: ITypeProperties) => {
    updateItemLocalStorageKey('properties', property);
    dispatch(onUpdateProperty(property));
  }

  const updatePropertyRecursive = (property: ITypeProperties, oldProperty: string) => {
    // Update all objects that have the property we want to update
    const propertyName = property.propertyName;

    const modifiedObjects: IObjectData[] = objects.map((object: IObjectData): IObjectData => {
      if (object.hasOwnProperty(oldProperty)) {
        // New object with the updated property and without the old property
        const { [oldProperty]: _, ...newObject } = object;
        return { ...newObject, [propertyName]: object[oldProperty] } as IObjectData;
      }
      // If the object does not have the property we want to update, return the object as it is
      return object;
    });
    updateItemLocalStorageKey('properties', property);
    dispatch(onUpdateProperty(property));
    addItemLocalStorage('objects', modifiedObjects);
    dispatch(onSetObjects(modifiedObjects));
  }

  const deleteProperty = (property: ITypeProperties) => {
    removeItemLocalStorageKey('properties', property);
    dispatch(onDeleteProperty(property));
  }

  // Delete a property must delete that property from all objects
  const deletePropertyRecursive = (property: ITypeProperties) => {
    const propertyName = property.propertyName;
    
    const modifiedObjects: IObjectData[] = objects.map((object: IObjectData): IObjectData => {
      if (object.hasOwnProperty(propertyName)) {
        // new object without the property we want to delete
        const { [propertyName]: _, ...newObject } = object;
        return newObject as IObjectData;
      }
      // If the object does not have the property we want to delete, return the object as it is
      return object;
    });
    addItemLocalStorage('objects', modifiedObjects);
    dispatch(onSetObjects(modifiedObjects));
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
    getData,
    addNewObject,
    setActiveObject,
    updateObject,
    deleteObject,
    addNewType,
    setActiveType,
    updateType,
    deleteType,
    deleteTypeRecursive,
    addNewProperty,
    setActiveProperty,
    updateProperty,
    updatePropertyRecursive,
    deleteProperty,
    deletePropertyRecursive
  }
}