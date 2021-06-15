<template>
	<li class="list-item" :class="{ done: checked }">
        <input type="checkbox" class="checkbox" :id="idComputed" @change="onTaskStatusChange" :checked="checked">
        <label class="mr-3" :for="idComputed"></label>
        <span class="text">
            {{ text }}
        </span>
        <span class="icon-delete" @click="onTaskDelete"></span>
    </li>
</template>

<script>
	export default {
        name: "ListItem",
        props: {
            id: {
                type: String,
                default: ""
            },
            text: {
                type: String,
                default: ""
            },
            checked: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            idComputed() {
                return `item-${this.id}`
            }
        },
        methods: {
            /**
             * Event: on task status changed
             */
            onTaskStatusChange(e) {
                const checked = e.target.checked
                this.$emit("eventTaskStatusChange", this.id, checked)
            },

            /**
             * Event: on task deleted
             */
            onTaskDelete(e) {
                this.$emit("eventTaskDelete", this.id)
            }
        }
    }
</script>

