type Callback = (data: any) => void;

export class EventSystem {
  private events: { [eventName: string]: Callback[] };

  constructor() {
    this.events = {};
  }

  // Add event listener
  on(eventName: string, callback: Callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  // Remove event listener
  off(eventName: string, callback: Callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
    }
  }

  // Trigger event
  emit(eventName: string, data?: any) {
    if (!data) data = {}
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => {
        callback(data);
      });
    }
  }
}