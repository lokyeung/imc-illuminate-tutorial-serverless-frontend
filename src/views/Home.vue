<template>
	<div class="ani-slideInDown row justify-content-center">
		<div class="col-lg-6">
			<ToDoInput @eventAddNewTask="onAddNewTask"/>

			<ul class="list mt-3">
				<ListItem v-for="item in itemList" :key="item.id" :text="item.text" :id="item.id" :checked="item.checked" @eventTaskStatusChange="onTaskStatusChange" @eventTaskDelete="onTaskDelete" />
			</ul>
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	import ToDoInput from "@/components/ToDoInput.vue"
	import ListItem from "@/components/ListItem.vue"

    // Using Axios for data operation
    import axios from 'axios';

    // For Testing/Dev only, suggested to put those config into ENV or other secure place rather than in-line 
    let config = {
      headers: {
        // "X-API-Key": "bcXyIXUekW7LbHPIhEHsO8GIm8nPJwvb3ElF3L6d",
      }
    }
    
    let base_path = "https://hjbibhomgh.execute-api.ap-east-1.amazonaws.com/dev/todos";

	export default {
		name: "home",
		components: {
			ToDoInput,
			ListItem
		},
		data() {
            return {
                itemList: []
            }
        },
        methods: {
			/**
			 * Event: add new task
			 */
			onAddNewTask(taskName) {
				const task = {
					// id: (new Date()).getTime(),
					text: taskName,
					checked: false
				}

				this.itemList.push(task)

                // Remote Create
                axios
                    .post(base_path, task, config)
                    .then( response => {
                        console.log(response)
                    })
			},

            /**
             * Event: on task status changed
             */
            onTaskStatusChange(id, checked) {
                console.log(id, checked)

                let item = this.itemList.find(i => i.id == id)
                if (item) {
                    item.checked = checked
                }
                
                console.log(this.itemList)

                // Remote Update
                axios
                    .put(base_path + "/" + id, item, config)
                    .then( response => {
                        console.log(response)
                    })
            },

            /**
             * Event: on task deleted
             */
            onTaskDelete(id) {
                console.log(id)

                let index = this.itemList.findIndex(i => i.id == id)
                if (index > -1) {
                    this.itemList.splice(index, 1)
                }

                console.log(this.itemList)

                // Remote Delete 
                axios
                    .delete(base_path + "/" + id, config)
                    .then( response => {
                        console.log(response)
                    })
            },

            /**
             * Load item list from local storage
             */
            loadItemList() {
                // Local stroage
                // this.itemList = JSON.parse(localStorage.getItem("VuejsTodo")) || []

                // Remote storage
                axios
                  .get(base_path, config)
                  .then(response => {
                        console.log( response.data);
                        this.itemList = response.data;
                        // (this.itemList = JSON.parse(response.data))
                    })
                            // console.log("this.itemList =", this.itemList)
            },

            /**
             * Update the item list to local storage
             */
            updateItemList() {
                // Local storage
                // localStorage.setItem("VuejsTodo", JSON.stringify(this.itemList))

                // Remote storage


            }
        },
        mounted() {
            // Load item list from local storage
            this.loadItemList()
        },
        watch: {
            itemList: {
                handler(value) {
                    console.log("item changed")
                    console.log(value);

                    // save to localStorage
                    this.updateItemList()
                },
                deep: true
            }
        }
	}
</script>
