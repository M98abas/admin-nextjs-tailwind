'use client'
import React, { useEffect, useState } from 'react'
import { ApiGetData } from '../../../api'
import MessageBorder from '../MessagesUtil/message'
import axios, { AxiosRequestConfig } from 'axios'
const TableSampleClients = ({ socket }) => {
  const [clients, setClient]: any = useState([])
  //console.log(clients)
  const getData = async () => {
    await ApiGetData('chat', (data: any) => {
      console.log(data)

      setClient(data)
    })
  }
  useEffect(() => {
    getData()
  }, [])

  const [ind, setInd] = useState(0)
  const [Loading, setLoading] = useState(false)
  const [isImgUrl, setIsImgUrl] = useState(false)
  // const [, setIsImgUrl] = useState(false)
  const [currentMsg, setCurrentMsg] = useState('')
  const [conversation, setConversation] = useState([])
  const [uploadProgress, setUploadProgress]: any = useState(100)
  const [enabled, setEnabled] = useState(false)

  const handelSearchInputChanged = (e) => {
    if (e.key == 'Enter' && e.target.value != '')
      clients.map((client, index) => {
        if (client.id == e.target.value || client.phoneNumber == e.target.value) {
          setInd(index)
          handleClick(client.id)
          // setIsModalInfoActive(true)
        }
      })
    return
  }
  // upload images

  const imgbb = '807b79b03a554f95b5980b6b9d688013'
  const uploadFile = async (file: any) => {
    const formdata = new FormData()
    formdata.append('image', file, file.name)

    const requestOptions: AxiosRequestConfig = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: `https://api.imgbb.com/1/upload?key=${imgbb}`,
      data: formdata,
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        setEnabled(progress === uploadProgress)
        setUploadProgress(progress)
      },
    }

    try {
      const response = await axios(requestOptions)
      setCurrentMsg(response.data.data.url)
      setIsImgUrl(true)
    } catch (error) {
      console.error(error)
    }
  }
  const handleFileUpload = (e) => {
    const fileInput = e.target
    if (!fileInput.files) {
      alert('No file was chosen')
      return
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      alert('Files list is empty')
      return
    }

    const file = fileInput.files[0]
    //console.log(file.type)

    uploadFile(file)
    /** Setting file state */
    e.currentTarget.type = 'text'
    e.currentTarget.type = 'file'
  }

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentMsg !== '') {
      const msgData: any = {
        phoneNumber: clients[ind].phoneNumber,
        content: currentMsg,
        receiverId: clients[ind].receiverId,
        isAdmin: true,
        isImgUrl,
        conversationId: clients[ind].id,
      }
      setCurrentMsg('')
      await socket.emit('sendMessage', msgData)
      setLoading(true)

      socket.on('newMessage', (data: any) => {
        // console.log('Data----> ', [...conversation, data])
        setLoading(!true)
        setConversation([...conversation, data])
      })
      setIsImgUrl(false)
      setEnabled(false)
      setCurrentMsg('')
    }
  }

  const handleClick = async (indCli) => {
    //console.log(indCli)

    setConversation([])
    setLoading(true)
    await socket.emit('getConversation', { conId: indCli })

    await socket.on('conversationData', (data) => {
      // console.log({ data })
      setLoading(false)
      setConversation([...data])
    })

    return
  }

  useEffect(() => {
    if (socket != null)
      socket.on('conversationData', (data: any) => {
        // console.log(data)
        setConversation([...data])
      })
  }, [socket])
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
          <div className="flex bg-white h-[80vh] overflow-hidden">
            <div className="w-1/4 overflow-y-auto border-r border-gray-300">
              <div className="p-3 pb-20 mb-9 h-[70vh] overflow-y-auto">
                <div className="pb-4 mb-4 bg-white dark:bg-gray-900">
                  <label htmlFor="table-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      onKeyDown={handelSearchInputChanged}
                      type="text"
                      id="table-search"
                      className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-60 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search for items"
                    />
                  </div>
                </div>
                {clients.map((client: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center p-2 mb-4 rounded-md cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setInd(index)
                      setConversation([])
                      handleClick(client.id)
                    }}
                  >
                    <div className="w-12 h-12 mr-3 bg-gray-300 rounded-full">
                      <img
                        src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                        alt="User Avatar"
                        className="w-12 h-12 rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold">{client.phoneNumber}</h2>
                      <p className="text-gray-800">
                        {client.message.length > 0
                          ? client.message[client.message.length - 1].content
                          : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex-1">
              <header className="p-4 text-gray-700 bg-white">
                <h1 className="flex justify-between pl-1 pr-1 text-2xl font-semibold">
                  <span>{ind == 0 ? 'Users' : clients[ind].phoneNumber}</span>
                  <span>{ind == 0 ? 'Users' : clients[ind].message[0]?.sender.fullName}</span>
                </h1>
              </header>

              <div className="p-4 h-[60vh] overflow-y-auto pb-8">
                {conversation.map((message: any, index: any) => (
                  <MessageBorder
                    key={index}
                    imgURL={message.isImgUrl}
                    message={message.content != '' ? message.content : message.imgUrl}
                    isContainerStyleSneder={message.isSender}
                  />
                ))}
              </div>

              <footer className="absolute bottom-0 w-full p-4 bg-white border-t border-gray-300">
                <div className="flex items-center">
                  <form
                    className={`items-center ${
                      ind != 0 ? 'flex' : 'hidden'
                    } w-full gap-4 align-middle items-center flex`}
                    onSubmit={(e: any) => sendData(e)}
                  >
                    {isImgUrl ? (
                      <a href={currentMsg} target="_blank">
                        <img src={currentMsg} alt={currentMsg} width={220} />
                      </a>
                    ) : (
                      <input
                        type="text"
                        value={!isImgUrl ? currentMsg : ''}
                        placeholder="Type a message..."
                        onChange={(e) => setCurrentMsg(e.target.value)}
                        className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
                      />
                    )}
                    <button className="px-4 py-2 ml-2 text-white bg-indigo-500 rounded-md">
                      Send
                    </button>
                    <label htmlFor="dropzone-file" className="cursor-pointer file-input-label">
                      <input
                        id="dropzone-file"
                        type="file"
                        className={`hidden`}
                        onChange={handleFileUpload}
                      />
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 transition delay-75 dark:text-gray-400 hover:scale-150"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>{' '}
                    </label>
                  </form>
                </div>
                {isImgUrl ?? <img src={currentMsg} alt="Img" className="w-60" />}
              </footer>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default TableSampleClients
