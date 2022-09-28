<template>
    <div class="homepage">
        <h1>Online-shop</h1>
        <p>
            <router-link class="catalog-link" :to="{name: 'Catalog'}"
                >To Catalog</router-link
            >
        </p>
    </div>
</template>

<script>
export default {
    name: 'Home',
    props: {},
    data() {
        return {}
    },
}
</script>

<style lang="scss" scoped></style>
