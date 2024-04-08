// utils/useSocket.js
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const useSocket = (url) => {
  const [socket, setSocket] = useState(null)
  const token: any =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluSk0xQGphbWFsU3RvcmUuY29tIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzEyMTgxNjQwfQ.uSGcM2sW7bCO2I79KpByACHCppQSZZfK8O2Vx2zxpos'

  useEffect(() => {
    // Create the Socket.IO client with custom path
    const newSocket = io(url, {
      path: '/', // Specify your custom path here
      //   transports: ['polling'],
      query: { token },
    })
    console.log('check 1', newSocket.connected)
    // Set up event listeners or any other initialization logic
    // For example:
    newSocket.on('connection', () => {
      console.log('Connected to Socket.IO server')
    })
    // Update socket state
    setSocket(newSocket)
    // Clean up on unmount
    return () => {
      newSocket.disconnect()
      console.log('Disconnected from Socket.IO server')
    }
  }, [url])

  return socket
}

export default useSocket
