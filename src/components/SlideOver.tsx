import { Fragment } from 'react'
import axios from 'axios'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {useFormik} from 'formik';

interface slideProps {
 open: boolean,
 setOpen: ()=>void
 addSuccess: ()=>void
 addError: (data: any)=>void
}

export default function SlideOver({open, setOpen, addSuccess, addError}: slideProps) {
    const baseURL: string = 'http://localhost:4000/user';
    const validateUser = (userData: any) => {
        const errors: any = {};
        if (!userData.firstName) {
        errors.firstName = 'Please enter first name';
        } else if (userData.firstName.length > 100) {
        errors.firstName = 'Name cannot exceed 100 characters';
        } else if (!/^[A-Za-z]+$/.test(userData.firstName)) {
        errors.firstName = 'Invalid Name';
        }

        if (!userData.lastName) {
        errors.lastName = 'Please enter last name';
        } else if (userData.lastName.length > 100) {
        errors.lastName = 'Name cannot exceed 100 characters';
        } else if (!/^[A-Za-z]+$/.test(userData.lastName)) {
        errors.lastName = 'Invalid Name';
        }
    
        if (!userData.email) {
        errors.email = 'Please enter email';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userData.email)) {
        errors.email = 'Invalid email address';
        }
        return errors;
    };
    const handleReset = () =>{
        formik.resetForm()
        setOpen()
    }
    const formik=useFormik({
        initialValues:{
        firstName:'',
        lastName:'',
        email:''
        },
        validate:validateUser,
        onSubmit:()=>{
            try{
                axios.post(baseURL, {...formik.values}).then((response) => {
                    addSuccess();
                    handleReset();
                  }).catch((error)=>{
                    addError(error?.response?.data)
                    setOpen()
                  });
            } catch(error){
               console.log(error);
            }
        }
    });

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl" onSubmit={formik.handleSubmit}>
                    <div className="h-0 flex-1 overflow-y-auto">
                      <div className="bg-indigo-700 px-4 py-6 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-white">
                            New User
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                              onClick={() => handleReset()}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                          <div className="space-y-6 pb-5 pt-6">
                            <div>
                              <label
                                htmlFor="first-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                First name
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="firstName"
                                  value={formik.values.firstName}
                                  onChange={formik.handleChange} 
                                  onBlur={formik.handleBlur}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                              {formik.touched.firstName && formik.errors.firstName ? <span style={{color:'red', fontSize: '12px'}}>{formik.errors.firstName}</span> : null}
                            </div>
                            <div>
                              <label
                                htmlFor="last-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Last name
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="lastName"
                                  value={formik.values.lastName}
                                  onChange={formik.handleChange} 
                                  onBlur={formik.handleBlur}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                              {formik.touched.lastName && formik.errors.lastName ? <span style={{color:'red', fontSize: '12px'}}>{formik.errors.lastName}</span> : null}
                            </div>
                            <div>
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Email
                              </label>
                              <div className="mt-2">
                                <input
                                  type="email"
                                  name="email"
                                  value={formik.values.email}
                                  onChange={formik.handleChange} 
                                  onBlur={formik.handleBlur}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                              {formik.touched.email && formik.errors.email ? <span style={{color:'red', fontSize: '12px'}}>{formik.errors.email}</span> : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="reset"
                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={() => handleReset()}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}


