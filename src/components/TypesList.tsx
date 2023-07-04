import { IType } from "../models/type";
import { useGlobalState } from "../utility/hooks/useGlobalState";
import Swal from 'sweetalert2';

export const TypesList = () => {
  const { types, setActiveType, deleteRecursive } = useGlobalState();

  const handleDelete = (type: IType) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `This will delete all the objects and properties that are related to the type "${type.name}".`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it.'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRecursive(type);
        Swal.fire(
          'Deleted!',
          `The type "${type.name}" and all its related objects and properties have been deleted.`,
          'success'
        )
      }
    })
  }

  return (
    <div className="list flex flex-col overflow-x-auto mt-8">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Types</h2>
      {
        !types.length ? (
          <p className="text-slate-400 text-center">
            There are no types yet. Create one using the form above.
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
                      <th scope="col" className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {types.map((type, index) => (
                      <tr className="border-b dark:border-neutral-500" key={type.id}>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                        <td className="whitespace-nowrap px-6 py-4">{type.name}</td>
                        <td className="whitespace-nowrap px-6 py-4 truncate">{type.description}</td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <button className="bg-indigo-500 rounded-full w-fit px-6 py-2 text-white" onClick={() => setActiveType(type.id!)}>
                            Edit
                          </button>
                          <button className="ml-2 bg-red-500 rounded-full w-fit px-6 py-2 text-white" onClick={() => handleDelete(type)}>
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
