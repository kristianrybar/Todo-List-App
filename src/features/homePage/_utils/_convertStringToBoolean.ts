export const _convertStringToBoolean = (todos) => {
    return todos.map(todo => {
        return {
            ...todo,
            completed: (todo.completed == 'true' || todo.completed == true) ? true : false,
            important: (todo.important == 'true' || todo.important == true) ? true : false,
        }
    })
}