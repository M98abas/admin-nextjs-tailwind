import moment from 'moment'

const MomentP = ({ dateValue }) => {
  return <span>{moment(dateValue).format('YYYY/MM/DD  HH:mm')}</span>
}

export default MomentP
