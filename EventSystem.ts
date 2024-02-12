type Callback = (data: any) => void;

export class EventSystem {
  private events: Map<string, Callback[]>;

  constructor() {
    this.events = new Map();
  }

  // Add event listener
  on(eventName: string, callback: Callback) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName)?.push(callback);
  }

  // Remove event listener
  off(eventName: string) {
    this.events.delete(eventName)
  }

  // Trigger event
  emit(eventName: string, data?: any) {
    if (!data) data = {}
    const listeners = this.events.get(eventName);
    if (listeners) {
      listeners.slice().forEach(callback => {
        callback(data);
      });
    }
  }
}
