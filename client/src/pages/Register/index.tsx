import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiChatAlt2 } from 'react-icons/hi';
import FormSuccess from '../../components/loading/FormSuccess';
import Divider from './components/Divider';
import RegisterForm from './components/RegisterForm';

const Register = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(true);

  return (
    <div className='flex justify-center items-center w-full h-[100vh]'>
      <div className='py-10 md:py-5 w-full h-full sm:h-auto sm:w-[400px] bg-neutral-800 shadow-lg rounded-md text-white'>
        {
          isFormOpen
            ?
            <>
              <div className='w-full border-b border-neutral-700 hidden sm:flex justify-center pb-8'>
                <div className="w-20 h-20 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <HiChatAlt2 className="text-white text-4xl" />
                </div>
              </div>
              <h1 className='text-3xl font-semibold text-center sm:hidden mb-10'>Create Account</h1>
              <RegisterForm setIsFormOpen={setIsFormOpen} />
              <div className='text-center mb-3'>
                <Divider />
                <Link className='hover:text-neutral-300 duration-200' to='/login'>Have an account? Login</Link>
              </div>
            </>
            :
            <FormSuccess message='Account created' redirectTo='login' />
        }
      </div>
    </div>
  );
};

export default Register;
