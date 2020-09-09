import VueS3FileUploader from './VueS3FileUploader'

export function install (Vue, settings) {
  if (settings) {
    if (settings.name && typeof settings.name === 'string') {
      VueS3FileUploader.name = settings.name
    }

    if (settings.options && typeof settings.options === 'object') {
      VueS3FileUploader.props.options.default = () => {
        return settings.options
      }
    }

    if (settings.tag && typeof settings.tag === 'string') {
      VueS3FileUploader.props.tag.default = settings.tag
    }
  }

  Vue.component(
    VueS3FileUploader.name,
    VueS3FileUploader
  )
}

export { VueS3FileUploader }
export default install
