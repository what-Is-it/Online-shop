<template>
    <div id="app">
        <MainWrapper />
    </div>
</template>

<script>
import MainWrapper from './components/MainWrapper'
export default {
    name: 'App',
    components: {
        MainWrapper,
    },
    mounted() {
        window.addEventListener('resize', () => {
            if(window.innerWidth > 767) {
                this.$store.commit('SWITCH_DESKTOP')
            } else {
                this.$store.commit('SWITCH_MOBILE')
            }
        })
    }
}
</script>

<style lang="scss">
#app {
    padding: 30px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
