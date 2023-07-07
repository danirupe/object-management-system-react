import Swal from "sweetalert2";
import { ITypeProperties } from "../models/type";
import { useGlobalState } from "../utility/hooks/useGlobalState"
import { returnTypeNameById } from "../utility/utils";

export const PropertiesList = () => {
  const { properties, types, setActiveProperty, deletePropertyRecursive } = useGlobalState();

  const handleDelete = (property: ITypeProperties) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will also delete the property from all the objects that are using it.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it.'
    }).then((result) => {
      if (result.isConfirmed) {
        deletePropertyRecursive(property);
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
      <h2 className="text-xl font-bold text-slate-900 mb-4">Properties</h2>
      {
        !properties.length ? (
          <p className="text-slate-400 text-center">
            There are no properties yet. Create one using the form above.
          </p>
        ) : (
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
                      <button className="ml-2 bg-red-500 rounded-full w-fit px-6 py-2 text-white" onClick={() => handleDelete(property)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }
    </div>
  )
}
