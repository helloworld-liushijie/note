<template>
  <div id="vcomments"></div>
</template>

<script>
export default {
  name: 'Valine',
  mounted: function(){
    // require window 
    const Valine = require('valine');
    if (typeof window !== 'undefined') {
      this.window = window
      window.AV = require('leancloud-storage')
      
    }
     
    new Valine({
      el: '#vcomments' ,
      appId: 'bIaIoboPJMGaUxlTktaOb69H-gzGzoHsz',// your appId
      appKey: '9vk2nQvT9GlKL35uTTt8ntCN', // your appKey
      notify:false, 
      verify:false, 
      avatar: 'monsterid', 
      meta: ['nick','mail'],
      placeholder: '🎈' ,
      recordIP: true
    });
  },
}
</script>

<style scoped>
    .vcomments {
        margin-top: 80vh;
    }
</style>