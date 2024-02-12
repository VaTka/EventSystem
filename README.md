# EventSystem
The EventSystem class provides a basic event handling mechanism

# Example usage:
```ts
const eventSystem = new EventSystem();

// Add event listener
function eventHandler(data: any) {
  console.log("Event occurred with data:", data);
}
eventSystem.on('exampleEvent', eventHandler);

// Trigger event
eventSystem.emit('exampleEvent', { message: 'Hello, world!' });

// Remove event listener
eventSystem.off('exampleEvent');
```
