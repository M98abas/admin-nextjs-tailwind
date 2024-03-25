import {
  mdiAccountReactivate,
  mdiMonitorCellphone,
  mdiSquareEditOutline,
  mdiTrashCan,
} from '@mdi/js'
import React, { useEffect, useState } from 'react'
import { useSampleClients } from '../../hooks/sampleData'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'
import { ApiAddData, ApiGetData, ApiUpdateData } from '../../../api'
import NotificationBar from '../NotificationBar'
import Image from 'next/image'
import axios, { AxiosRequestConfig } from 'axios'
import { Select } from 'antd'
import MomentP from '../MomentP'
const { Option } = Select

const TableSampleClients = ({ columns }) => {
  const { clients } = useSampleClients('product')
  console.log(clients)

  // const router = useRouter()
  const [id, setid] = useState()
  const perPage = 10

  const [titleAr, setTitleAr] = useState('')
  const [titleEn, setTitleEn] = useState('')
  const [descriptionAr, setDescriptionAr] = useState('')
  const [descriptionEn, setDescriptionEn] = useState('')
  const [departmentNameAr, setDepartmentNameAr] = useState('')
  const [departmentNameEn, setDepartmentNameEn] = useState('')
  const [mostItems, setMostItems] = useState(true)
  const [howToUse, setHowToUse] = useState('')
  const [sintificNameAR, setSintificNameAR] = useState('')
  const [sintificNameEN, setSintificNameEN] = useState('')
  const [doses, setDoses] = useState(0)
  const [barCode, setBarCode] = useState('')
  const [priceCell, setPriceCell] = useState(0.0)
  const [priceBuy, setPriceBuy] = useState(0.0)
  const [quantity, setQuantity] = useState(0)
  const [subCategoryId, setSubCategoryId] = useState(0)
  const [brandId, setBrandId] = useState(0)
  const [productTypeId, setProductTypeId] = useState(0)
  const [hoursToTake, setHoursToTake] = useState(0)
  const [productType, setProductType] = useState([])
  const [Loading, setLoading] = useState(false)
  const [subCategory, setSubCategory] = useState([])
  const [category, setCategory] = useState([])
  const [brand, setBrand] = useState([])
  const [productsTags, setProductsTags] = useState([])
  const [sideEffects, setSideEffects] = useState('')
  const [doctorRecommmand, setDoctorRecommmand] = useState(true)
  const [contentProduct, setContentProduct] = useState('')
  const [productsTagsId, setProductsTagsId] = useState([])
  const [notificationnActive, setNotificationnActive] = useState(false)
  const [imgUrl, setImgUrl] = useState([])

  const handelChange: any = (index: any) => {
    if (index) {
      setSubCategory(category[index].subcategory)
    }
    return
  }
  const getData = async () => {
    await ApiGetData('category', (data: any) => {
      setCategory(data)
    })
    await ApiGetData('brand', (data: any) => {
      setBrand(data)
    })
    await ApiGetData('productType', (data: any) => {
      setProductType(data)
    })
    await ApiGetData('tags', (data: any) => {
      setProductsTags(data)
    })
  }
  useEffect(() => {
    getData()
  }, [])

  const [currentPage, setCurrentPage] = useState(0)
  const [uploadProgress, setUploadProgress]: any = useState(100)

  const [enabled, setEnabled] = useState(false)

  const clientsPaginated = clients.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = Math.round(clients.length / perPage)

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }
  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)
  const [ind, setInd] = useState(0)
  // console.log(isModalInfoActive)
  const handleImageUpload = (e: any) => {
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

    /** File validation */
    if (!file.type.startsWith('image')) {
      alert('Please select a valide image')
      return
    }

    /** Setting file state */
    handleFileUpload(file) // we will use the file state, to send it later to the server
    e.currentTarget.type = 'text'
    e.currentTarget.type = 'file'
  }

  const imgbb = '807b79b03a554f95b5980b6b9d688013'
  const handleFileUpload = async (file: any) => {
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
      console.log(response)
      setEnabled(true)
      setImgUrl([...imgUrl, response.data.data.url])
    } catch (error) {
      console.error(error)
    }
  }


  const handelRemoveImage = async (id: any) => {
    await ApiGetData(`product/imageDelete/${id}`, (data: any) => {
      console.log(data)
    })
  }
  const handleChangeSelect = (value: number[]) => {
    setProductsTagsId(value)
    return
  }

  const handelSearchInputChanged = (e) => {
    if (e.key == 'Enter' && e.target.value != '')
      clients.map((client, index) => {
        if (
          client.id == e.target.value ||
          client.barCode == e.target.value ||
          client.titleEn == e.target.value
        ) {
          setInd(index)
          setIsModalInfoActive(true)
        }
      })
    return
  }
  const handelDeleteAction = async () => {
    setLoading(true)
    console.log(id)

    await ApiAddData(`product/active/${id}`, { active: false }, (data) => {
      if (data) setNotificationnActive(true)
      setLoading(false)
    })

    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }

  const handleModalAction = async () => {
    setLoading(true)
    await ApiUpdateData(
      'product',
      {
        id,
        productsTagsId,
        titleAr,
        titleEn,
        imgUrl,
        descriptionAr,
        descriptionEn,
        departmentNameAr,
        departmentNameEn,
        sintificNameAR,
        sintificNameEN,
        doctorRecommmand,
        contentProduct,
        howToUse,
        mostItems,
        doses,
        barCode,
        priceCell,
        priceBuy,
        quntity: quantity,
        brandId,
        subCategoryId,
        sideEffects,
        hoursToTake,
        productTypeId,
      },
      (data) => {
        if (data) setNotificationnActive(true)
        setEnabled(!enabled)
        setProductsTagsId([])
        setTitleAr('')
        setTitleEn('')
        setImgUrl([])
        setDescriptionAr('')
        setDescriptionEn('')
        setDepartmentNameAr('')
        setDepartmentNameEn('')
        setSintificNameAR('')
        setSintificNameEN('')
        setHowToUse('')
        setMostItems(false)
        setDoses(0)
        setBarCode('')
        setPriceCell(0)
        setPriceBuy(0)
        setQuantity(0)
        setBrandId(0)
        setSubCategoryId(0)
        setSideEffects('')
        setHoursToTake(0)
        setProductTypeId(0)
        setLoading(false)
      }
    )
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
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
          <CardBoxModal
            title="Add Course"
            buttonColor="info"
            buttonLabel="Done"
            classData="h-[97vh] xl:w-9/12 overflow-scroll"
            disabled={!enabled}
            isActive={isModalInfoActive}
            onConfirm={handleModalAction}
            onCancel={() => {
              setIsModalInfoActive(false)
              setInd(0)
            }}
          >
            <form>
              <div className="grid gap-6 mb-6 md:grid-cols-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title Arabic
                  </label>
                  <input
                    type="text"
                    id="name"
                    defaultValue={clients[ind]?.titleAr}
                    onChange={(e) => setTitleAr(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Title Arabic"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title English
                  </label>
                  <input
                    type="text"
                    id="email"
                    defaultValue={clients[ind]?.titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Title English"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description Arabic
                  </label>
                  <input
                    type="text"
                    id="name"
                    defaultValue={clients[ind]?.descriptionAr}
                    onChange={(e) => setDescriptionAr(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Description Arabic"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description English
                  </label>
                  <input
                    type="text"
                    id="email"
                    defaultValue={clients[ind]?.descriptionEn}
                    onChange={(e) => setDescriptionEn(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Description English"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Department Name Arabic
                  </label>
                  <input
                    type="text"
                    id="name"
                    defaultValue={clients[ind]?.departmentNameAr}
                    onChange={(e) => setDepartmentNameAr(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Department Name Arabic"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Department Name English
                  </label>
                  <input
                    type="text"
                    id="email"
                    defaultValue={clients[ind]?.descriptionEn}
                    onChange={(e) => setDepartmentNameEn(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Department Name English"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    scientific Name Arabic
                  </label>
                  <input
                    type="text"
                    id="name"
                    defaultValue={clients[ind]?.sintificNameAR}
                    onChange={(e) => setSintificNameAR(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="scientific Name Arabic"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    scientific Name English
                  </label>
                  <input
                    type="text"
                    id="email"
                    defaultValue={clients[ind]?.sintificNameEN}
                    onChange={(e) => setSintificNameEN(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="scientific Name English"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    How to use
                  </label>
                  <input
                    type="text"
                    id="email"
                    defaultValue={clients[ind]?.howToUse}
                    onChange={(e) => setHowToUse(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="How to use"
                    required
                  />
                </div>
                {/*  */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Most Items
                  </label>

                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      defaultValue={clients[ind]?.mostItems}
                      onChange={(e) => setMostItems(Boolean(e.target.value))}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    How many doses
                  </label>
                  <input
                    type="number"
                    id="email"
                    defaultValue={clients[ind]?.doses}
                    onChange={(e) => setDoses(parseInt(e.target.value))}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Any data"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    BarCode
                  </label>
                  <input
                    type="text"
                    id="email"
                    defaultValue={clients[ind]?.barCode}
                    onChange={(e) => setBarCode(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Any data"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price Cell
                  </label>
                  <input
                    type="number"
                    id="email"
                    defaultValue={clients[ind]?.price_cell}
                    onChange={(e) => setPriceCell(parseInt(e.target.value))}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Any data"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price Buy
                  </label>
                  <input
                    type="number"
                    id="email"
                    defaultValue={clients[ind]?.price_buy}
                    onChange={(e) => setPriceBuy(parseInt(e.target.value))}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Any data"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Quntity
                  </label>
                  <input
                    type="number"
                    id="email"
                    defaultValue={clients[ind]?.quntity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Any data"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Hours To Take
                  </label>
                  <input
                    type="number"
                    id="email"
                    defaultValue={clients[ind]?.howToUse}
                    onChange={(e) => setHoursToTake(parseInt(e.target.value))}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Any data"
                    required
                  />
                </div>
                <h3>Product Info</h3>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Need to doctor Recommanded
                  </label>

                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      onChange={(e) => setDoctorRecommmand(Boolean(e.target.value))}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    BarCode
                  </label>
                  <input
                    type="text"
                    id="email"
                    onChange={(e) => setContentProduct(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Any data"
                    required
                  />
                </div>
                <div></div>
                <div>
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select ProductType(s)
                  </label>
                  <select
                    data-te-select-init
                    defaultValue={clients[ind]?.productTypeId}
                    onChange={(e: any) => setProductTypeId(e.target.value)}
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {productType?.map((data: any) => (
                      <option value={data.id} key={data.id}>
                        {data.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Brand(s)
                  </label>
                  <select
                    data-te-select-init
                    defaultValue={clients[ind]?.brandId}
                    onChange={(e: any) => setBrandId(e.target.value)}
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {brand?.map((data: any) => (
                      <option value={data.id} key={data.id}>
                        {data.titleEn}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Category(s)
                  </label>
                  <select
                    data-te-select-init
                    onChange={(e: any) => handelChange(e.target.value)}
                    id="countries"
                    defaultValue={[clients[ind]?.SubCategory?.categoryId]}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {category?.map((data: any) => (
                      <option value={data.id} key={data.id}>
                        {data.titleEn}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Sub-Category(s)
                  </label>
                  <select
                    data-te-select-init
                    defaultValue={clients[ind]?.subCategoryId}
                    onChange={(e: any) => setSubCategoryId(e.target.value)}
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {subCategory?.map((data: any) => (
                      <option value={data.id} key={data.id}>
                        {data.titleEn}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Tags(s)
                  </label>
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={handleChangeSelect}
                    defaultValue={clients[ind]?.productsTags.map(({ tagsId }) => tagsId)} // Set the default value as needed, but usually, it should be an empty array for multiple selection
                  >
                    {productsTags.map((option) => (
                      <Option key={option.id} value={option.id}>
                        {option.titleEn}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Side Effect(s)
                  </label>
                  <input
                    type="text"
                    id="email"
                    onChange={(e) => setSideEffects(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Any data"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center justify-center w-full gap-5">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-54 bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                      <span className="font-semibold">Click to upload category Image</span> or drag
                      and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 m-5">
                      <div
                        className={`bg-blue-600 h-2.5 rounded-full ${
                          enabled ? 'bg-green-600' : ''
                        }`}
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                    multiple
                  />
                </label>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  {clients[ind]?.imgUrl.map((img: any) => (
                    <>
                      <div key={img.id} className="w-16">
                        <span className="close" onClick={() => handelRemoveImage(img.id)}>
                          &times;
                        </span>
                        <img src={img.url} alt="Product Img" />
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </form>
          </CardBoxModal>
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
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
              />
            </div>
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
                      width={520}
                      src={client?.imgUrl[0]?.url == '0' ? '' : client?.imgUrl[0]?.url}
                      alt="User img"
                      height={10}
                      className="w-12 h-auto"
                    />
                  </td>
                  <td data-label="nickName">{client.titleAr}</td>
                  <td data-label="Name">{client.descriptionAr}</td>
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
                              clients[index]?.productsTags.map(({ tagsId }) => tagsId)
                              setInd(index)
                              setid(client.id)
                              setIsModalInfoActive(true)
                            }}
                            small
                          />
                          <Button
                            color="danger"
                            icon={mdiTrashCan}
                            onClick={() => {
                              setInd(index)
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
