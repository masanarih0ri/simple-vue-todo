const STORAGE_KEY = 'memo'

const app = {
  data() {
    return {
      todo: '',
      todos: [],
      todoId: 1
    }
  },
  mounted() {
    if(localStorage.getItem(STORAGE_KEY)) {
      this.todos = JSON.parse(localStorage.getItem(STORAGE_KEY))
      // メモを追加するときにidが被らないようにする
      this.todoId = Math.max(...this.todos.map(todo => todo.id)) + 1
    }
  },
  methods: {
    addTodo() {
      if(!this.todo) return
      this.todos.push({
        id: this.todoId,
        todo: this.todo,
        isEditable: false
      })
      this.todoId++
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
    },
    editTodo(index) {
      const todo = this.todos[index]
      todo.isEditable = true
    },
    updateTodo(index, todo) {
      this.todos[index] = todo
      todo.isEditable = false
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
    },
    deleteTodo(index) {
      alert('本当に削除しますか？')
      this.todos.splice(index, 1)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
    }
  },
}

Vue.createApp(app).mount('#app')
