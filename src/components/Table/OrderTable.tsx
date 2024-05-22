import {
  mdiAccountReactivate,
  mdiMonitorCellphone,
  mdiSquareEditOutline,
  mdiTrashCan,
  mdiDownloadCircleOutline,
  mdiExportVariant,
  mdiExclamation,
  mdiCheckCircleOutline,
  mdiPlusCircleOutline,
} from '@mdi/js'
import React, { useEffect, useState } from 'react'
import { useSampleClients } from '../../hooks/sampleData'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'
import { ApiUpdateData, ApiAddData, ApiGetData, ApiUpdateDataOrder } from '../../../api'
import NotificationBar from '../NotificationBar'
import MomentP from '../MomentP'
import CustomInvoice from '../CustomInvoice'
import { CSVLink } from 'react-csv'
import Icon from '../Icon'
import { Dropdown, Select, Space } from 'antd'
const { Option } = Select

const TableSampleClients = ({ columns }) => {
  const { clients } = useSampleClients('order')
  console.log(clients)

  const [id, setid] = useState()
  // const [status, setStatus] = useState('')
  const [Loading, setLoading] = useState(false)
  const [enabled, setEnabled] = useState(!false)
  const [products, setProducts] = useState([])

  const perPage = 10
  const [notificationnActive, setNotificationnActive] = useState(false)

  const [currentPage, setCurrentPage] = useState(0)

  const clientsPaginated = clients.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = Math.round(clients.length / perPage)

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }
  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalInfoActiveUpdate, setIsModalInfoActiveUpdate] = useState(false)
  const [isModalInvoActive, setIsModalInvoActive] = useState(false)
  const [isModalStatusActive, setIsModalStatusActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)
  const [status, setStatus] = useState('')
  const [isModalActive, setIsModalActive] = useState(false)
  const [isPaid, setIsPaid] = useState(false)
  const [ind, setInd] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [descripption, setDescripption] = useState('')
  const [receivedDate, setReceivedDate] = useState('')
  const [productId, setProductId] = useState(0)
  const [timePicked, setTimePicked] = useState('')

  /**
   *
   * @param orderItemId
   */
  const handelDeleteOrder = async (orderItemId: any) => {
    setLoading(true)
    console.log(orderItemId)

    await ApiAddData(`order/orderItem/delete/${orderItemId}`, { active: false }, (data) => {
      console.log(data)

      if (data) setNotificationnActive(true)
      setLoading(false)
    })
  }

  /**
   *
   * @param e
   * @returns
   */
  const handelSearchInputChanged = (e: any) => {
    if (e.key == 'Enter' && e.target.value != '')
      clients.map((client, index) => {
        if (client.id == e.target.value) {
          setInd(index)
          setIsModalInfoActive(true)
        }
      })
    return
  }
  // Get product
  const getData = async () => {
    await ApiGetData('product', (data: any) => {
      setProducts(data)
    })
  }
  useEffect(() => {
    getData()
  }, [])

  const handelDeleteAction = async () => {
    setLoading(true)
    console.log(id)

    await ApiAddData(`order/delete/${id}`, { active: false }, (data) => {
      if (data) setNotificationnActive(true)
      setLoading(false)
    })
    setIsModalActive(false)
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }

  const handelChangeStatus = async () => {
    setLoading(true)
    console.log(id)

    await ApiAddData(`order/change/${clients[ind]?.id}`, { active: false, status }, (data) => {
      console.log(data)

      if (data.status) {
        setLoading(false)
      }
      setIsModalStatusActive(false)
      setNotificationnActive(true)
    })
    setIsModalActive(false)
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }

  const handelActiveAction = async () => {
    setLoading(true)
    console.log(id)

    await ApiAddData(`order/active/${id}`, { active: true }, (data) => {
      if (data) setNotificationnActive(true)
      setLoading(false)
    })
    setIsModalActive(false)
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }

  console.log()

  const handleModalAction = async () => {
    setLoading(true)
    await ApiUpdateDataOrder('order', { id, isPaid }, (data) => {
      if (data) setNotificationnActive(true)
      setLoading(false)
    })
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
    setIsModalActive(false)
  }

  // Add Basket for older
  const handleModalActionUpdate = async () => {
    setLoading(true)
    const resDate: any = `${receivedDate}T${timePicked}`
    // resDate = Date.parse(resDate)
    // console.log(receivedDate[0], timePicked, resDate)

    await ApiUpdateData(
      'order',
      {
        id: clients[ind]?.id,
        basket: [{ quantity, descripption, productsId: productId[0] }],
        receivedDate: resDate,
        isPaid,
      },
      (data: any) => {
        if (data) setNotificationnActive(true)
        setLoading(false)
      }
    )
    setLoading(false)

    setIsModalInfoActiveUpdate(false)
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
    setIsModalActive(false)
  }

  const handleCancelAction = async () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
    setIsModalActive(false)
    setIsModalInvoActive(false)
  }

  interface OptionColors {
    [key: string]: string
  }

  const optionColors: OptionColors = {
    'طلب جديد': '#FFFFFF', // White background for new order
    'قيد التجهيز': 'rgba(255, 215, 0, 0.49)', // Gold background for order in preparation
    'قيد التوصيل': 'rgba(135, 206, 235, 0.54)', // Sky blue background for order in delivery
    'تم الاستلام': 'rgba(50, 205, 50, 0.61)', // Lime green background for order received
    'تم الرفض': 'rgba(255, 0, 0, 0.38)', // Red background for rejected order
  }

  const flattenOrders = () => {
    const orders: any = clients
    const flattenedOrders = []
    orders.forEach((order: any) => {
      order.order_list.forEach((item: any) => {
        flattenedOrders.push({
          orderId: order.id,
          customer: order.users?.phoneNumber,
          orderDate: order.receivedDate,
          product: item.Products?.titleEn,
          Quantity: item.quantity,
          amount: item.amount,
        })
      })
    })
    return flattenedOrders
  }
  const dataExported = flattenOrders()
  const headers = [
    { label: 'ID', key: 'orderId' },
    { label: 'customer', key: 'customer' },
    { label: 'orderDate', key: 'orderDate' },
    { label: 'product', key: 'product' },
    { label: 'Quantity', key: 'Quantity' },
    { label: 'amount', key: 'amount' },
  ]

  const handleChangeSelectProduct = (value: number[]) => {
    // Map selected phone numbers to user IDs
    const selectedUserIds: any = value
      .map((items: any) => {
        const product = products.find((product) => product.titleEn === items)
        return product ? product.id : null
      })
      .filter((id) => id !== null) // Filter out null values

    // Update state with selected user IDs
    setProductId(selectedUserIds)

    return
  }
  console.log()

  const items: any = [
    {
      label: (
        <Button
          color="info"
          label="Edit"
          className="pl-6 pr-6"
          icon={mdiSquareEditOutline}
          onClick={() => {
            setIsModalInfoActive(true)
          }}
          small
        />
      ),
      key: 0,
    },
    {
      label: (
        <Button
          color="danger"
          label="Delete"
          className="pl-4 pr-4"
          icon={mdiTrashCan}
          onClick={() => {
            setIsModalTrashActive(true)
          }}
          small
        />
      ),
      key: 1,
    },
    {
      label: (
        <Button
          color="info"
          label="Invoice"
          className="pl-4 pr-4"
          icon={mdiDownloadCircleOutline}
          onClick={() => {
            setIsModalInvoActive(true)
          }}
          small
        />
      ),
      key: 2,
    },
  ]
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
            title={`OId --> ${clients[ind]?.id} || ${clients[ind]?.status}`}
            buttonColor="info"
            buttonLabel="Done"
            classData="h-[97vh] xl:w-8/12 overflow-scroll z-0"
            isActive={isModalInfoActive}
            onConfirm={handleModalAction}
            onCancel={handleCancelAction}
          >
            <form>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    defaultValue={clients[ind]?.users?.fullName}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John"
                    required
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact
                  </label>
                  <input
                    type="text"
                    id="name"
                    defaultValue={
                      clients[ind]?.users?.email
                        ? clients[ind]?.users?.email
                        : clients[ind]?.users?.phoneNumber
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="96477-xxxxxx"
                    required
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Total Price
                  </label>
                  <input
                    type="text"
                    id="email"
                    defaultValue={clients[ind]?.total_price.toLocaleString()}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="1000000"
                    required
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Is he Paid
                  </label>
                  <select
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={(e: any) => setIsPaid(e.target.value == 'true' ? true : false)}
                    defaultValue={clients[ind]?.isPaid} // Set the default value as needed, but usually, it should be an empty array for multiple selection
                  >
                    {/* {products.map((option) => ( */}
                    <option key={1} value={'true'}>
                      Paid
                    </option>
                    <option key={2} value={'false'}>
                      not Paid
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Status
                  </label>
                  <input
                    type="text"
                    id="email"
                    defaultValue={clients[ind]?.status}
                    onChange={(e) => setStatus(e.target.value)}
                    style={{ background: optionColors[clients[ind]?.status] }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Doe"
                    required
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    received Date
                  </label>
                  <span className="text-gray-500 dark:text-slate-400">
                    <MomentP dateValue={clients[ind]?.receivedDate} />
                  </span>
                </div>
                {clients[ind]?.content.length != 0 ? (
                  <div className="grid gap-6 mb-6 md:grid-cols-3">
                    {/* <span>{`${clients[ind]?.content[0]?.content}`}</span> */}
                    {clients[ind]?.content.map((ittem: any) => {
                      console.log(ittem)

                      return (
                        <>
                          <div key={ittem.id} className="w-16">
                            {ittem.isImage ? (
                              <a href={ittem.content} target="_blank">
                                <img
                                  src={ittem.content}
                                  alt="Product Img"
                                  className="w-40"
                                  width={200}
                                  height={200}
                                />
                              </a>
                            ) : (
                              // <span>{ittem.content}</span>
                              <span>{ittem.content}</span>
                            )}
                          </div>
                        </>
                      )
                    })}
                  </div>
                ) : (
                  ''
                )}
                <div>
                  <label
                    htmlFor="role"
                    className="flex justify-between block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    <span>Order list</span>
                    <Button
                      color="info"
                      icon={mdiPlusCircleOutline}
                      onClick={() => {
                        setIsModalInfoActiveUpdate(true)
                      }}
                      small
                    />
                  </label>
                  <table>
                    <thead>
                      <tr>
                        <th key="1">Product Name</th>
                        <th key="2">quantity</th>
                        <th key="3">amount</th>
                        <th key="4">descripption</th>
                        <th key="4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients[ind]?.order_list.map((client: any, index: number) => (
                        <tr key={index}>
                          <td data-label="nickName">{client.Products?.titleEn}</td>
                          <td data-label="nickName">{client.quantity}</td>
                          <td data-label="Name">{client.amount}</td>
                          <td data-label="Name">{client.descripption}</td>
                          <td>
                            <Button
                              color="danger"
                              icon={mdiTrashCan}
                              onClick={() => {
                                handelDeleteOrder(client.id)
                              }}
                              small
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Is user accept to have another Company of the medicine
                  </label>
                  <p className="font-thin">{clients[ind]?.isUserAgree ? 'Agree ' : 'Not Agree '}</p>
                </div>
              </div>
            </form>
          </CardBoxModal>
          <CardBoxModal
            title={`Add Basket for Order Id --> ${clients[ind]?.id}`}
            buttonColor="info"
            buttonLabel="Done"
            classData="h-[87vh] xl:w-8/12 overflow-scroll z-100"
            disabled={!enabled}
            isActive={isModalInfoActiveUpdate}
            onConfirm={handleModalActionUpdate}
            onCancel={() => setIsModalInfoActiveUpdate(false)}
          >
            <form>
              <div className="grid gap-6 mb-6 md:grid-cols-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Choose product
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
                    quantity
                  </label>
                  <input
                    type="text"
                    id="name"
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="5,6,43 ..."
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
                    placeholder="descripption"
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
                    placeholder="Received Date "
                    required
                  />
                </div>

                <h1>Other Details</h1>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </form>
          </CardBoxModal>
          <CardBoxModal
            title={`OId --> ${clients[ind]?.id} || ${clients[ind]?.status}`}
            buttonColor="info"
            buttonLabel="Done"
            classData="h-[97vh] xl:w-9/12 overflow-scroll"
            isActive={isModalInvoActive}
            onConfirm={handleCancelAction}
            onCancel={handleCancelAction}
          >
            <CustomInvoice invoiceData={clients[ind]} />
          </CardBoxModal>

          <CardBoxModal
            title="Please confirm"
            buttonColor="success"
            buttonLabel="Confirm"
            isActive={isModalActive}
            onConfirm={handelActiveAction}
            onCancel={handelDeleteAction}
          >
            <p>
              Are you sure you want to Activate <b>{clients[ind]?.email}</b>??
            </p>
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
              Are you sure you want to delete this <b> {clients[ind]?.id} </b> ??
            </p>
          </CardBoxModal>

          <CardBoxModal
            title="Please confirm"
            buttonColor="info"
            classData="h-[50vh] xl:w-6/12 overflow-scroll"
            buttonLabel="Confirm"
            isActive={isModalStatusActive}
            onConfirm={handelChangeStatus}
            onCancel={() => {
              setIsModalStatusActive(false)
              setLoading(false)
            }}
          >
            <p>
              Change status for this <b> {clients[ind]?.id} </b> to ??
            </p>

            <form className="max-w-sm mx-auto">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Select an option
              </label>
              <select
                id="countries"
                defaultValue={[`${clients[ind]?.status}`]}
                onChange={(e: any) => setStatus(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={'Checked'}>Choose a Status</option>
                <option value="طلب جديد">طلب جديد</option>
                <option value="قيد التجهيز">قيد التجهيز</option>
                <option value="قيد التوصيل">قيد التوصيل</option>
                <option value="تم الاستلام">تم الاستلام</option>
                <option value="تم الرفض">تم الرفض</option>
              </select>
            </form>
          </CardBoxModal>
          {notificationnActive ? (
            <NotificationBar color="info" icon={mdiMonitorCellphone}>
              All good
            </NotificationBar>
          ) : (
            ''
          )}

          <div className="flex items-center justify-between p-3 align-middle">
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
            <div className="p-2 text-white transition-all delay-100 bg-blue-800 rounded hover:bg-blue-300">
              <CSVLink data={dataExported} headers={headers} filename={'example.csv'}>
                Export CSV
              </CSVLink>
            </div>
          </div>
          <table className="text-center">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th style={{ width: 10 }} key={col}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="justify-center">
              {clientsPaginated.map((client: any, index: number) => (
                <tr key={client.id}>
                  <td style={{ width: 10 }} data-label="nickName">
                    {client.id.substring(0, 8)}
                  </td>
                  <td data-label="nickName">{client.users?.email ?? client.users?.phoneNumber}</td>
                  <td data-label="Name">
                    {client.total_price ? client.total_price.toLocaleString() : client.total_price}
                  </td>

                  <td data-label="nickName">
                    <small className="text-gray-500 dark:text-slate-400">
                      <MomentP dateValue={client.receivedDate} />
                    </small>
                  </td>
                  <td data-label="nickName">
                    {client.isPaid ? (
                      <Icon path={mdiCheckCircleOutline} size={20} />
                    ) : (
                      <Icon path={mdiExclamation} size={20} />
                    )}{' '}
                  </td>
                  <td data-label="Name">{client.Addresses?.city}</td>
                  <td
                    data-label="Name"
                    style={{
                      background: optionColors[client.status],
                      width: 200,
                      height: 40,
                    }}
                  >
                    {client.status}
                  </td>
                  <td data-label="Created" className="lg:w-1 whitespace-nowrap">
                    <small className="text-gray-500 dark:text-slate-400">
                      <MomentP dateValue={client.created_at} />
                    </small>
                  </td>
                  <td className="before:hidden lg:w-1 whitespace-nowrap">
                    <Buttons type="justify-start lg:justify-end gap-1" noWrap>
                      {client.active ? (
                        <div className="flex gap-1">
                          <Dropdown
                            menu={{ items }}
                            trigger={['click']}
                            key={index}
                            className="justify-center p-2 pl-4 pr-4 transition-all delay-100 rounded cursor-pointer hover:bg-slate-400"
                          >
                            <a
                              onClick={(e) => {
                                setInd(index)
                                setid(client.id)
                              }}
                            >
                              <Space>
                                Actions
                                {/* <mdiChevronDown /> */}
                              </Space>
                            </a>
                          </Dropdown>
                          <Button
                            color="whiteDark"
                            className="pl-4 pr-4"
                            icon={mdiDownloadCircleOutline}
                            onClick={() => {
                              setInd(index + 10 * currentPage)
                              setIsModalStatusActive(true)
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
                              setIsModalActive(true)
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
