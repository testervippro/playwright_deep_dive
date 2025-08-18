// Access a single variable
const testEnv = process.env.TEST_ENV || "QWE";
console.log("Current environment:", testEnv);

const port = process.env.PORT || 3000; // default 3000 if not set
console.log("Server will run on port:", port);

// Run on window
// set TEST_ENV=production&&set PORT=8080&&node env.js
// Run on mac/linux
// TEST_ENV=production PORT=8080 node env.js
