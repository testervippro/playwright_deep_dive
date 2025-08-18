// Import EventEmitter using ES6 modules
import { EventEmitter } from "events";

// Create an instance
const myEmitter = new EventEmitter();

// Add an event listener
myEmitter.on("greet", (name) => {
  console.log(`Hello, ${name}!`);
});

// Emit the event
myEmitter.emit("greet", "Alice"); // Output: Hello, Alice!
