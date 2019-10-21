<template>
    <div id="app">
        <nav-bar></nav-bar>
        <router-view/>
    </div>
</template>

<script>
// @ is an alias to /src
import NavBar from './components/NavBar';

export default {
    name: 'home',
    components: {
        NavBar
    }
};
</script>

<style lang="less">
    body {
        min-width: 1000px;
        margin: 0;
        padding: 0;
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Ubuntu,Helvetica Neue,Helvetica,Arial;
        overscroll-behavior: none;
    }

    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #000;
        position: relative;
        min-height: 100vh;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #B70016;
            }
        }
    }

    .common-page{
        padding-top: 140px;
    }
</style>
