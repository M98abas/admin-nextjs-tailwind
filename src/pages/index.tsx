import {
  mdiAccountGroup,
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
} from '@mdi/js'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import CardBoxWidget from '../components/CardBoxWidget'
// import { useSampleClients } from '../hooks/sampleData'
import { getPageTitle } from '../config'
import { ApiAddData, ApiGetData } from '../../api'
import { useRouter } from 'next/router'
import CardBoxClient from '../components/CardBoxClient'

const Dashboard = () => {
  // const { clients } = useSampleClients()
  const router: any = useRouter()

  const [order, setOrder] = useState([])
  const handelChangeDate: any = async (e: any) => {
    await ApiAddData(`order/dateOrder`, { createdDate: e.target.value }, (data) => {
      console.log(data)

      setOrder(data.data)
    })
    console.log(e.target.value)
  }
  // const clientsListed = clients.slice(0, 4)
  const [clients, setClient]: any = useState(0)
  const [clientsLastLogin, setClienstLastLogin]: any = useState([])
  const [product, setProduct] = useState(0)
  const fetchData = async () => {
    await ApiGetData('clinet/count-users', (data: any) => {
      // console.log(data)

      setClient(data)
    })
    await ApiGetData('clinet/lastLogin', (data: any) => {
      console.log({ data })

      setClienstLastLogin(data)
    })
    await ApiGetData('order/countOrder', (data: any) => {
      console.log(data)

      setOrder(data)
    })
    console.log()

    await ApiGetData('product/countPro', (data: any) => {
      setProduct(data)
    })
  }
  const statusList = {
    'طلب جديد': 'contrast',
    'قيد التجهيز': 'warning',
    'قيد التوصيل': 'success',
    'تم الاستلام': 'info',
    'تم الرفض': 'danger',
    '0': 'info',
  }
  // countOrder
  useEffect(() => {
    fetchData()
  }, [router])

  return (
    <>
      <Head>
        <title>{getPageTitle('Dashboard')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title="Overview"
          main
        ></SectionTitleLineWithButton>

        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
          <CardBoxWidget
            trendLabel="All users"
            trendType="up"
            trendColor="success"
            icon={mdiAccountMultiple}
            iconColor="success"
            number={clients}
            label="Clients"
          />
          <CardBoxWidget
            trendLabel="Overflow"
            trendType="warning"
            trendColor="light"
            icon={mdiChartTimelineVariant}
            iconColor="danger"
            number={product}
            label="Products"
          />
        </div>

        <SectionTitleLineWithButton
          icon={mdiAccountGroup}
          title="Users Statics"
          main
        ></SectionTitleLineWithButton>

        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
          {clientsLastLogin.map((clientLast: any) => (
            <CardBoxClient key={clientLast.id} client={clientLast} />
          ))}
        </div>
        <SectionTitleLineWithButton icon={mdiCartOutline} title="Orders Statics" main>
          <input
            type="date"
            name="date"
            id="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handelChangeDate}
          />
        </SectionTitleLineWithButton>

        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
          {order.map((ord: any, index: any) => {
            if (ord.status != 'تم الاستلام') return
            return (
              <>
                <CardBoxWidget
                  key={index}
                  trendLabel="ناتج المبيعات الكلية"
                  trendType="success"
                  trendColor={statusList[ord.status]}
                  icon={mdiCartOutline}
                  iconColor="info"
                  number={ord?._sum?.total_price}
                  label={'المبلغ الكلي بالدينا العراقي'}
                />
              </>
            )
          })}
        </div>
        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
          {order.map((ord: any, index: any) => {
            return (
              <>
                <CardBoxWidget
                  key={index}
                  trendLabel="Up"
                  trendType="success"
                  trendColor={statusList[ord.status]}
                  icon={mdiCartOutline}
                  iconColor="info"
                  number={ord?._count?.status}
                  label={ord.status}
                />
              </>
            )
          })}
        </div>
      </SectionMain>
    </>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Dashboard
