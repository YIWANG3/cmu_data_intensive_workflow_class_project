<template>
    <div class="home">
        <div class="content">
            <search-panel></search-panel>
        </div>
        <custom-footer type="white" :fixed="true"></custom-footer>
    </div>
</template>

<script>
import SearchPanel from '../components/SearchPanel';
import CustomFooter from '../components/CustomFooter';

export default {
    name: 'home',
    components: {
        SearchPanel,
        CustomFooter
    }
};
</script>
<style lang="less">
    .home{
        .content {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 600px;
        }
    }
</style>
