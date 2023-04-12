<template>
    <div :class="`rounded-xl bg-${ color } p-2 px-6 transition-all cursor-pointer hover:bg-${ color_hover } hover:text-black border-${ color } border-2 text-sm text-center align-middle md:text-base`">
        <slot></slot>
    </div>
</template>

<script>
export default{
    name: 'Button',
    props: ['color', 'color_hover']
}
</script>