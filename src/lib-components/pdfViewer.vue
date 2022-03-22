<template>
  <div class="pdfViewer">
    <object class="viewer" :data="pdfData" :type="fileType" width="100%" height="100%">
      <iframe class="iframeViewer" src="https://docs.google.com/viewer?&embedded=true"></iframe>
    </object>
  </div>
</template>

<script>
export default {
  name: "pdfViewer",
  props:{
    value: { required: false, type: String, default: "" },
    fileType: { required: false, type: String, default: "application/pdf" },
    valueFormat: { required: false, type: String, default: "default" },
  },
  computed: {
    pdfData(){
      switch(this.valueFormat){
        case('default'): return `data:${this.fileType};base64,${this.value}`;
        default: return this.value;
      }
    }
  }
}
</script>

<style scoped>
.pdfViewer{
  width: 100%;
  height: 50vh;
}

</style>