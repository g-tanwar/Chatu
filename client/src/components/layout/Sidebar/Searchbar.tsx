import { Dispatch, FC, SetStateAction } from "react";

type Props = {
  setSearch: Dispatch<SetStateAction<string>>;
}

const Searchbar: FC<Props> = ({ setSearch }) => {
  return (
    <div className='p-3 w-full border-y border-black/5 dark:border-white/5 transition-colors duration-300'>
      <input
        onChange={(e) => setSearch(e.target.value)}
        className='px-4 py-2.5 bg-black/5 dark:bg-black/40 text-neutral-800 dark:text-neutral-200 placeholder-neutral-500 rounded-2xl w-full outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300'
        placeholder='Search...'
        type="text"
        name='text'
        spellCheck='false'
      />
    </div>
  )
}

export default Searchbar;