const MessageBorder = ({ message, imgURL = false, isContainerStyleSneder = true }) => {
  const styleContainerClassNmae = isContainerStyleSneder ? `flex justify-end mb-4` : 'flex mb-4'
  const styleMessageClassNmae = isContainerStyleSneder
    ? `flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3`
    : 'flex max-w-96 text-black rounded-lg p-3 gap-3'
  return (
    <div className={styleContainerClassNmae}>
      <div className={styleMessageClassNmae}>
        {imgURL ? (
          <a href={message} target="_blank">
            <img src={message} className="w-40" alt="image" />
          </a>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </div>
  )
}

export default MessageBorder
