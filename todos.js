const SeleniumInfra = require("./seleniumInfra")
const selenium = new SeleniumInfra();


class TodosPage {
    constructor(URL) {
        selenium.getURL(URL)
    }


    async insertAndDelete(todoText) {
        try {
            await selenium.write(todoText, "id", "todo-input");
            await selenium.clickElement("id", "addToDo");
            let newdiv = await selenium.isElementExists("xpath", `//*[@id="todos"]/div`)
            if (newdiv) {
                console.log("found a new div");
                if (todoText == await selenium.getTextFromElement("xpath", `//*[@id="todos"]/div/span[1]`)) {
                    console.log("New div has the same text");
                }
                else { console.log("Error: New div does not has the same text") }
            }
            else { console.log("Error: Can’t find a new div") }

            await selenium.clickElement("xpath", `//*[@id="todos"]/div/span[2]/i`)
            newdiv = await selenium.isElementExists("xpath", `//*[@id="todos"]/div`)
            if (newdiv) {
                console.log("The div was not deleted")
            }
            else {
                console.log("The div was deleted")
            }
        }
        catch (error) {
            console.log(`something went wrong with insert delete function ${error}`)
        }
    }

    async insertAndComplete(todoText) {
        try {
            await selenium.write(todoText, "id", "todo-input");
            await selenium.clickElement("id", "addToDo");
            let newdiv = await selenium.findElementBy("xpath", `//*[@id="todos"]/div`)
            if (newdiv) {
                console.log("found a new div");
            }
            else { console.log("Error: Can’t find a new div") }
            await selenium.clickElement("xpath", `//*[@id="todos"]/div/i`)
            // let tes=await newdiv.getAttribute("class");//Need Completion
            // console.log(tes)
            let check = await selenium.findElementBy("className", "todo complete")
            if (check) {
                console.log("the new div was checked")
            }
            else { console.log("Error: the new div was NOT checked") }
        }
        catch (error) {
            console.log(`something went wrong with InsertAndComplete function: ${error}`)
        }

        // if (newdiv) {//class is complete
        //     console.log("the new div was checked")
        // }
        // else{consolee.log("Error: the new div was NOT checked")}
    }

    async insertTwoDeleteFirst(todoText1, todoText2) {
        try {
            await selenium.write(todoText1, "id", "todo-input");
            await selenium.clickElement("id", "addToDo");
            let newdiv = await selenium.findElementBy("xpath", `//*[@id="todos"]/div`)
            if (newdiv) {
                console.log("found a new div");
            }
            else { console.log("Error: Can’t find a new div") }

            await selenium.write(todoText2, "id", "todo-input");
            await selenium.clickElement("id", "addToDo");
            let secondnewdiv = await selenium.findElementBy("xpath", `//*[@id="todos"]/div[2]`)
            if (secondnewdiv) {
                console.log("found a new div");
            }
            else { console.log("Error: Can’t find a new div") }

            await selenium.clickElement("xpath", `//*[@id="todos"]/div/span[2]/i`)
            // let tes=await secondnewdiv.attribute("data-id")
            // console.log(tes)
            let list = await selenium.findElementListBy("id", "todos")//gets all the todolist
            for (let item of list) {//compares whether any of those items still have the deleted text ,and act accordingly.
                // console.log(item)
                if (await selenium.getTextFromElement(null, null, item) == todoText1) {

                    console.log("Error: the first div was NOT deleted")
                }
                else { console.log("the first div was deleted") }
            }
        }
        catch (error) {
            console.log(`something went wrong with insertTwoDeletFirst function : ${error}`)
        }
    }

}

module.exports=TodosPage

// const test = new TodosPage("https://elevation-local-todo.herokuapp.com/");
// test.insertTwoDeleteFirst("what", "hello");

