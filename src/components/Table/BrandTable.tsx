import {
  mdiAccountReactivate,
  mdiMonitorCellphone,
  mdiSquareEditOutline,
  mdiTableOff,
  mdiTrashCan,
} from '@mdi/js'
import React, { useState } from 'react'
import { useSampleClients } from '../../hooks/sampleData'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'
import { ApiAddData, ApiDeleteData } from '../../../api'
import NotificationBar from '../NotificationBar'
import Image from 'next/image'
import axios, { AxiosRequestConfig } from 'axios'
import MomentP from '../MomentP'

const TableSampleClients = ({ columns }) => {
  const { clients } = useSampleClients('brand')
  console.log({ clients })

  const [enabled, setEnabled] = useState(false)

  const [titleAr, setTitleAr] = useState('')
  const [descriptionAr, setDescriptionAr] = useState('')
  const [titleEn, setTitleEn] = useState('')
  const [descriptionEn, setDescriptionEn] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)
  const [ind, setInd] = useState(0)
  // const router = useRouter()
  const [id, setid] = useState()
  const [Loading, setLoading] = useState(false)
  const perPage = 15
  const [notificationnActive, setNotificationnActive] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [uploadProgress, setUploadProgress]: any = useState(100)
  const [imgURL, setimgURL] = useState('')

  const clientsPaginated = clients.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = Math.ceil(clients.length / perPage)
  console.log()

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleItemClick = (id: string) => {
    const selectedItem = clients.findIndex((client: any) => client.id === id)
    if (selectedItem !== -1) {
      // console.log(selectedItem)
      // Assuming setInd is used to set the selected item or index
      setInd(selectedItem) // or setInd(clients.indexOf(selectedItem)) if you still need the index
      setIsModalInfoActive(true)
    }
  }

  const filteredItems = clients.filter(
    (item: any) =>
      item.titleAr.toLowerCase().includes(searchTerm) ||
      item.titleEn.toLowerCase().includes(searchTerm)
  )
  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase())
  }

  const handleModalAction = async () => {
    setLoading(true)

    await ApiAddData(
      `brand/update/${id}`,
      { titleAr, descriptionAr, titleEn, descriptionEn, imgUrl: imgURL },
      (data) => {
        if (data.errMsg != '')
          return (
            <>
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="sr-only">Check icon</span>
              </div>
            </>
          )
        setEnabled(!enabled)
        setTitleAr('')
        setDescriptionAr('')
        setTitleEn('')
        setUploadProgress(100)
        setDescriptionEn('')
        return
      }
    )
    setLoading(false)
    setIsModalInfoActive(false)
  }

  const handelDeleteAction = async () => {
    setLoading(true)
    await ApiDeleteData('brand', id, (data) => {
      console.log(data)

      if (data) setNotificationnActive(true)
      setLoading(false)
      return
    })

    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }

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
      setimgURL(response.data.data.url)
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
    console.log(file.type)

    uploadFile(file)
    /** Setting file state */
    e.currentTarget.type = 'text'
    e.currentTarget.type = 'file'
  }
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
          {
            <CardBoxModal
              title={`Update ${clients[ind]?.titleAr}`}
              buttonColor="info"
              buttonLabel="Done"
              classData="xl:w-8/12 overflow-scroll"
              isActive={isModalInfoActive}
              onConfirm={handleModalAction}
              onCancel={() => setIsModalInfoActive(false)}
            >
              <form>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      title Arabic
                    </label>
                    <input
                      type="text"
                      id="name"
                      defaultValue={clients[ind]?.titleAr}
                      onChange={(e) => setTitleAr(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Any"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      title English
                    </label>
                    <input
                      type="text"
                      id="email"
                      defaultValue={clients[ind]?.titleEn}
                      onChange={(e) => setTitleEn(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Any data"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      description Arabic
                    </label>
                    <input
                      type="text"
                      id="name"
                      defaultValue={clients[ind]?.descriptionAr}
                      onChange={(e) => setDescriptionAr(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Any"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      description English
                    </label>
                    <input
                      type="text"
                      id="email"
                      defaultValue={clients[ind]?.descriptionEn}
                      onChange={(e) => setDescriptionEn(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Any data"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full gap-3">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-44 bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
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
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload course Image</span> or drag
                        and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        MP3 (MAX. 800x400px)
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 m-5">
                        <div
                          className={`bg-blue-600 h-2.5 rounded-full ${
                            enabled ? 'bg-green-600' : ''
                          }`}
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <p>Music Uploaded</p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                  <img src={clients[ind]?.imgUrl} width={120} height={120} alt="" />
                </div>
              </form>
            </CardBoxModal>
          }

          <CardBoxModal
            title="Please confirm"
            buttonColor="danger"
            buttonLabel="Confirm"
            isActive={isModalTrashActive}
            onConfirm={handelDeleteAction}
            onCancel={() => {
              setIsModalTrashActive(false)
              setLoading(false)
            }}
          >
            <p>
              Are you sure you want to delete this <b> {clients[ind]?.titleAr} </b> ??
            </p>
          </CardBoxModal>
          {notificationnActive ? (
            <NotificationBar color="info" icon={mdiMonitorCellphone}>
              All good
            </NotificationBar>
          ) : (
            ''
          )}

          <div className="pb-4 mb-4 bg-white dark:bg-gray-900">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <input
              onClick={toggleDropdown}
              type="button"
              id="table-search"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
            />
            {isOpen && (
              <div className="right-0 p-1 mt-2 space-y-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                {/* Search input */}
                <input
                  onChange={handleSearchInput}
                  value={searchTerm}
                  className="block w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none"
                  type="text"
                  placeholder="Search items"
                  autoComplete="off"
                />
                {/* Dropdown content */}
                {filteredItems.map((item: any, index: any) => (
                  <a
                    key={item.id}
                    href="#"
                    onClick={() => {
                      handleItemClick(item.id)
                    }}
                    className="block px-4 py-2 text-gray-700 rounded-md cursor-pointer hover:bg-gray-100 active:bg-blue-100"
                  >
                    {item.titleAr} - {item.titleEn}
                  </a>
                ))}
              </div>
            )}
          </div>
          <table>
            <thead>
              <tr>
                {columns.map((col: string) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clientsPaginated.map((client: any, index: number) => (
                <tr key={client.id}>
                  <td className="border-b-0 lg:w-6 before:hidden">
                    <Image
                      width={10}
                      height={10}
                      src={client?.imgUrl}
                      alt="Brand img"
                      className="w-12 h-auto"
                    />
                  </td>
                  <td data-label="nickName">{client.titleAr}</td>
                  <td data-label="nickName">{client.titleEn}</td>
                  <td data-label="Name">{client.descriptionAr}</td>
                  <td data-label="Name">{client.descriptionEn}</td>
                  <td data-label="Created" className="lg:w-1 whitespace-nowrap">
                    <small className="text-gray-500 d ark:text-slate-400">
                      <MomentP dateValue={client.created_at} />
                    </small>
                  </td>
                  <td className="before:hidden lg:w-1 whitespace-nowrap">
                    <Buttons type="justify-start lg:justify-end gap-1" noWrap>
                      {client.active ? (
                        <div className="flex gap-1">
                          <Button
                            color="info"
                            icon={mdiSquareEditOutline}
                            onClick={() => {
                              setInd(index + currentPage * perPage)
                              setid(client.id)
                              setIsModalInfoActive(true)
                            }}
                            small
                          />
                          <Button
                            color="danger"
                            icon={mdiTrashCan}
                            onClick={() => {
                              setInd(index + currentPage * perPage)
                              setid(client.id)
                              setIsModalTrashActive(true)
                            }}
                            small
                          />
                        </div>
                      ) : (
                        <>
                          <Button
                            color="success"
                            icon={mdiAccountReactivate}
                            onClick={() => {
                              setid(client.id)
                              setIsModalTrashActive(true)
                            }}
                            small
                          />
                        </>
                      )}
                    </Buttons>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-3 border-t border-gray-100 lg:px-6 dark:border-slate-800">
            <div className="flex flex-col items-center justify-between py-3 md:flex-row md:py-0">
              <Buttons>
                {pagesList.map((page) => (
                  <Button
                    key={page}
                    active={page === currentPage}
                    label={page + 1}
                    color={page === currentPage ? 'lightDark' : 'whiteDark'}
                    small
                    onClick={() => setCurrentPage(page)}
                  />
                ))}
              </Buttons>
              <small className="mt-6 md:mt-0">
                Page {currentPage + 1} of {numPages}
              </small>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default TableSampleClients
