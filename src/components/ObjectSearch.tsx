import { useGlobalState } from '../utility/hooks/useGlobalState';
interface ObjectSearchProps {
  query: string;
  setQuery: (query: string) => void;
}

export const ObjectSearch: React.FC<ObjectSearchProps> = ({query, setQuery }) => {
  const { objects } = useGlobalState();

  return (
    <div className='min-w-[50%]'>
      <input list="objects" className="block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm placeholder:italic placeholder:text-slate-400" type="text" placeholder="Search objects" value={query} onChange={e => setQuery(e.target.value)} />
      <datalist id="objects">
        {
          objects.map(object => (
            <option key={object.id} value={object.Title} />
          ))
        }
      </datalist>
    </div>
  )
}