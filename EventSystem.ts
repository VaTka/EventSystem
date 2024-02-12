type Callback = (data: any) => void;

export class EventSystem {
  private events: Map<string, Map<number, Callback>[]>;
  private idCounter: number;

  constructor() {
    this.events = new Map();
    this.idCounter = 0;
  }

  // Add event listener
  on(eventName: string, callback: Callback): number {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    const id = this.idCounter++;
    const eventListeners = this.events.get(eventName)!;
    eventListeners.push(new Map([[id, callback]]));
    return id;
  }

// Remove event listener
off(eventName: string, id: number) {
  const listeners = this.events.get(eventName);
  if (listeners) {
    const index = listeners.findIndex(listener => listener.has(id));
    if (index !== -1) {
      listeners.splice(index, 1);
      if (listeners.length === 0) {
        this.events.delete(eventName);
      }
    }
  }
}

// Trigger event
emit(eventName: string, data: any) {
  const listeners = this.events.get(eventName);
  if (listeners) {
    listeners.forEach(listener => {
      listener.forEach(callback => {
        callback(data);
      });
    });
  }
}
}