import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import Button from '../../components/Button'
import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import TableSampleClients from '../../components/Table/itemsTable'
import { getPageTitle } from '../../config'
import CardBoxModal from '../../components/CardBox/Modal'
import { ApiAddData, ApiGetData } from '../../../api'
import { mdiMonitorCellphone, mdiPlus, mdiTableBorder } from '@mdi/js'
import { Select, Space } from 'antd'
import axios, { AxiosRequestConfig } from 'axios'
import NotificationBar from '../../components/NotificationBar'
import { useRouter } from 'next/router'
const { Option } = Select

const TablesPage = () => {
  const columns: Array<string> = ['img', 'titleAr', 'departmentNameAr', 'created_at', 'actions']
  const [uploadProgress, setUploadProgress] = useState(100)
  const [enabled, setEnabled] = useState(false)
  const [imgUrl, setImgUrl] = useState([])
  const [notificationnActive, setNotificationnActive] = useState(false)
  const router: any = useRouter()

  const [titleAr, setTitleAr] = useState('')
  const [titleEn, setTitleEn] = useState('')
  const [descriptionEn, setDescriptionEn] = useState('')
  const [departmentNameAr, setDepartmentNameAr] = useState('')
  const [departmentNameEn, setDepartmentNameEn] = useState('')
  const [mostItems, setMostItems] = useState(true)
  const [doctorRecommmand, setDoctorRecommmand] = useState(true)
  const [howToUse, setHowToUse] = useState('')
  const [contentProduct, setContentProduct] = useState('')
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
  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [subCategory, setSubCategory] = useState([])
  const [category, setCategory] = useState([])
  const [brand, setBrand] = useState([])
  const [productsTags, setProductsTags] = useState([])
  const [sideEffect, setSideEffect] = useState('')
  const [productsTagsId, setProductsTagsId] = useState([])


  
  const handelChange: any = (indexSub: any) => {
    console.log(category[indexSub])

    if (indexSub != undefined) {
      setSubCategory(category[indexSub].subcategory)
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
  }, [router])

  const handelRemoveImage = async (indexToRemove: any) => {
    const newImgUrl = imgUrl.filter((_, index) => index !== indexToRemove)
    setImgUrl(newImgUrl)
    return
  }

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

  const handleModalAction = async () => {
    setLoading(true)

    await ApiAddData(
      'product',
      {
        productsTagsId,
        titleAr,
        titleEn,
        imgUrl,
        doctorRecommmand,
        descriptionAr: descriptionEn,
        descriptionEn,
        departmentNameAr,
        departmentNameEn,
        sintificNameAR: sintificNameEN,
        sintificNameEN,
        howToUse,
        contentProduct,
        mostItems,
        doses,
        barCode,
        price_cell: priceCell,
        price_buy: priceBuy,
        quntity: quantity,
        brandId,
        subCategoryId,
        sideEffect,
        hoursToTake,
        productTypeId,
      },
      (data) => {
        console.log(data)

        if (data.status) setNotificationnActive(true)
        setEnabled(!enabled)
        setProductsTagsId([])
        setTitleAr('')
        setTitleEn('')
        setImgUrl([])
        setDescriptionEn('')
        setDepartmentNameAr('')
        setContentProduct('')
        setDepartmentNameEn('')
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
        setSideEffect('')
        setHoursToTake(0)
        setDoctorRecommmand(true)
        setProductTypeId(0)

        return
      }
    )
    setLoading(false)
    setIsModalInfoActive(false)
  }

  const handleChangeSelect = (value: number[]) => {
    console.log(value)

    setProductsTagsId(value)
    return
  }
  return (
    <>
      {!Loading ? (
        <>
          <Head>
            <title>{getPageTitle('Products')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiTableBorder} title="Products" main>
              <Button
                onClick={() => setIsModalInfoActive(true)}
                label="Add New"
                color="contrast"
                icon={mdiPlus}
                roundedFull
                small
              />
            </SectionTitleLineWithButton>

            <CardBox className="mb-6" hasTable>
              {notificationnActive ? (
                <NotificationBar color="info" icon={mdiMonitorCellphone}>
                  All good
                </NotificationBar>
              ) : (
                ''
              )}
              <TableSampleClients columns={columns} />
              <CardBoxModal
                title="Add Course"
                buttonColor="info"
                buttonLabel="Done"
                classData="h-[97vh] xl:w-9/12 overflow-scroll"
                disabled={!enabled}
                isActive={isModalInfoActive}
                onConfirm={handleModalAction}
                onCancel={() => setIsModalInfoActive(false)}
              >
                <form>
                  <div className="grid gap-6 mb-6 md:grid-cols-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        medicine name in Arabic
                      </label>
                      <input
                        type="text"
                        id="name"
                        onChange={(e) => setTitleAr(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="medicine name in Arabic"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        medicine name in English
                      </label>
                      <input
                        type="text"
                        id="email"
                        onChange={(e) => setTitleEn(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="medicine name in English"
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
                        onChange={(e) => setDepartmentNameEn(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Department Name English"
                        required
                      />
                    </div>
                    {/* <div></div> */}
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
                        Doses
                      </label>
                      <input
                        type="number"
                        id="email"
                        max={10000}
                        onChange={(e) => setDoses(parseInt(e.target.value))}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Any data"
                        required
                        inputMode="numeric"
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
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Any data"
                        required
                      />
                    </div>
                    <div></div>
                    <div></div>
                    <div></div>

                    <h3>Product Info</h3>
                    <div></div>
                    <div></div>
                    <div></div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Need to Prescription
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
                        Content Product
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
                    <div>
                      <label
                        htmlFor="countries"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Select ProductType(s)
                      </label>
                      <select
                        data-te-select-init
                        defaultValue="none"
                        onChange={(e: any) => setProductTypeId(e.target.value)}
                        id="countries"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="none">Choose The target</option>
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
                        defaultValue="none"
                        onChange={(e: any) => setBrandId(e.target.value)}
                        id="countries"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="none">Choose The target</option>
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
                        defaultValue="none"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="none">Choose The target</option>
                        {category?.map((data: any, index: any) => (
                          <option value={index} key={data.id}>
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
                        defaultValue="none"
                        onChange={(e: any) => setSubCategoryId(e.target.value)}
                        id="countries"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="none">Choose The target</option>
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
                        defaultValue={[]} // Set the default value as needed, but usually, it should be an empty array for multiple selection
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
                        onChange={(e) => setSideEffect(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Any data"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-full">
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
                          <span className="font-semibold">Click to upload category Image</span> or
                          drag and drop
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
                      {imgUrl.map((img: any, index: number) => (
                        <>
                          <div key={index} className="w-16">
                            <span className="close" onClick={() => handelRemoveImage(index)}>
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
            </CardBox>
          </SectionMain>
        </>
      ) : (
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
    </>
  )
}

TablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default TablesPage
