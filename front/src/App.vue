<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
import dotenv from 'dotenv'

dotenv.config()
export default {
  
}
</script>
<style lang="scss">
body{
   background-image: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);
 }
</style>
