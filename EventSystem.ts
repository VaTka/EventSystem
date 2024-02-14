type Callback = (data: any) => void;
type EventName =
  'ONCLICK' |
  'CUSTOMEVENT'
// Add new types as need

export class EventSystem {
  private events: Map<string, Map<number, Callback>[]>;
  private idCounter: number;

  constructor() {
    this.events = new Map();
    this.idCounter = 0;
  }

  /**
   * Adds an event listener for the specified event.
   * @param {EventName} eventName - The name of the event.
   * @param {Callback} callback - The callback function to be executed when the event is triggered.
   * @returns {number} The ID of the added event listener.
   */
  
  on(eventName: EventName, callback: Callback): number {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    const id = this.idCounter++;
    const eventListeners = this.events.get(eventName)!;
    eventListeners.push(new Map([[id, callback]]));
    return id;
  }

  /**
   * Removes an event listener for the specified event.
   * @param {EventName} eventName - The name of the event.
   * @param {number} id - The ID of the event listener to be removed.
   */

  off(eventName: EventName, id: number) {
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

  /**
   * Triggers the specified event.
   * @param {EventName} eventName - The name of the event to be triggered.
   * @param {*} [data] - Optional data to be passed to the event listeners.
   */

  emit(eventName: EventName, data?: any) {
    if (!data) data = {}
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