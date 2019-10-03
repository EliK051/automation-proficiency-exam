const todos = require('./todos');
const todo = new todos('https://elevation-local-todo.herokuapp.com/')

async function test1(){
await todo.insertAndComplete("Cat")

}
async function test2(){
await todo.insertAndDelete("Dog")
}
async function test3(){
await todo.insertTwoDeleteFirst("Bubu", "hello")
}

test1();
