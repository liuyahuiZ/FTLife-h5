<template>
    <div class="display_none">
        <audio src="../Img/110.mp3" id="audioPlay" ref="audioPlay" />
    </div>
</template>
<script>
export default {
  data () {
    return {
      author: 'Jinkey',
    }
  },
  methods: {
    play: function() {
        const myVid = this.$refs.audioPlay;
        myVid.play();
    }
  },
  components: {
  }
}
</script>