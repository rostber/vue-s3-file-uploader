# vue-s3-file-uploader
File loader for aws s3 backets (Amazon CDN).

You must to load [vue-s3-file-uploader](https://github.com/rostber/vue-s3-file-uploader) to your Vue project in an easy way.

# Install
## npm

```sh
npm install vue-s3-file-uploader
```

## yarn 

```sh
yarn add vue-s3-file-uploader
```

# How to use 

## Global Registration

```js
import VueS3FileUploader from 'vue-s3-file-uploader'

Vue.use(VueS3FileUploader)
```

So then you can use this plugin in each component as

```html
<vue-s3-file-uploader
  :options="s3Options"
  :disabled="disabled"
  @process="onProcess"
  @success="onSuccess"
  @fail="onFail"
>
  <button
    class="btn"
    :disabled="disabled"
  >
    Upload file to amazon s3 backet
  </button>
</vue-s3-file-uploader>
```

# Props 

#### `disabled {Boolean}`
Make disabled the handler on click

#### `options {Object}`
That options pointed to backet settings to upload.
```
{
  elDropZone: this.$refs.dropZone,
  classDropZomeHighlight: 'drop-zone_highlight_yes',
  s3: {
    albumBucketName: 'my-assets',
    bucketRegion: 'region-123',
    identityPoolId: 'region-123:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx',
    dnsHost: 'assets.mysite.net'
  }
}
```

# Events

`process` return boolean state;
`success` return array with uploaded urls when progress finished;
`fail` return message for each fail

Enjoy
