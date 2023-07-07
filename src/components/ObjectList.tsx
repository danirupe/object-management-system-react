import { useMemo, useState } from "react";
import { useGlobalState } from "../utility/hooks/useGlobalState"
import { IObjectData } from "../models/object";
import { IType } from "../models/type";
import { ObjectSearch } from "./ObjectSearch";
import { returnObjectPropertiesOrderedAlphabetically } from "../utility/utils";
import Swal from "sweetalert2";

export const ObjectList = () => {
  const { objects, types, setActiveObject, deleteObject } = useGlobalState();
  const [query, setQuery] = useState('')

  const objectsWithType = useMemo(() => {
    return objects.map((object: IObjectData) => {
      const type: IType = types.find(type => type.id === object.type)!;
      if (!type) return object;
      
      // Order the object properties alphabetically before returning the object
      const sortedObject = returnObjectPropertiesOrderedAlphabetically(object);
      return {
        ...sortedObject,
        type: type.name
      }
    })
  }, [objects, types])

  const filteredObjects = useMemo(() => {
    return objectsWithType.filter(object => {
      // Objects can have multiple properties with different names. Go through all the properties values and check if the query is included in one of the object's properties
      return Object.values(object).some(value => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(query.toLowerCase())
        }

        return false;
      })
    })
  }, [objectsWithType, query])

  const objectsToRender = query ? filteredObjects : objectsWithType;

  const handleDelete = (object: IObjectData) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it.'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteObject(object);
        Swal.fire(
          'Deleted!',
          `The property has been deleted.`,
          'success'
        )
      }
    })
  }

  return (
    <div className="list flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900">Objects</h2>
        {
          objects.length ? (
            <ObjectSearch query={query} setQuery={setQuery} />
          ) : null
        }
      </div>
      {
        !objects.length ? (
          <p className="text-slate-400 text-center">
            There are no objects yet. Create one using the form above.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">#</th>
                  { /* Objects can have multiple properties with different names. We want to display the names of the properties plus the Actions */ }
                  {
                    objectsToRender.length ? Object.keys(objectsToRender[0]).map((key, index) => {
                      if (key !== 'id') {
                        return (
                          <th scope="col" className="px-6 py-4 capitalize" key={index}>
                            {key}
                          </th>
                        )
                      }
                    }) : null
                  }
                  <th scope="col" className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  objectsToRender.map((object, index) => (
                    <tr className="border-b dark:border-neutral-500" key={object.id}>
                      <td className="truncate px-6 py-4 font-medium">{index + 1}</td>
                      {
                        Object.keys(object).map((key, index) => {
                          if (key !== 'id') {
                            return (
                              <td className="max-w-xs truncate px-6 py-4" key={index}>
                                {object[key]}
                              </td>
                            )
                          }
                        }
                        )
                      }
                      <td className="truncate px-6 py-4">
                        <button className="bg-indigo-500 rounded-full w-fit px-6 py-2 text-white" onClick={() => setActiveObject(object.id!)}>
                          Edit
                        </button>
                        <button className="ml-2 bg-red-500 rounded-full w-fit px-6 py-2 text-white" onClick={() => handleDelete(object)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        )
      }
    </div>
  )
}
