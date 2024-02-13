# EventSystem
The EventSystem class provides a basic event handling mechanism

# Example usage:
```ts
const eventSystem = new EventSystem();

// Add event listener
function eventHandler(data: any) {
  console.log("Event occurred with data:", data);
}
eventSystem.on('exampleEvent', eventHandler); // eventName: string, callback: Callback

// Trigger event
eventSystem.emit('exampleEvent', { message: 'Hello, world!' }); // eventName: string, data?: any

// Remove event listener
eventSystem.off('exampleEvent', 1); // eventName: string, id: number
```
