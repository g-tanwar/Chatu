import Cookies from "js-cookie";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HiChatAlt2 } from "react-icons/hi";
import FormSuccess from "../../components/loading/FormSuccess";
import Divider from "../Register/components/Divider";
import LoginForm from "./components/LoginForm";
import Relogin from "./components/Relogin";

const Login = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(true);
  const [lastUser, setLastUser] = useState<string>(Cookies.get('last_user') || '');

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="bg-neutral-800 px-3 py-10 shadow-lg rounded-md text-white min-h-[500px] w-full sm:w-[400px] h-full sm:h-auto">
        {
          isFormOpen
            ?
            <>
              {
                lastUser
                  ?
                  <Relogin id={lastUser} setIsFormOpen={setIsFormOpen} setLastId={setLastUser} />
                  :
                  <div>
                    <div className='w-full border-b border-neutral-700 hidden sm:flex justify-center pb-8'>
                      <div className="w-20 h-20 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        <HiChatAlt2 className="text-white text-4xl" />
                      </div>
                    </div>
                    <h1 className='text-3xl font-semibold text-center sm:hidden mb-10'>Login</h1>
                    <LoginForm setIsFormOpen={setIsFormOpen} />
                  </div>
              }
              <Divider />
              <div className="text-center w-[90%] md:w-[80%] mx-auto">
                <Link className='hover:text-neutral-300 text-neutral-100 duration-200 w-full text-center mx-auto text-lg' to='/register'>Don't have an account? Register</Link>
              </div>
            </>
            :
            <FormSuccess message="Logged In" redirectTo="/chat" />
        }
      </div>
    </div>
  )
}

export default Login;