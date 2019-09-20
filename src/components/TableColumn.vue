<template>
    <th>
        <template>
            {{ label }}
        </template>
    </th>
</template>
<script>
export default {
    name: 'TableColumn',
    data: () => {
        return {}
    },
    props: {
        label: { default: null, type: String },
        filter: { default: null, type: String },
    },
    mounted() {
    }
}
</script>