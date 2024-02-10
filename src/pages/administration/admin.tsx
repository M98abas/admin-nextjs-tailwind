import { mdiTableBorder } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import { getPageTitle } from '../../config'
import Button from '../../components/Button'
import TableSampleClients from '../../components/TableSampleClients'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import SectionMain from '../../components/SectionMain'

const TablesPage = () => {
  const columns: Array<string> = [
    'Image',
    'nickName',
    'email',
    'levelOfExperience',
    'refererCode',
    'created_at',
    'actions',
  ]

  return (
    <>
      <Head>
        <title>{getPageTitle('Constractor')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiTableBorder} title="Constractor" main>
          <Button label="constractors" color="contrast" roundedFull small />
        </SectionTitleLineWithButton>
        <CardBox className="mb-6" hasTable>
          <TableSampleClients columns={columns} />
        </CardBox>
      </SectionMain>
    </>
  )
}

TablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default TablesPage
