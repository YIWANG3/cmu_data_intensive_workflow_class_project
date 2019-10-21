<template>
    <div class="custom-footer" :class="[{'white':type==='white'},{'red':type==='red'},{'fixed':fixed}]">
        Design and Develop by <strong> Team 6 </strong>
    </div>
</template>

<script>
export default {
    name: 'Custom-Footer',
    data() {
        return {};
    },
    props: {
        type: String,
        show: Boolean,
        fixed: Boolean
    },
    methods: {}
};
</script>

<style scoped lang="less">
    .custom-footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        font-size: 12px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        &.red{
            background-color: #B70016;
            color: white;
        }
    }
</style>
