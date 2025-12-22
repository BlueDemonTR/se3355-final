function downloadFile(data, filename, type) {
  const file = new Blob([data], { type })

  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, filename)
  } else {
    const a = document.createElement('a'),
      url = URL.createObjectURL(file)
        
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()

    setTimeout(() => {
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)  
    }, 0)
  }
}

export default downloadFile