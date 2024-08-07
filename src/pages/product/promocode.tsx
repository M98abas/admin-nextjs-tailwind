import { mdiMonitorCellphone, mdiPlus, mdiTableBorder } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import Button from '../../components/Button'
import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import TableSampleClients from '../../components/Table/PromoCodeTable'
import { getPageTitle } from '../../config'
import CardBoxModal from '../../components/CardBox/Modal'
import { ApiAddData, ApiGetData } from '../../../api'
import Datepicker from 'tailwind-datepicker-react'
import NotificationBar from '../../components/NotificationBar'

const TablesPage = () => {
  const columns: Array<string> = [
    'Text',
    'percentage',
    'availableFor',
    'target',
    'constValue',
    'directTo',
    'End at',
    'Created At',
    'actions',
  ]
  //   initTE({ Select })
  const [text, setText] = useState('')
  const [end_at, setEnd_at] = useState('')
  const [timeChangeing, setTimeChangeing] = useState('')
  const [target, setTarget] = useState('')
  const [minSpent, setMinSpent] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [availableFor, setAvailableFor] = useState(0)
  const [constValue, setConstValue] = useState(0)
  const [directTo, setDirectTo] = useState('')
  const [error, setError] = useState(false)
  const [Loading, setLoading] = useState(false)
  const [category, setCategory] = useState([])

  const [notificationnActiveIssue, setNotificationnActiveIssue] = useState(false)
  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [show, setShow] = useState(false)

  const handelChangeTarget: any = (index: any) => {
    if (index) {
      setDirectTo(index)
    }
    return
  }

  const handleModalAction = async () => {
    setError(false)
    if (text == '' && availableFor == 0) {
      setError(true)
      return
    }
    setLoading(true)
    const dateTimeValue: any = `${end_at}T${timeChangeing}`
    if (
      text == '' ||
      availableFor == 0 ||
      // target == '' ||
      directTo == '' ||
      end_at == '' ||
      minSpent == 0
    ) {
      console.log(
        text == '',
        availableFor == 0,
        target == '',
        directTo == '',
        end_at == '',
        minSpent == 0
      )

      setNotificationnActiveIssue(true)
      setLoading(!true)

      return
    }
    await ApiAddData(
      'promocode',
      {
        text,
        percentage,
        availableFor,
        target,
        constValue,
        directTo,
        end_at: dateTimeValue,
        minSpent,
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
            <title>{getPageTitle('Promocode')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiTableBorder} title="Promocode" main>
              <Button
                onClick={() => setIsModalInfoActive(true)}
                label="Add New"
                color="contrast"
                roundedFull
                icon={mdiPlus}
                small
              />
            </SectionTitleLineWithButton>

            <CardBox className="mb-6" hasTable>
              <TableSampleClients columns={columns} />
              <CardBoxModal
                title="Add Promocode"
                buttonColor="info"
                buttonLabel="Done"
                classData="h-[75vh] xl:w-8/12 overflow-scroll"
                isActive={isModalInfoActive}
                onConfirm={handleModalAction}
                onCancel={() => setIsModalInfoActive(false)}
              >
                {' '}
                <form>
                  <div onClick={() => setNotificationnActiveIssue(false)}>
                    {notificationnActiveIssue ? (
                      <NotificationBar color="info" icon={mdiMonitorCellphone}>
                        There something wrong, kindly check data
                      </NotificationBar>
                    ) : (
                      ''
                    )}
                  </div>

                  <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        PromoCode title
                      </label>
                      <input
                        type="text"
                        id="name"
                        onChange={(e) => setText(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="1ccFeb24"
                        required
                      />
                    </div>
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
                        onChange={(e) => setPercentage(parseInt(e.target.value))}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="10%, 20% ...."
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        End at
                      </label>
                      <div className="flex gap-5">
                        <div className="relative max-w-sm">
                          <input
                            type="date"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="date"
                            onChange={(e: any) => {
                              setEnd_at(e.target.value)
                            }}
                          />
                        </div>
                        <div className="flex">
                          <input
                            type="time"
                            id="time"
                            className="rounded-none rounded-s-lg bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            min="09:00"
                            max="18:00"
                            onChange={(e) => setTimeChangeing(e.target.value)}
                            defaultValue={timeChangeing}
                            required
                          />
                          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-s-0 border-s-0 rounded-e-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <svg
                              className="w-4 h-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Available for people
                      </label>
                      <input
                        type="text"
                        id="name"
                        onChange={(e) => setAvailableFor(parseInt(e.target.value))}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="10,30,40,50..."
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Constant value (Amount)
                      </label>
                      <input
                        type="text"
                        id="name"
                        onChange={(e) => setConstValue(parseInt(e.target.value))}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="IN case promocode you need it with const value"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        minimum Spent (Amount)
                      </label>
                      <input
                        type="text"
                        id="name"
                        onChange={(e) => setMinSpent(parseInt(e.target.value))}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="IN case promocode you need it with const value"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Direct to
                      </label>
                      <select
                        data-te-select-init
                        onChange={(e: any) => handelChangeTarget(e.target.value)}
                        id="countries"
                        defaultValue="none"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="none">Choose The target</option>
                        <option value="Invoice">Invoice</option>
                        <option value="Shippment">Shippment</option>
                      </select>
                    </div>
                  </div>
                  {error ? (
                    <div
                      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      <span className="font-medium">Danger alert!</span> Kindly fill the empty
                      fields.
                    </div>
                  ) : (
                    ''
                  )}
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
