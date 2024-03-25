import React, { useState } from 'react'
import { useSampleClients } from '../../hooks/sampleData'
import { ApiUpdateData, ApiAddData } from '../../../api'
// import SideUsersAvatar from '../MessagesUtil/sideUsersChat'
import MessageBorder from '../MessagesUtil/message'

const TableSampleClients = ({ columns }) => {
  const { clients } = useSampleClients('admin')

  const [ind, setInd] = useState(0)
  const [Loading, setLoading] = useState(false)

  return (
    <>
      {Loading && (
        <div className="text-center h-[60vh] flex items-center justify-center z-999 absolute top-[20%] left-[50%]">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-40 h-40 mr-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {!clients ? (
        <div className="text-center h-[60vh] flex items-center justify-center z-999">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-40 h-40 mr-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="flex h-[70vh] overflow-scroll">
            <div className="w-1/4 bg-white border-r border-gray-300">
              <div className="h-screen p-3 pb-20 overflow-y-auto mb-9">
                {/* clients.map((client:any,index:number) =>(
              <div onCLick=(()=>{
                setInd(index)
              }) className="flex items-center p-2 mb-4 rounded-md cursor-pointer hover:bg-gray-100">
                  <div className="w-12 h-12 mr-3 bg-gray-300 rounded-full">
                    <img
                      src={'https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato'}
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{clients.sender.phoneNumber}</h2>
                    <p className="text-gray-600">{clients.content}</p>
                  </div>
                </div>  
                  
                )) */}
                {/* <div className="flex items-center p-2 mb-4 rounded-md cursor-pointer hover:bg-gray-100">
                  <div className="w-12 h-12 mr-3 bg-gray-300 rounded-full">
                    <img
                      src={'https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato'}
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{'name'}</h2>
                    <p className="text-gray-600">{'lastMessage'}</p>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="flex-1">
              <header className="p-4 text-gray-700 bg-white">
                <h1 className="text-2xl font-semibold">Users</h1>
              </header>

              <div className="h-screen p-4 overflow-y-auto pb-36">
                {/* <MessageBorder message="Hello there" />
                <MessageBorder
                  message="Hello there"
                  isContainerStyleSneder={true}
                  messageStyle="bg-indigo-500"
                /> */}
                {/* 
                <div className="flex mb-4 cursor-pointer">
                  <div className="flex items-center justify-center mr-2 rounded-full w-9 h-9">
                    <img
                      src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                  <div className="flex gap-3 p-3 bg-white rounded-lg max-w-96">
                    <p className="text-gray-700">Hey Bob, how's it going?</p>
                  </div>
                </div>

                <div className="flex justify-end mb-4 cursor-pointer">
                  <div className="flex gap-3 p-3 text-white bg-indigo-500 rounded-lg max-w-96">
                    <p>Hi Alice! I'm good, just finished a great book. How about you?</p>
                  </div>
                  <div className="flex items-center justify-center ml-2 rounded-full w-9 h-9">
                    <img
                      src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                      alt="My Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                </div>

                <div className="flex mb-4 cursor-pointer">
                  <div className="flex items-center justify-center mr-2 rounded-full w-9 h-9">
                    <img
                      src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                  <div className="flex gap-3 p-3 bg-white rounded-lg max-w-96">
                    <p className="text-gray-700">That book sounds interesting! What's it about?</p>
                  </div>
                </div>

                <div className="flex justify-end mb-4 cursor-pointer">
                  <div className="flex gap-3 p-3 text-white bg-indigo-500 rounded-lg max-w-96">
                    <p>
                      It's about an astronaut stranded on Mars, trying to survive. Gripping stuff!
                    </p>
                  </div>
                  <div className="flex items-center justify-center ml-2 rounded-full w-9 h-9">
                    <img
                      src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                      alt="My Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                </div>

                <div className="flex mb-4 cursor-pointer">
                  <div className="flex items-center justify-center mr-2 rounded-full w-9 h-9">
                    <img
                      src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                  <div className="flex gap-3 p-3 bg-white rounded-lg max-w-96">
                    <p className="text-gray-700">
                      I'm intrigued! Maybe I'll borrow it from you when you're done?
                    </p>
                  </div>
                </div>

                <div className="flex justify-end mb-4 cursor-pointer">
                  <div className="flex gap-3 p-3 text-white bg-indigo-500 rounded-lg max-w-96">
                    <p>Of course! I'll drop it off at your place tomorrow.</p>
                  </div>
                  <div className="flex items-center justify-center ml-2 rounded-full w-9 h-9">
                    <img
                      src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                      alt="My Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                </div>

                <div className="flex mb-4 cursor-pointer">
                  <div className="flex items-center justify-center mr-2 rounded-full w-9 h-9">
                    <img
                      src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                  <div className="flex gap-3 p-3 bg-white rounded-lg max-w-96">
                    <p className="text-gray-700">Thanks, you're the best!</p>
                  </div>
                </div>

                <div className="flex justify-end mb-4 cursor-pointer">
                  <div className="flex gap-3 p-3 text-white bg-indigo-500 rounded-lg max-w-96">
                    <p>Anytime! Let me know how you like it. 😊</p>
                  </div>
                  <div className="flex items-center justify-center ml-2 rounded-full w-9 h-9">
                    <img
                      src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                      alt="My Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                </div>

                <div className="flex mb-4 cursor-pointer">
                  <div className="flex items-center justify-center mr-2 rounded-full w-9 h-9">
                    <img
                      src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                  <div className="flex gap-3 p-3 bg-white rounded-lg max-w-96">
                    <p className="text-gray-700">So, pizza next week, right?</p>
                  </div>
                </div>

                <div className="flex justify-end mb-4 cursor-pointer">
                  <div className="flex gap-3 p-3 text-white bg-indigo-500 rounded-lg max-w-96">
                    <p>Absolutely! Can't wait for our pizza date. 🍕</p>
                  </div>
                  <div className="flex items-center justify-center ml-2 rounded-full w-9 h-9">
                    <img
                      src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                      alt="My Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                </div>
                <div className="flex mb-4 cursor-pointer">
                  <div className="flex items-center justify-center mr-2 rounded-full w-9 h-9">
                    <img
                      src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                  <div className="flex gap-3 p-3 bg-white rounded-lg max-w-96">
                    <p className="text-gray-700">Hoorayy!!</p>
                  </div>
                </div> */}
              </div>

              <footer className="absolute bottom-0 w-2/4 p-4 bg-white border-t border-gray-300">
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
                  />
                  <button className="px-4 py-2 ml-2 text-white bg-indigo-500 rounded-md">
                    Send
                  </button>
                </div>
              </footer>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default TableSampleClients
