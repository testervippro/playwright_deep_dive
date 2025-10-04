import test from "playwright/test";

const time = new Date()
test.describe("Check const varaible",async()=> {

    test("Test01 ", async()=> {
         console.log(time);
    })

    test("Test02 ", async()=> {
         console.log(time);
    })
})

// Each test run onw work -> have init cost every time if run parallel 
// If run seril will same 
