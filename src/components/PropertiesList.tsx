import { useGlobalState } from "../utility/hooks/useGlobalState"
import { returnTypeNameById } from "../utility/utils";

export const PropertiesList = () => {
  const { properties, types, setActiveProperty, deleteProperty } = useGlobalState();
  return (
    <div className="list flex flex-col overflow-x-auto mt-8">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Properties</h2>
      {
        !properties.length ? (
          <p className="text-slate-400 text-center">
            There are no properties yet. Create one using the form above.
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
                      <th scope="col" className="px-6 py-4">Type</th>
                      <th scope="col" className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map((property, index) => (
                      <tr className="border-b dark:border-neutral-500" key={property.id}>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                        <td className="whitespace-nowrap px-6 py-4 w-6/12">{property.propertyName}</td>
                        <td className="whitespace-nowrap px-6 py-4 w-6/12">{returnTypeNameById(property.type, types)}</td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <button className="bg-indigo-500 rounded-full w-fit px-6 py-2 text-white" onClick={() => setActiveProperty(property.id)}>
                            Edit
                          </button>
                          <button className="ml-2 bg-red-500 rounded-full w-fit px-6 py-2 text-white" onClick={() => deleteProperty(property)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
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
