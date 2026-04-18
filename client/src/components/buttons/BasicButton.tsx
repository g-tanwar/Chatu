import { FC, ReactNode } from 'react'

type Props = {
  type: any;
  children: ReactNode;
}

const BasicButton: FC<Props> = ({ type = 'button', children }) => {
  return (
    <button type={type} className='w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium p-3 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] transition-all duration-200'>
      {children}
    </button>
  )
}

export default BasicButton;