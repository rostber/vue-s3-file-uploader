// MIT License
//
//  Copyright (c) 2020 rostber (Vladimir Saveliev)

export default class FileSelector {

  constructor (options: any) {
    const defaultOptions = {
      maxFileSizeLimitMb: 0,
      elInputFile: null,
      elDropZone: null,
      classDropZomeHighlight: 'highlight',
      handleFileSelect (files)  {},
      handleEachFileSelect (file)  {},
      handleEachFileSelectSizeLimit (file) {},
      handleComplete (selectedFiles) {}
    }
    this.options = { ...defaultOptions, ...options }
    this.selectedFiles = []
  }

  public bind (): void {
    if (this.options.elInputFile) {
      this.options.elInputFile.addEventListener('change', this.handleInputFileChange.bind(this), false)
    }

    if (this.options.elDropZone) {
      this.options.elDropZone.addEventListener('dragenter', this.handleDragHighlight.bind(this), false)
      this.options.elDropZone.addEventListener('dragover', this.handleDragHighlight.bind(this), false)

      this.options.elDropZone.addEventListener('dragleave', this.handleDragUnhighlight.bind(this), false)
      this.options.elDropZone.addEventListener('drop', this.handleDragUnhighlight.bind(this), false)
      document.addEventListener('mouseout', this.handleDragUnhighlightAll.bind(this), false)

      this.options.elDropZone.addEventListener('dragover', this.handleDragOver.bind(this), false)
      this.options.elDropZone.addEventListener('drop', this.handleDrop.bind(this), false)
    }
  }

  public unbind (): void {
    if (this.options.elInputFile) {
      this.options.elInputFile.removeEventListener('change', this.handleInputFileChange.bind(this))
    }

    if (this.options.elDropZone) {
      this.options.elDropZone.removeEventListener('dragenter', this.handleDragHighlight.bind(this))
      this.options.elDropZone.removeEventListener('dragover', this.handleDragHighlight.bind(this))

      this.options.elDropZone.removeEventListener('dragleave', this.handleDragUnhighlight.bind(this))
      this.options.elDropZone.removeEventListener('drop', this.handleDragUnhighlight.bind(this))
      document.removeEventListener('mouseout', this.handleDragUnhighlightAll.bind(this))

      this.options.elDropZone.removeEventListener('dragover', this.handleDragOver.bind(this))
      this.options.elDropZone.removeEventListener('drop', this.handleDrop.bind(this))
    }
  }

  private async handleInputFileChange (event): Promise {
    const files = event.target.files

    if (files.length === 0) return

    await this.options.handleFileSelect(files)
    await Promise.all(Object.values(files).map(this.handleFile.bind(this)))
    this.options.elInputFile.value = null
    this.options.handleComplete(this.selectedFiles)
    this.selectedFiles = []
  }

  private handleDragHighlight (): void {
    this.options.elDropZone.classList.add(this.options.classDropZomeHighlight)
  }

  private handleDragUnhighlight (event): void {
    if (event.target !== this.options.elDropZone) return
    this.options.elDropZone.classList.remove(this.options.classDropZomeHighlight)
  }

  private handleDragUnhighlightAll (event) {
    this.options.elDropZone.classList.remove(this.options.classDropZomeHighlight)
  }

  private async handleDrop (event): Promise {
    event.stopPropagation()
    event.preventDefault()

    const files = event.dataTransfer.files
    await this.options.handleFileSelect(files)
    await Promise.all(Object.values(files).map(this.handleFile.bind(this)))

    this.handleDragUnhighlightAll()
    this.options.handleComplete(this.selectedFiles)
    this.selectedFiles = []
  }

  private handleDragOver (event): void {
    event.stopPropagation()
    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'
  }

  private async handleFile (file): Promise {
    if (!this.options.maxFileSizeLimitMb || file.size / 1048576 < this.options.maxFileSizeLimitMb) {
      this.selectedFiles.push(file)
      await this.options.handleEachFileSelect(file)
    } else {
      await this.options.handleEachFileSelectSizeLimit(file, this.options.maxFileSizeLimitMb)
    }
  }

}
