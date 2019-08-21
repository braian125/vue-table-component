<template>
    <div class="table-responsive">
        <table id="general-table" class="table table-striped table-bordered table-vcenter">
            <thead>
                <tr>
                    <slot name="label"></slot>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in data" :key="index">
                    <td v-for="(field, _index) in fields" :key="_index">
                        <template v-if="field">
                            {{ field.split('.').reduce((a, b) => a[b], row) }}
                        </template>

                        <template v-if="!field">
                            <div class="btn-container" v-if="actions[_index]">
                                <template v-for="(action, i) in actions[_index]">
                                    <button :class="action.class" data-toggle="dropdown" v-if="action.slot == 'icon'" :key="i" @click="clickEvent(row, action.attrs.slug)" v-tooltip.top="action.attrs.tooltip">
                                        <i :class="action.attrs.icon"></i>
                                    </button>
                                </template>
                            </div>
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    name: 'TableComponent',
    data: () => {
        return {
            _data: [],
            fields: [],
            actions: []
        }
    },
    props: {
        data: {
            default: () => [],
            type: [Array, Function]
        },
    },
    computed: {

    },
    methods: {
        clickEvent(row, slug) {
            this.$emit('click-event', row, slug)
        }
    },
    mounted() {
        this.$slots.label.forEach((e, i) => {
            this.fields.push(e.data.attrs.value)
            if (e.componentOptions.children && e.componentOptions.children.length > 0) {
                this.actions[i] = [];
                e.componentOptions.children.forEach((_e) => {
                    this.actions[i].push(_e.data)
                })
            }
        })

        /*let el = this.scrollElement? this.scrollElement : window;
        $(el).scroll(() => {
            let height = this.scrollElement? $(this.scrollElement)[0].scrollHeight : document.documentElement.offsetHeight;
            let bottomOfWindow = $(el).scrollTop() + $(el).innerHeight() === height;
            if (bottomOfWindow) {
                console.log('llego')
            }
        });*/
    }
}
</script>
