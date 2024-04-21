import { mdiAccountMultiple, mdiCartOutline, mdiChartTimelineVariant } from '@mdi/js'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import CardBoxWidget from '../components/CardBoxWidget'
// import { useSampleClients } from '../hooks/sampleData'
import { getPageTitle } from '../config'
import { ApiGetData } from '../../api'
import { useRouter } from 'next/router'

const Dashboard = () => {
  // const { clients } = useSampleClients()
  const router: any = useRouter()

  // const clientsListed = clients.slice(0, 4)
  const [clients, setClient] = useState([])
  const [order, setOrder] = useState([])
  const [product, setProduct] = useState([])
  const fetchData = async () => {
    await ApiGetData('clinet', (data: any) => {
      setClient(data)
    })
    await ApiGetData('order', (data: any) => {
      setOrder(data)
    })
    await ApiGetData('product', (data: any) => {
      setProduct(data)
    })
  }
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
            number={clients.length}
            label="Clients"
          />
          <CardBoxWidget
            trendLabel="Up"
            trendType="info"
            trendColor="info"
            icon={mdiCartOutline}
            iconColor="info"
            number={order.length}
            label="Orders"
          />
          <CardBoxWidget
            trendLabel="Overflow"
            trendType="warning"
            trendColor="light"
            icon={mdiChartTimelineVariant}
            iconColor="danger"
            number={product.length}
            label="Products"
          />
        </div>
      </SectionMain>
    </>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Dashboard
