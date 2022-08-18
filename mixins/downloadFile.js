export default {
  methods: {
    async downloadFile(fileData) {
      if (fileData.name) {
        let fileBlob = null

        if (fileData.link) {
          // download file from API
          const res = await this.$axios.get(fileData.link, {
            responseType: 'blob'
          })

          if (res.data) {
            fileBlob = new Blob([res.data])
          }
        } else if (fileData.file) {
          // just uploaded to front file, not from backend
          fileBlob = new Blob([fileData.file])
        }

        if (fileBlob) {
          const fileURL = window.URL.createObjectURL(fileBlob)
          const fileLink = document.createElement('a')

          fileLink.href = fileURL
          fileLink.setAttribute('download', fileData.name)
          document.body.appendChild(fileLink)

          fileLink.click()

          this.$nextTick(() => {
            document.body.removeChild(fileLink)
          })
        }
      }
    }
  }
}
