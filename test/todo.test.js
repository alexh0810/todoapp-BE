const request = require("supertest");
const app = require("../src/app");
const todos = require("../src/models/todos");
const { v4: uuidv4 } = require("uuid");

/* Test signup route
describe("test signup route", () => {
    test("Should have token returned as body when user is created", async () => {
        const res = await request(app).post("/api/v1/signup").send({
            email: "test_signup1@gmail.com",
            password: "123456"
        }); 
        expect(res.body).toHaveProperty("token");
    })
})

// Test signin route
describe("test signin route", () => {
    test("Should have token returned as body when user is signed in", async () => {
        const res = await request(app).post("/api/v1/signin").send({
            email: "test_signup1@gmail.com",
            password: "123456"
        }); 
        expect(res.body).toHaveProperty("token");
    })
})
*/

// Test get all todos:

describe("test get all todos route", () => {
  const user_id = uuidv4();
  const allTodos = [
    {
      todo_id: 20,
      name: "Get shampoo",
      current_status: "NotStarted",
      user_id: user_id,
    },
    {
      todo_id: 21,
      name: "Get food",
      current_status: "NotStarted",
      user_id: user_id,
    },
  ];

  test("Should return all todos of a specified user", async () => {
    const mockGetAllTodos = jest.fn(() => allTodos);
    jest
      .spyOn(todos, "getAllTodos")
      .mockImplementation(() => mockGetAllTodos());

    const res = await request(app).get("/api/v1/todos");
    expect(res.body).toEqual(allTodos);
  });
});

// Test creating a new todo

describe("test create a new todo", () => {
  const user_id = uuidv4();
  const newTodo = {
    todo_id: 23,
    user_id: user_id,
    name: "Get a haircut",
    current_status: "NotStarted",
  };

  test("Should return newly created todo", async () => {
    const mockCreateNewTodo = jest.fn(() => newTodo);
    jest
      .spyOn(todos, "createNewTodo")
      .mockImplementation(() => mockCreateNewTodo());

    const res = await request(app).post("/api/v1/todos").send(newTodo);
    expect(res.body).toEqual(newTodo);
  });
});

// Test get todo by id

describe("test get todo by id route", () => {
  const user_id = uuidv4();
  const todo = {
    todo_id: 20,
    name: "Get shampoo",
    current_status: "NotStarted",
    user_id: user_id,
  };

  test("Should return todo of specifed id", async () => {
    const mockGetTodoById = jest.fn(() => todo);
    jest
      .spyOn(todos, "getTodoById")
      .mockImplementation(() => mockGetTodoById());

    const res = await request(app).get("/api/v1/todos/:id");
    expect(res.body).toEqual(todo);
  });
});

// Test update a todo by id

describe("test update a todo by id", () => {
  const user_id = uuidv4();
  const updatedTodo = {
    todo_id: 23,
    user_id: user_id,
    name: "Get a haircut",
    current_status: "OnGoing",
  };

  test("Should return updated todo", async () => {
    const mockUpdateTodo = jest.fn(() => updatedTodo);
    jest
      .spyOn(todos, "updateTodoById")
      .mockImplementation(() => mockUpdateTodo());

    const res = await request(app).put("/api/v1/todos/:id").send(updatedTodo);
    expect(res.body).toEqual(updatedTodo);
  });
});

// Test delete todo by id

describe("delete a todo by id", () => {
  const user_id = uuidv4();
  const deletedTodo = {
    todo_id: 23,
    user_id: user_id,
    name: "Get a haircut",
    current_status: "Completed",
  };

  test("Should return statement 'Todo was deleted' ", async () => {
    const mockDeleteTodo = jest.fn(() => deletedTodo);
    jest.spyOn(todos, "deleteTodo").mockImplementation(() => mockDeleteTodo());

    const res = await request(app).delete("/api/v1/todos/:id");
    expect(res.body).toEqual("Todo was deleted");
  });
});
