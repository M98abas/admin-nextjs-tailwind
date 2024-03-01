const handleImageUpload = (e: any) => {
  const fileInput = e.target
  if (!fileInput.files) {
    alert('No file was chosen')
    return
  }

  if (!fileInput.files || fileInput.files.length === 0) {
    alert('Files list is empty')
    return
  }

  const file = fileInput.files[0]

  /** File validation */
  if (!file.type.startsWith('image')) {
    alert('Please select a valide image')
    return
  }

  /** Setting file state */
  handleFileUpload(file) // we will use the file state, to send it later to the server
  e.currentTarget.type = 'text'
  e.currentTarget.type = 'file'
}

const imgbb = '807b79b03a554f95b5980b6b9d688013'
const handleFileUpload = async (file: any) => {
  const formdata = new FormData()
  formdata.append('image', file, file.name)

  const requestOptions: AxiosRequestConfig = {
    method: 'POST',
    maxBodyLength: Infinity,
    url: `https://api.imgbb.com/1/upload?key=${imgbb}`,
    data: formdata,
    onUploadProgress: (progressEvent) => {
      const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      setEnabled(progress === uploadProgress)
      setUploadProgress(progress)
    },
  }

  try {
    const response = await axios(requestOptions)
    setImgUrl(response.data.data.url)
  } catch (error) {
    console.error(error)
  }
}

export default handleFileUpload
