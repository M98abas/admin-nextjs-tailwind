import moment from 'moment'

const MomentP = ({ dateValue }) => {
  return <span>{moment(dateValue).format('YYYY/MM/DD  hh:mm A')}</span>
}

export default MomentP
