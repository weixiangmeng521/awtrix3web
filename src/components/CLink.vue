<template>
    <div class="link" @click="jump">
        {{ props.href }}
        <v-icon icon="mdi-open-in-new" class="icon"></v-icon>
    </div>
</template>
<script lang="ts" setup>

const props = defineProps({
    href: {
        type: String,
        required: true
    }
})

function jump(){
    window.open("http://" + props.href, '_blank')
}

</script>
<style lang="css" scoped>
.link {
    display: inline;
    cursor: pointer;
}

.link .icon{
    opacity: .5;
    margin-bottom: 3px;
}

.link:hover .icon{
    opacity: 1;
}

.link:hover{
    text-decoration: underline;
}


</style>