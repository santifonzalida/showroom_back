import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CameraIcon } from '@heroicons/react/24/solid';
import { PencilIcon } from '@heroicons/react/24/solid'
import { Layout } from "../../Components/Layout";
import { LoginContext } from "../../Context/loginContext";
import { EditarInformacionPersonal } from "./editarInformacionPersonal";

function MyAccount() {

  const navigate = useNavigate();
  const context = useContext(LoginContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    context.getUserInfo().then((data) => {
      if (data.statusCode == 401) {
        context.setIsUserLogin(false);
        context.setError(data.message);
        navigate('/login');
      } else {
        context.setUser(data.data);
        context.setIsUserLogin(true);
      }
      context.setIsLoading(false);
    });
  }, [])

  const uploadImage = () => {
    context.updateUserInformation().then((data) => {
      context.setUser(data.data);
      setShowModal(false)
    });
  }

  const editarInformacionPersonal = (event) => {
    console.log(socialMedia)
  }

  return (
    <Layout>

      <EditarInformacionPersonal user={context.user}></EditarInformacionPersonal>

      {!showModal ?
        <div className="max-w-lg mx-auto my-10 bg-zinc-80 rounded-lg p-5">
          <div className="relative">
            <img className="w-40 h-40 rounded-full mx-auto" src={context.user?.avatarUrl} alt="User avatar" />
            <CameraIcon className="absolute top-1/2 left-1/2 mb-5 text-black py-2 px-4 w-16 h-16 opacity-90 mt-4 ml-5 bg-stone-400 rounded-full cursor-pointer" onClick={() => setShowModal(true)}> </CameraIcon>
          </div>
          <h2 className="text-center text-2xl font-semibold mt-3">{context.user?.fullName}</h2>
          <a className="flex font-sans italic justify-center mt-2 cursor-pointer" onClick={editarInformacionPersonal}>Editar información personal <PencilIcon className="ml-2 mt-1 h-4 w-4"></PencilIcon></a>
          {
            context.user?.socialMedia?.map((sm) => (
              <div className="flex justify-center mt-5">
                <a href={sm.url} className="text-blue-500 hover:text-blue-700 mx-3">{sm.name}</a>
              </div>
            ))
          }
          
          <div className="mt-5">
            <h3 className="text-xl font-semibold">Bio</h3>
            <p className="text-gray-600 mt-2">{context.user?.fullName} is a software engineer with over 10 years of experience in developing web and mobile applications. He is skilled in JavaScript, React, and Node.js.</p>
          </div>
        </div>
        :
        <div>
          <div className="flex items-center justify-between mb-7">
            <h2 className='font-medium text-xl'>Cambiar imagen avatar</h2>
            <div className='p-4'>
              <XMarkIcon className='h-6 w-6 text-black cursor-pointer mt-2' onClick={() => setShowModal(false)}></XMarkIcon>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-light mb-4">Imagen url:</span>
            <input className="border border-black rounded-md mb-4 focus:outline-none"
              type="text"
              value={context.user?.avatarUrl}
              onChange={(event) => context.setUser({ ...context.user, avatarUrl: event.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 place-items-center pt-5">
            <button className=" h-10 w-40 rounded-lg bg-black text-white" onClick={() => uploadImage()}>Guardar cambios</button>
          </div>
        </div>
      }
    </Layout>
  )
}

export { MyAccount }
