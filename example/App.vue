<template>
  <div>

    <p
      class="drop-zone"
      ref="dropZone"
    >
      This is Drop Zone
    </p>

    <p>
      <vue-s3-file-uploader
        :options="options"
        :disabled="false"
        @process="onProcess"
        @success="onSuccess"
        @fail="onFail"
      >
        <button class="btn">Upload file to amazon s3 backet</button>
      </vue-s3-file-uploader>
    </p>

    <p>Loading: {{progress}}</p>

    <p>Uploaded files:</p>
    <ul>
      <li
        v-for="(url, index) in urls"
        :key="index"
      >
        <a
          :href="url"
          v-text="url"
          target="_blank"
        ></a>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  data () {
    return {
      progress: false,
      urls: [],
      options: {
        elDropZone: this.$refs.dropZone,
        classDropZomeHighlight: 'drop-zone_highlight_yes',
        s3: {
          albumBucketName: 'my-assets',
          bucketRegion: 'region-123',
          identityPoolId: 'region-123:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx',
          dnsHost: 'assets.mysite.net'
        }
      }
    }
  },
  methods: {
    onProcess (value) {
      this.progress = value
    },
    onSuccess (urls) {
      this.urls = urls
    },
    onFail (message) {
      alert(message)
    }
  }
}
</script>

<style scoped>
.drop-zone {
  background-color: #eee;
  text-align: center;
}
.drop-zone_highlight_yes {
  background-color: green;
  color: #fff;
}
</style>
