import { mdiAccountReactivate, mdiSquareEditOutline, mdiTrashCan } from '@mdi/js'
import React, { useEffect, useState } from 'react'
import { useSampleClients } from '../../hooks/sampleData'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'
import { ApiDeleteData, ApiGetData, ApiUpdateData } from '../../../api'
import Datepicker from 'tailwind-datepicker-react'
import MomentP from '../MomentP'

const TableSampleClients = ({ columns }) => {
  const { clients } = useSampleClients('discount')
  console.log(clients)

  const [ids, setIds] = useState(0)
  const [id, setid] = useState(0)
  const [value, setValue] = useState(0)
  const [end_at, setEnd_at] = useState('')
  const [target, setTarget] = useState('')
  const [targetTitle, setTargetTitle] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState(false)
  const [ind, setInd] = useState(0)
  const [category, setCategory] = useState([])
  const [brand, setBrand] = useState([])
  const [product, setProduct] = useState([])
  const [subCategory, setSubCategory] = useState([])
console.log();

  const getData = async () => {
    await ApiGetData('category', (data) => {
      setCategory(data)
    })
    await ApiGetData('product', (data) => {
      setProduct(data)
    })
    await ApiGetData('product', (data) => {
      setProduct(data)
    })
    await ApiGetData('brand', (data) => {
      setBrand(data)
    })
    await ApiGetData('subCategory', (data) => {
      setSubCategory(data)
    })
  }
  useEffect(() => {
    getData()
  }, [])

  const SearchData: any = (titleCat: any) => {
    console.log(titleCat)

    // Define the mappings for each category type
    const mappings: { [key: string]: any[] } = {
      Product: product,
      Category: category,
      subCategory: subCategory,
      Brand: brand,
    }

    // Get the relevant array based on the titleCat
    const dataArr = mappings[titleCat]

    if (dataArr) {
      dataArr.forEach((dataProd: any) => {
        // console.log(clients[ind].target_id === dataProd.id)

        console.log(clients[ind].target_id, dataProd.id)
        if (clients[ind].target_id === dataProd.id) {
          setTargetTitle(dataProd.titleAr)
          return
        }
      })
    }
    return
  }

  useEffect(() => {
    SearchData(clients[ind]?.target)
  }, [ind])

  const [Loading, setLoading] = useState(false)
  const perPage = 10

  const [currentPage, setCurrentPage] = useState(0)

  const clientsPaginated = clients.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = Math.ceil(clients.length / perPage)

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }
  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)

  // Date Picker
  const options: any = {
    title: 'Pick date',
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    maxDate: new Date('2030-08-01'),
    minDate: new Date(),
    theme: {
      background: 'bg-white dark:bg-black-800',
      todayBtn: '',
      clearBtn: '',
      icons: '',
      text: '',
      disabledText: 'bg-blue-500',
      input: '',
      inputIcon: '',
      selected: '',
    },
    icons: {
      // () => ReactElement | JSX.Element
      prev: () => <span>Previous</span>,
      next: () => <span>Next</span>,
    },
    datepickerClassNames: 'top-12',
    defaultDate: new Date(clients[ind]?.end_at),
    language: 'en',
  }

  const handelDeleteAction = async () => {
    setLoading(true)
    await ApiGetData(`discount/delete/${id}`, (data) => {
      if (data.error) {
        setError(true)
        setLoading(false)
      }
      return
    })

    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
    setLoading(false)
  }

  const handleModalAction = async () => {
    setLoading(true)
    await ApiUpdateData('discount', { id, value, end_at, target, ids }, (data) => {
      console.log('Date Table -->', data)

      if (!data) {
        setError(true)
        // setLoading(false)
        // return
      }
      setLoading(false)

      return
    })
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
            title="Sample modal"
            buttonColor="info"
            buttonLabel="Done"
            classData="h-[60vh] xl:w-8/12"
            isActive={isModalInfoActive}
            onConfirm={handleModalAction}
            onCancel={handleModalAction}
          >
            <form>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Value in %
                  </label>
                  <input
                    type="text"
                    id="name"
                    onChange={(e) => setValue(parseInt(e.target.value))}
                    defaultValue={clients[ind]?.value}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="10%, 20% ...."
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    End at
                  </label>
                  <div className="relative max-w-sm">
                    <Datepicker
                      options={options}
                      onChange={(dateSelected: any) => setEnd_at(dateSelected)}
                      show={show}
                      setShow={(e: boolean) => setShow(e)}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Category(s)
                  </label>
                  <p>{clients[ind]?.target}</p>
                </div>
                <div>
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Sub-Category
                  </label>
                  <p>{targetTitle}</p>
                </div>
              </div>
              {error ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <span className="font-medium">Danger alert!</span> Kindly fill the empty fields.
                </div>
              ) : (
                ''
              )}
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
              Are you sure you want to delete this <b> {clients[ind]?.text} </b> ??
            </p>
          </CardBoxModal>

          <table className="P-4">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clientsPaginated.map((client: any, index: number) => (
                <tr key={client.id}>
                  <td className="border-b-0 lg:w-6 before:hidden"> {client.target} </td>
                  <td data-label="nickName">{client.value}</td>
                  <td data-label="nickName">
                    <MomentP dateValue={client.end_at} />
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
                          <Button
                            color="info"
                            icon={mdiSquareEditOutline}
                            onClick={() => {
                              setInd(index)
                              // console.log(client.id)

                              setid(client.id)
                              setIsModalInfoActive(true)
                              // SearchData(client.target)
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
