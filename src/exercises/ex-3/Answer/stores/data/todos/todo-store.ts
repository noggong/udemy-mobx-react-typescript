import {action, computed, observable, reaction, when} from "mobx";
import RootStore from "../../root-store";
import Todo from "./todo";

export default class TodoStore {
    @observable
    todoList: Todo[] = [];

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        // reaction(
        //     () => this.todoList.length,
        //     () => console.log(`Current Todo Count: ${this.todoList.length}, Done Todos: ${this.completedTodos}, Incomplete Todos: ${this.incompleteTodos}`)
        // );
        //
        // when(
        //     () => this.todoList.length > 0 && this.todoList.every(todo => todo.isCompleted),
        //     () => console.log(`Congratulations !`)
        // );
    }

    @action
    addTodo(name: string, userId: number) {
        this.todoList.push(new Todo(name, userId, this));
    }

    getUserTodos(userId: number) {
        return this.todoList.filter(todo => todo.userId === userId);
    }

    getTodo(id: number) {
        return this.todoList.find(todo => todo.id === id);
    }

    @action
    removeTodo(id: number) {
        const todoToRemove = this.getTodo(id);

        if (todoToRemove) {
            todoToRemove.dispose();
            const todoToRemoveIndex = this.todoList.indexOf(todoToRemove);
            this.todoList.splice(todoToRemoveIndex, 1);
        }
    }

    @computed
    get completedTodos() {
        return this.todoList.filter(todo => todo.isCompleted);
    }

    @computed
    get incompleteTodos() {
        return this.todoList.filter(todo => !todo.isCompleted);
    }
}
