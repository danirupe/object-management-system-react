import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useGlobalState } from "../utility/hooks/useGlobalState";
import { v4 as uuidv4 } from 'uuid';
import { ITypeProperties } from "../models/type";
import { useEffect, useState } from "react";

const defaultValues: ITypeProperties = {
  id: '',
  type: '',
  propertyName: '',
  propertyValue: ''
}

export const PropertiesFrom = () => {
  const [edit, setEdit] = useState(false);
  const [selectedType, setSelectedType] = useState('')
  const { addNewProperty, updateProperty, activeProperty, setActiveProperty, types } = useGlobalState();
  const { control, reset, handleSubmit, setValue } = useForm<ITypeProperties>({defaultValues});

  useEffect(() => {
    if (!activeProperty) return
    setValue('propertyName', activeProperty.propertyName)
    setValue('propertyValue', activeProperty.propertyValue)
  }, [activeProperty])

  useEffect(() => {
    if (activeProperty) {
      setEdit(true)
    }
  }, [activeProperty])

  const onSubmit: SubmitHandler<ITypeProperties> = (data: ITypeProperties) => {
    if (edit && activeProperty) {
      // Edit property
      const property = {
        ...data,
        type: activeProperty.type,
        id: activeProperty.id
      }
      updateProperty(property);
    } else {
      // Create property
      const property = {
        ...data,
        type: selectedType,
        id: uuidv4()
      }
      addNewProperty(property);
    }
    setEdit(false);
    setActiveProperty(null);
    reset();
  };

  const handleCancel = () => {
    setEdit(false);
    setActiveProperty(null);
    reset();
  }

  return (
    <div className="form">
      <h1 className="text-2xl font-bold text-slate-900">
        {
          edit ? 'Edit Property' : 'Create Property'
        }
      </h1>
      <small className="block italic text-slate-400 mb-4">
        Select type and add properties
      </small>
      {
        types.length !== 0 ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center gap-3">
              {
                !edit && (
                  <Controller
                    name="type"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <select className="block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm italic text-slate-400" placeholder="Select type" {...field} onChange={(e) => {
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
                    </select>}
                  />
                )
              }
              {
                selectedType.length > 0 || edit ? (
                  <>
                    <Controller
                      name="propertyName"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => <input className="block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm placeholder:italic placeholder:text-slate-400" placeholder="Property name" {...field} />}
                    />
                  </>
                ) : null
              }
              <div className="flex items-center gap-3">
                <button type="submit" className="bg-indigo-500 rounded-full w-fit px-6 py-2 text-white">
                  {
                    edit ? 'Update property' : 'Create property'
                  }
                </button>
                {
                  edit && (
                    <button type="button" className="bg-slate-500 rounded-full w-fit px-6 py-2 text-white" onClick={handleCancel}>
                      Cancel
                    </button>
                  )
                }
              </div>
            </div>
          </form>
        ) : (
          <p className="text-slate-400">Please create a type first</p>
        )
      }
    </div>
  )
}
