import { mdiCheckDecagram } from '@mdi/js'
import { useAppSelector } from '../stores/hooks'
import CardBox from './CardBox'
import PillTag from './PillTag'
import UserAvatarCurrentUser from './UserAvatarCurrentUser'
import moment from 'moment'

type Props = {
  className?: string
}

const UserCard = ({ className }: Props) => {
  const userName = useAppSelector((state) => state.main.userName)
  const userlastLogin = useAppSelector((state) => state.main.userLastLogin)
  console.log(userlastLogin)

  return (
    <CardBox className={className}>
      <div className="flex flex-col items-center justify-around lg:flex-row lg:justify-center">
        <UserAvatarCurrentUser className="mb-6 lg:mb-0 lg:mx-12" />
        <div className="space-y-3 text-center md:text-left lg:mx-12">
          <h1 className="text-2xl">
            Howdy, <b>{userName}</b>!
          </h1>
          <p>
            Last login from <b>{moment(userlastLogin).format('YYYY/MM/DD hh:mm A')}</b>
          </p>
          <div className="flex justify-center md:block">
            <PillTag label="Verified" color="info" icon={mdiCheckDecagram} />
          </div>
        </div>
      </div>
    </CardBox>
  )
}

export default UserCard
