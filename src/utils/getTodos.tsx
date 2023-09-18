export const getTodos = ():TodoItemType[] => {
    const todos = localStorage.getItem("mytodos");
    return todos ? JSON.parse(todos) : [];
}