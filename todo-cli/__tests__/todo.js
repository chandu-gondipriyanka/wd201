const todoList = require("../todo");
const { all, markAsComplete, add, overdue,
    dueToday,
    dueLater } = todoList();
const tomday = new Date(); 
const oneDa = 60 * 60 * 24 * 1000;
describe("todoList", () => {
  beforeAll(() => {
    const tomday = new Date();
     //referred to discord forum for this line of code
    add({
      title: "todoo1",
      completed: false,
      dueDate: new Date(tomday.getTime() - 1 * oneDa).toLocaleDateString(
        "en-CA",
      ),
    });
    add({
      title: "todoo2",
      completed: false,
      dueDate: new Date(tomday.getTime() + 1 * oneDa).toLocaleDateString(
        "en-CA",
      ),
    });
    add({
      title: "todoo3",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });
  test("Should add new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "todoo1",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });
  test("should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("checks return a list of overdue todos", () => {
    const overDueTodoItemsCount =overdue().length;
    add({
        title: "todoo1",
        completed: false,
        dueDate: new Date(tomday.getTime() - 1 * oneDa).toLocaleDateString(
          "en-CA",
        ),
      });
    expect(overdue().length).toEqual(overDueTodoItemsCount+1) 
  });
  test("checks return a list of todos due today", () => {
    const duetodayTodoItemsCount =dueToday().length;
    add({
        title: "todoo3",
        completed: false,
        dueDate: new Date().toLocaleDateString("en-CA"),
      });
    expect(dueToday().length).toEqual(duetodayTodoItemsCount+1) ;
  });
  test("checks return a list of todos due later", () => {
    const dueLaterTodoItemsCount =dueLater().length;
    add({
        title: "todoo2",
        completed: false,
        dueDate: new Date(today.getTime() + 2 * oneDa)
        .toISOString()
        .slice(0, 10),
      });
    expect(dueLater().length).toEqual(dueLaterTodoItemsCount+1);
  });
});
