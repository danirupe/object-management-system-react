import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useGlobalState } from "../utility/hooks/useGlobalState";
import { v4 as uuidv4 } from 'uuid';
import { IType } from "../models/type";
import { useEffect, useState } from "react";

const defaultValues: IType = {
  id: '',
  name: '',
  description: ''
}

export const TypeForm = () => {
  const [edit, setEdit] = useState(false);
  const { control, reset, handleSubmit, setValue } = useForm<IType>({defaultValues});
  const { addNewType, updateType, activeType, setActiveType } = useGlobalState();

  useEffect(() => {
    if (!activeType) return
    setValue('name', activeType.name)
    setValue('description', activeType.description)
  }, [activeType])

  useEffect(() => {
    if (activeType) {
      setEdit(true)
    }
  }, [activeType])

  const onSubmit: SubmitHandler<IType> = (data: IType) => {
    if (edit && activeType) {
      // Edit type
      const type = {
        ...data,
        id: activeType.id
      }
      updateType(type);
    } else {
      // Create type
      const type = {
        ...data,
        id: uuidv4()
      }
      addNewType(type);
    }
    setEdit(false);
    setActiveType(null);
    reset();
  };

  const handleCancel = () => {
    setEdit(false);
    setActiveType(null);
    reset();
  }

  return (
    <div className="form">
      <h1 className="text-2xl font-bold text-slate-900 mb-4">
        {
          edit ? 'Edit Type' : 'Create Type'
        }
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-3">
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <input className="block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm placeholder:italic placeholder:text-slate-400" placeholder="Name" {...field} />}
          />
          <Controller
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <input className="block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm placeholder:italic placeholder:text-slate-400" placeholder="Description" {...field} />}
          />
          <div className="flex items-center gap-3">
            <button type="submit" className="bg-indigo-500 rounded-full w-fit px-6 py-2 text-white">
              {
                edit ? 'Update Type' : 'Create Type'
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
    </div>
  )
}
