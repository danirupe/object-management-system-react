import { useMemo, useState } from "react";
import { useGlobalState } from "../utility/hooks/useGlobalState"
import { IObjectData } from "../models/object";
import { IType } from "../models/type";
import { ObjectSearch } from "./ObjectSearch";

export const ObjectList = () => {
  const { objects, types, setActiveObject, deleteObject } = useGlobalState();
  const [query, setQuery] = useState('')

  const objectsWithType = useMemo(() => {
    return objects.map((object: IObjectData) => {
      const type: IType = types.find(type => type.id === object.type)!;
      if (!type) return object;
      
      {/* Objects could have more than 5 properties. We just want to show up 5 properties in the table */}
      const limitedProperties = Object.entries(object).slice(0, 5).reduce((acc, [key, value]) => {
        return { ...acc, [key]: value };
      }, {});

      return {
        ...limitedProperties as IObjectData,
        type: type.name,
      }
    })
  }, [objects, types])

  const filteredObjects = useMemo(() => {
    return objectsWithType.filter(object => {
      const nameMatch = object.name.toLowerCase().includes(query.toLowerCase());
      const descriptionMatch = object.description.toLowerCase().includes(query.toLowerCase());
      return nameMatch || descriptionMatch;
    })
  }, [objectsWithType, query])

  const objectsToRender = query ? filteredObjects : objectsWithType;

  return (
    <div className="list flex flex-col overflow-x-auto mt-8">
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
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">#</th>
                      <th scope="col" className="px-6 py-4">Name</th>
                      <th scope="col" className="px-6 py-4">Description</th>
                      <th scope="col" className="px-6 py-4">Type</th>
                      <th scope="col" className="px-6 py-4">Property</th>
                      <th scope="col" className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      objectsToRender.map((object, index) => (
                        <tr className="border-b dark:border-neutral-500" key={object.id}>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                          {
                            Object.keys(object).map((key, index) => {
                              if (key !== 'id') {
                                return (
                                  <td className="whitespace-nowrap px-6 py-4" key={index}>
                                    {object[key]}
                                  </td>
                                )
                              }
                            }
                            )
                          }
                          <td className="whitespace-nowrap px-6 py-4">
                            <button className="bg-indigo-500 rounded-full w-fit px-6 py-2 text-white" onClick={() => setActiveObject(object.id!)}>
                              Edit
                            </button>
                            <button className="ml-2 bg-red-500 rounded-full w-fit px-6 py-2 text-white" onClick={() => deleteObject(object!)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}
