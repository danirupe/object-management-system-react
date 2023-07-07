import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { IObjectData } from "../models/object";
import { useGlobalState } from "../utility/hooks/useGlobalState";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";

const defaultValues: IObjectData = {
  id: '',
  type: ''
}

export const ObjectForm = () => {
  const [edit, setEdit] = useState(false);
  const [selectedType, setSelectedType] = useState('')
  const { control, reset, handleSubmit, setValue } = useForm<IObjectData>({defaultValues});
  const { types, properties, addNewObject, activeObject, setActiveObject, updateObject } = useGlobalState();

  useEffect(() => {
    if (!activeObject) return;
    setSelectedType(activeObject.type)
    // Go thorught all properties and set the value
    Object.keys(activeObject).forEach(key => {
      setValue(key, activeObject[key])
    })
  }, [activeObject])

  useEffect(() => {
    if (activeObject) {
      setEdit(true)
    }
  }, [activeObject])

  const onSubmit: SubmitHandler<IObjectData> = (data: IObjectData) => {
    if (edit && activeObject) {
      // Edit object
      const object = {
        ...data,
        id: activeObject.id
      }
      updateObject(object);
    } else {
      // Create object
      // Object without properties that have undefined value
      const filteredObject = Object.keys(data).reduce((object, key) => {
        if (data[key] !== undefined) {
          object[key] = data[key]
        }
        return object
      }, {} as IObjectData)

      const object = {
        ...filteredObject,
        id: uuidv4()
      }
      addNewObject(object);
    }
    setSelectedType('');
    setEdit(false);
    setActiveObject(null);
    reset();
  };

  const handleCancel = () => {
    setEdit(false);
    setActiveObject(null);
    setSelectedType('');
    reset();
  }

  return (
    <div className="form">
      <h1 className="text-2xl font-bold text-slate-900 mb-4">{
        edit ? 'Edit object' : 'Create object'
      }</h1>
      {
        types.length === 0 ? (
          <p className="text-slate-400">Please create a type first</p>
        ): (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center gap-3">
              <Controller
                name="type"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <select disabled={edit ? true : false} className="block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm italic text-slate-400" {...field} onChange={(e) => {
                    const value = e.target.value;
                    setSelectedType(value);
                    field.onChange(value);
                  }}>
                    <option value="">Select type</option>
                    {types.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                )}
              />
              {
                selectedType.length !== 0 && (
                  <>
                    {/* Show properties based on the selected type */}
                    {
                      properties.filter(property => property.type === selectedType).map(property => (
                        <Controller
                          key={property.id}
                          name={property.propertyName}
                          control={control}
                          render={({ field }) => <input className="block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm placeholder:italic placeholder:text-slate-400" placeholder={property.propertyName} {...field} />}
                        />
                      ))
                    }
                  </>
                )
              }
              <div>
                <button type="submit" className="bg-indigo-500 rounded-full w-fit px-6 py-2 text-white">
                  {
                    edit ? 'Update object' : 'Create object'
                  }
                </button>
                {
                  edit && (
                    <button type="button" className="bg-slate-500 rounded-full w-fit px-6 py-2 text-white ml-2" onClick={handleCancel}>
                      Cancel
                    </button>
                  )
                }
              </div>
            </div>
          </form>
        )
      }
    </div>
  )
}
