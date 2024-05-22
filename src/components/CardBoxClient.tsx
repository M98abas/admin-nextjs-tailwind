import { mdiTrendingDown, mdiTrendingNeutral, mdiTrendingUp } from '@mdi/js'
import React from 'react'
import { Client } from '../interfaces'
import CardBox from './CardBox'
import PillTag from './PillTag'
import UserAvatar from './UserAvatar'
import MomentP from './MomentP'

type Props = {
  client: Client
}

const CardBoxClient = (props: Props) => {
  const pillColor = () => {
    if (props.client.order?.length >= 20) {
      return 'success'
    }
    if (props.client.order?.length >= 10) {
      return 'warning'
    }

    return 'danger'
  }

  const pillIcon = {
    success: mdiTrendingUp,
    warning: mdiTrendingNeutral,
    danger: mdiTrendingDown,
  }[pillColor()]

  return (
    <CardBox className="mb-6 last:mb-0">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div className="flex flex-col items-center justify-start mb-6 md:flex-row md:mb-0">
          <UserAvatar className="w-12 h-12 mb-6 md:mr-6 md:mb-0" username={props.client.fullName} />
          <div className="overflow-hidden text-center md:text-left">
            <h4 className="text-xl text-ellipsis">{props.client.fullName}</h4>
            <p className="text-gray-500 dark:text-slate-400">
              <MomentP dateValue={props.client.created_at}></MomentP>
            </p>
          </div>
        </div>

        <PillTag color={pillColor()} icon={pillIcon} label={`${props.client?.order?.length}%`} />
      </div>
    </CardBox>
  )
}

export default CardBoxClient
