import { mdiExportVariant, mdiPlus, mdiTableBorder } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useState, useEffect } from 'react'
import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import TableSampleClients from '../../components/Table/OrderTable'
import { getPageTitle } from '../../config'
import { ApiAddData, ApiGetData } from '../../../api'
import CardBoxModal from '../../components/CardBox/Modal'
import { Select } from 'antd'
import Button from '../../components/Button'
// import axios, { AxiosRequestConfig } from 'axios'

const { Option } = Select

const TablesPage = () => {
  const columns: Array<string> = [
    'orderId',
    'Email',
    'totalPrice',
    'receivedDate',
    'isPaid',
    'Address',
    'status',
    'Created at',
    'actions',
  ]
  const [Loading, setLoading] = useState(false)
  const [enabled, setEnabled] = useState(!false)
  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [total_price, setTotal_price] = useState(0)
  const [error, setError] = useState(false)
  const [products, setProducts] = useState([])
  const [productId, setProductId] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [amount, setAmount] = useState(0)
  const [users, setUsers] = useState([])
  const [usersId, setUsersId] = useState(0)
  const [descripption, setDescripption] = useState('')
  const [notes, setNote] = useState('')
  const [receivedDate, setReceivedDate] = useState('')
  const [Adddress_name, setAdddress_name] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [floor, setFloor] = useState('')
  const [apartment, setApartment] = useState('')

  const getData = async () => {
    await ApiGetData('product', (data: any) => {
      setProducts(data)
    })
    await ApiGetData('clinet', (data: any) => {
      setUsers(data)
    })
  }
  useEffect(() => {
    getData()
  }, [])

  const handleChangeSelectUsers: any = (selectedPhoneNumbers: string[]) => {
    // Map selected phone numbers to user IDs
    const selectedUserIds: any = selectedPhoneNumbers
      .map((phoneNumber) => {
        const user = users.find((user) => user.phoneNumber === phoneNumber)
        return user ? user.id : null
      })
      .filter((id) => id !== null) // Filter out null values

    // Update state with selected user IDs
    setUsersId(selectedUserIds)
  }

  const handleChangeSelectProduct = (value: number[]) => {
    // Map selected phone numbers to user IDs
    const selectedUserIds: any = value
      .map((phoneNumber) => {
        const product = products.find((product) => product.titleEn === phoneNumber)
        return product ? product.id : null
      })
      .filter((id) => id !== null) // Filter out null values

    // Update state with selected user IDs
    setProductId(selectedUserIds)

    return
  }

  const handleModalAction = async () => {
    setError(false)
    if (quantity == 0 && productId == 0) {
      setError(true)
      return
    }
    setLoading(true)
    await ApiAddData(
      'order/manual',
      {
        productsId: productId,
        total_price,
        basket: [{ quantity, amount, descripption, productsId: productId[0] }],
        usersId: usersId[0],
        receivedDate: receivedDate[0],
        address: { Adddress_name, street, city, district: floor, closePoint: apartment, notes },
      },
      (data) => {
        if (data.error)
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
      }
    )
    setLoading(false)
    setIsModalInfoActive(false)
  }
  return (
    <>
      {!Loading ? (
        <>
          <Head>
            <title>{getPageTitle('Orders')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiTableBorder} title="Orders" main>
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
                        Choose User
                      </label>
                      <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        onChange={handleChangeSelectUsers}
                        defaultValue={1} // Set the default value as needed, but usually, it should be an empty array for multiple selection
                      >
                        {users.map((option) => (
                          <Option key={option.id} value={option.phoneNumber}>
                            {option.phoneNumber}-{option.fin_name} {option.lst_name}
                          </Option>
                        ))}
                      </Select>
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Chose product
                      </label>
                      <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        onChange={handleChangeSelectProduct}
                        defaultValue={[1]} // Set the default value as needed, but usually, it should be an empty array for multiple selection
                      >
                        {products.map((option) => (
                          <Option key={option.id} value={option.titleEn}>
                            {option.titleEn}
                          </Option>
                        ))}
                      </Select>
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Total Price
                      </label>
                      <input
                        type="text"
                        id="name"
                        onChange={(e) => setTotal_price(parseInt(e.target.value))}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Title Arabic"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        quantity
                      </label>
                      <input
                        type="text"
                        id="name"
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Title Arabic"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Amount
                      </label>
                      <input
                        type="text"
                        id="name"
                        onChange={(e) => setAmount(parseInt(e.target.value))}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Title Arabic"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        descripption
                      </label>
                      <input
                        type="text"
                        id="name"
                        onChange={(e) => setDescripption(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Title Arabic"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Received Date
                      </label>
                      <input
                        type="date"
                        id="name"
                        onChange={(e) => setReceivedDate(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Title Arabic"
                        required
                      />
                    </div>
                    <div></div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Address Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        onChange={(e) => setAdddress_name(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Title Arabic"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Street
                      </label>
                      <input
                        type="text"
                        id="name"
                        onChange={(e) => setStreet(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Title Arabic"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="name"
                        onChange={(e) => setCity(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Title Arabic"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        District
                      </label>
                      <input
                        type="text"
                        id="name"
                        onChange={(e) => setFloor(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Title Arabic"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Close Point
                      </label>
                      <input
                        type="text"
                        id="name"
                        onChange={(e) => setApartment(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Title Arabic"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Notes
                      </label>
                      <input
                        type="text"
                        id="name"
                        onChange={(e) => setNote(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Title Arabic"
                        required
                      />
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
