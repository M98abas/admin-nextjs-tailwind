const MessageBorder = ({ message, messageStyle = '', isContainerStyleSneder = true }) => {
  const styleContainerClassNmae = isContainerStyleSneder
    ? `flex justify-end mb-4 cursor-pointer`
    : 'flex mb-4 cursor-pointer'
  const styleMessageClassNmae =
    messageStyle != ''
      ? `flex max-w-96 ${messageStyle} text-white rounded-lg p-3 gap-3`
      : 'flex max-w-96 text-black rounded-lg p-3 gap-3'
  return (
    <div className={styleContainerClassNmae}>
      <div className={styleMessageClassNmae}>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default MessageBorder
