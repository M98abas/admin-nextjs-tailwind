import { mdiPlus, mdiTableBorder } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import Button from '../../components/Button'
import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import TableSampleClients from '../../components/Table/RuleTable'
import { getPageTitle } from '../../config'
import CardBoxModal from '../../components/CardBox/Modal'
import { ApiAddData, ApiGetData } from '../../../api'
import FormCheckRadio from '../../components/FormCheckRadio'
import { Field } from 'formik'
// import axios, { AxiosRequestConfig } from 'axios'

const TablesPage = () => {
  const columns: Array<string> = ['name', 'description', 'created_at', 'actions']

  const [enabled, setEnabled] = useState(false)
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
  const [productType, setProductType] = useState([])
  const [Loading, setLoading] = useState(false)
  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [inputs, setInputs] = useState([{ title: '', description: '', type: '' }])
  const [subCategory, setSubCategory] = useState([])
  const [category, setCategory] = useState([])
  const [brand, setBrand] = useState([])
  
  // TODO: Make Tags, sideEffect, and img uploading
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
  }
  useEffect(() => {
    getData()
  }, [])
  const handleModalAction = async () => {
    setLoading(true)

    await ApiAddData(
      'Product',
      {
        titleAr,
        titleEn,
        descriptionAr,
        descriptionEn,
        departmentNameAr,
        departmentNameEn,
        sintificNameAR,
        sintificNameEN,
        howToUse,
        mostItems,
        doses,
        barCode,
        priceCell,
        priceBuy,
        quantity,
        brandId,
        subCategoryId,
        productTypeId,
      },
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
        setInputs([])
        return
      }
    )
    setLoading(false)
    setIsModalInfoActive(false)
  }

  const handleChange = (index: any, event: any, field: any) => {
    const values = [...inputs]
    values[index][field] = event.target.value
    setInputs(values)
    console.log(inputs)
  }

  const handleAddInput = () => {
    setInputs([...inputs, { title: '', description: '', type: '' }])
  }

  const handleRemoveInput = (index: any) => {
    const values = [...inputs]
    values.splice(index, 1)
    setInputs(values)
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
              <TableSampleClients columns={columns} />
              <CardBoxModal
                title="Add Course"
                buttonColor="info"
                buttonLabel="Done"
                classData="h-[95vh] xl:w-8/12"
                disabled={enabled}
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
                        Title Arabic
                      </label>
                      <input
                        type="text"
                        id="name"
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
                        Title English
                      </label>
                      <input
                        type="text"
                        id="email"
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
                        Description Arabic
                      </label>
                      <input
                        type="text"
                        id="name"
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
                        Description English
                      </label>
                      <input
                        type="text"
                        id="email"
                        onChange={(e) => setDescriptionEn(e.target.value)}
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
                        Department Name Arabic
                      </label>
                      <input
                        type="text"
                        id="name"
                        onChange={(e) => setDepartmentNameAr(e.target.value)}
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
                        Department Name English
                      </label>
                      <input
                        type="text"
                        id="email"
                        onChange={(e) => setDepartmentNameEn(e.target.value)}
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
                        scientific Name Arabic
                      </label>
                      <input
                        type="text"
                        id="name"
                        onChange={(e) => setSintificNameAR(e.target.value)}
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
                        scientific Name English
                      </label>
                      <input
                        type="text"
                        id="email"
                        onChange={(e) => setSintificNameEN(e.target.value)}
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
                        scientific Name English
                      </label>
                      <input
                        type="text"
                        id="email"
                        onChange={(e) => setHowToUse(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Any data"
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
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Toggle me
                        </span>
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
                        type="text"
                        id="email"
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
                        type="text"
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
                        type="text"
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
                        type="text"
                        id="email"
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
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