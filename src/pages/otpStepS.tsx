import React, { useState } from 'react'
import type { ReactElement } from 'react'
import Head from 'next/head'
import CardBox from '../components/CardBox'
import { useRouter } from 'next/router'
import { getPageTitle } from '../config'
import Cookies from 'js-cookie'
import { ApiAddData } from '../../api'
import SectionFullScreen from '../components/Section/FullScreen'
import LayoutGuest from '../layouts/Guest'

const VeryfyPage: any = () => {
  const router = useRouter()

  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData]: any = useState()
  const [error, setError] = useState(false)
  const token = Cookies.get('tokenLogin')
  const handleLogin: any = (e: any) => {
    setLoading(true)
    e.preventDefault()
    ApiAddData('sadmin/otp', { otp, tokenData: token }, (data, error) => {
      setLoading(false)
      setData(data)
      if (data.errMsg != '') {
        setError(true)
        return
      }

      Cookies.remove('tokenLogin')
      Cookies.set('token', data.token)
      setLoading(false)

      router.push('/')
    })
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('OTP sAdmin')}</title>
      </Head>

      <SectionFullScreen bg="pinkRed">
        <CardBox className="w-11/12 shadow-2xl md:w-7/12 lg:w-6/12 xl:w-4/12 hover:bg-gray-100">
          <form>
            <div className="grid gap-1 md:grid-cols-1 ">
              <div className="mb-6">
                <label
                  htmlFor="otp"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  disabled={loading}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="123456"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                onClick={handleLogin}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 flex items-center justify-center gap-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {loading ? (
                  <svg
                    version="1.1"
                    id="L1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 100 100"
                    enable-background="new 0 0 100 100"
                    className="w-8"
                  >
                    <circle
                      fill="none"
                      stroke="#fff"
                      stroke-width="6"
                      stroke-miterlimit="15"
                      stroke-dasharray="14.2472,14.2472"
                      cx="50"
                      cy="50"
                      r="44"
                    >
                      <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="rotate"
                        dur="5s"
                        from="0 50 50"
                        to="360 50 50"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>
                ) : (
                  ''
                )}
                <span>Submit</span>
              </button>
            </div>
            {error ? (
              <div>
                <h2>Error</h2>
                <span>{data.errMsg}</span>
              </div>
            ) : (
              ''
            )}
          </form>
        </CardBox>
      </SectionFullScreen>
    </>
  )
}
VeryfyPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}

export default VeryfyPage
