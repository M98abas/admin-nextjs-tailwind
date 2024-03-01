import { mdiTrendingDown, mdiTrendingNeutral, mdiTrendingUp } from '@mdi/js'
import React from 'react'
import { Client } from '../../interfaces'
import CardBox from '.'
import PillTag from '../PillTag'
import UserAvatar from '../UserAvatar'
import moment from 'moment'

type Props = {
  client: Client
}

const CardBoxClient = (props: Props) => {
  const pillColor = () => {
    if (props.client.referingPoints >= 50) {
      return 'success'
    }
    if (props.client.referingPoints >= 40) {
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
          <img
            src={props.client.imageUrl}
            className="w-12 h-12 mr-2 rounded-full"
            alt={props.client.imageUrl}
          />
          <div className="overflow-hidden text-center md:text-left">
            <h4 className="text-xl text-ellipsis">{props.client.name}</h4>
            <p className="text-gray-500 dark:text-slate-400">
              {moment(props.client.created_at).format('MMM/Do/YY')} @ {props.client.nickName}
            </p>
          </div>
        </div>

        <PillTag color={pillColor()} icon={pillIcon} label={`${props.client.referingPoints}%`} />
      </div>
    </CardBox>
  )
}

export default CardBoxClient
