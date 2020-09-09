<template>
  <label>
    <input
      type="file"
      multiple
      ref="input"
      :class="$style.hidden"
      :disabled="disabled"
    />
    <slot />
  </label>
</template>

<script>
import FileSelector from './libs/fileSelector'
import FileUploader from './libs/fileUploader'

export default {
  name: 'vue-s3-file-uploader',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default () {
        return {
          elDropZone: null,
          classDropZomeHighlight: '',
          s3: {
            albumBucketName: '',
            bucketRegion: '',
            identityPoolId: '',
            dnsHost: ''
          }
        }
      }
    }
  },
  data () {
    return {
      fileSelector: null
    }
  },
  methods: {
    bind () {
      const fileUploader = new FileUploader(this.options.s3)
      const self = this

      this.fileSelector = new FileSelector({
        maxFileSizeLimitMb: 5,
        elInputFile: this.$refs.input,
        elDropZone: null,
        classDropZomeHighlight: '',
        handleFileSelect () {
          self.$emit('process', true)
        },
        async handleComplete (files) {
          const attachmentItems = await Promise.all(
            files.map(async (file) => {
              return {
                url: await fileUploader.upload(file),
                type: file.type,
                name: file.name
              }
            })
          ).catch((messages) => {
            self.$emit('fail', messages)
            return []
          })
          self.$emit('process', false)
          if (attachmentItems.length > 0) self.$emit('success', attachmentItems)
        }
      })
      this.fileSelector.bind()
    },
    unbind () {
      if (!this.fileSelector) return

      this.fileSelector.unbind()
    }
  },
  mounted () {
    this.bind()
  },
  destroyed () {
    this.unbind()
  }
}
</script>

<style module lang="sass">
  .hidden
    position: absolute
    visibility: hidden
</style>
