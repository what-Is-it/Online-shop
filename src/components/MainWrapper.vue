<template>
    <div class="main__wrapper">
        <Header />
        <router-view />
    </div>
</template>

<script>
import Header from '../views/Header'
export default {
    name: 'MainWrapper',
    components: {Header},
    props: {},
    data() {
        return {
            title: 'Main Wrapper',
        }
    },
}
</script>

<style lang="scss" scoped></style>
