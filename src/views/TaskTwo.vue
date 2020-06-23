<template>
  <b-container class="mt-5">
    <b-row>
      <b-col>
        <img id="output" :src="image" />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div class="d-flex justify-content-around">
          <div>
            <label for="file-upload" class="custom-file-upload">
              <b-icon icon="camera" class="mr-1"></b-icon>Browse Image
            </label>
            <input @change="handleInput" type="file" accept="image/*" id="file-upload" capture />
          </div>

          <b-button variant="warning" @click="removeImage">Remove</b-button>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      image: ""
    };
  },
  methods: {
    doSomethingWithFiles(fileList) {
      for (let i = 0; i < fileList.length; i++) {
        if (fileList[i].type.match(/^image\//)) {
          this.file = fileList[i];
          break;
        }
      }
      if (this.file !== null) {
        this.image = URL.createObjectURL(this.file);
      }
    },
    handleInput(e) {
      const fileInput = e.target.files || e.dataTransfer.files;
      this.doSomethingWithFiles(fileInput);
    },
    removeImage() {
      this.image = null;
    }
  }
};
</script>

<style >
input[type="file"] {
  display: none;
}
.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  background-color: #17a2b8;
  border-radius: 0.25rem;
  color: #fff;
}

.custom-file-upload:hover {
  background-color: #065b68f3;
}

img {
  width: 80%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
</style>
