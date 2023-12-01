import {useState, useEffect} from 'react';
import axios from 'axios';
import SlideOver from './SlideOver';
import Toast from './Toast';
import ErrorPage from './ErrorPage';
  
  const List = () => {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [update, setUpdate] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastStatus, setToastStatus] = useState(false);
    const baseURL: string = 'http://localhost:4000/users'
    useEffect(()=>{
        try{
            axios.get(baseURL).then((response) => {
                setUsers(response.data);
            }).catch((err) => {
                setError(true)
                setUsers([]);
            });
        } catch(err){
            console.log(err);
            setUsers([]);
            setError(true)
        }
    },[])
    useEffect(()=>{
        axios.get(baseURL).then((response) => {
            setUsers(response.data);
          });
    },[update])
    const showSlideOver = () =>{
        setOpen(!open)
    }
    const showToaster = () => {
        setShowToast(!showToast)
    }
    const addSuccess = () =>{
      setUpdate(!update)
      setShowToast(!showToast)
      setToastMessage('SuccessFully Added')
      setToastStatus(true)
    }
    const addError = (data: any) =>{
        setShowToast(!showToast);
        setToastMessage(data?.message);
        setToastStatus(false)
    }
    return (
      <div className="bg-gray-900">
        <>
        {
            error ? <ErrorPage/> : (
                <>
                <div className="mx-auto max-w-7xl">
                <div className="bg-gray-900 py-10">
                  <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                      <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-white">Users</h1>
                        <p className="mt-2 text-sm text-gray-300">
                          A list of all the users in your account including their name and email.
                        </p>
                      </div>
                      <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                          onClick={()=>{showSlideOver()}}
                          type="button"
                          className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                          Add user
                        </button>
                      </div>
                    </div>
                    <div className="mt-8 flow-root">
                      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                          <table className="min-w-full divide-y divide-gray-700">
                            <thead>
                              <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                                  Name
                                </th>
                              
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                  Email
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                  <span className="sr-only">Edit</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                              {users?.map((person: any) => (
                                <tr key={person._id}>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                                    {person.firstName} {person.lastName}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{person.email}</td>
                                  {/* <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                    <a href="#" className="text-indigo-400 hover:text-indigo-300">
                                      Edit<span className="sr-only">, {person.name}</span>
                                    </a>
                                  </td> */}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <SlideOver open={open} setOpen={showSlideOver} addSuccess={addSuccess} addError={addError}/>
              <Toast showToast={showToast} setOpen={showToaster} message={toastMessage} success={toastStatus}/>
              </>
            )
        }
        </>
      </div>
    )
  }

  export default List;
  