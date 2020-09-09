// MIT License
//
//  Copyright (c) 2020 rostber (Vladimir Saveliev)

require('./aws-sdk')
const AWS = window.AWS

export default class FileUploader {

  constructor (options: any) {
    const defaultOptions = {
      apiVersion: '2006-03-01',
      getFileKey () {
        const getUid = (len) => {
          const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
          const uuid = []
          const radix = chars.length
          for (let i = 0; i < len; i++) uuid.push(chars[Math.floor(radix * Math.random())])
          return uuid.join('')
        }
        const format = (v) => {
          return v < 10 ? `0${v}` : v
        }
        const uuid = getUid(8)
        return `public/chat-attachments/${uuid}/`
      }
    }
    this.options = { ...defaultOptions, ...options }

    AWS.config.update({
      region: this.options.bucketRegion,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: this.options.identityPoolId
      })
    })

    this.s3 = new AWS.S3({
      apiVersion: this.options.apiVersion,
      params: { Bucket: this.options.albumBucketName }
    })
  }

  public upload (file): Promise {
    const fileKey = this.options.getFileKey()
    const fileName = this.sanitizeFileName(file.name)
    const Key = `${fileKey}${fileName}`
    return new Promise((resolve, reject) => {
      this.s3.upload(
        {
          Key,
          Body: file,
          ACL: 'public-read'
        },
        (err, data) => {
          if (err) reject(err.message)
          else {
            const url = this.options.dnsHost ? `https://${this.options.dnsHost}/${data.Key}` : data.Location
            resolve(url)
          }
        }
      )
    })
  }

  private sanitizeFileName (name): string {
    return name.replace(/[^а-яa-z0-9_,.{}()\[\]-]/gi, '_').toLowerCase()
  }

}
