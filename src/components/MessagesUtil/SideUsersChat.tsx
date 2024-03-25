const SideUsersAvatar = ({ url, name, lastMessage }) => {
  return (
    <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
      <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
        <img src={url} alt="User Avatar" className="w-12 h-12 rounded-full" />
      </div>
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-600">{lastMessage}</p>
      </div>
    </div>
  )
}

export default SideUsersAvatar
