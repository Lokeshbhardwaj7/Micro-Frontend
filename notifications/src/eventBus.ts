type EventCallback = (data: any) => void;
type EventType = string;

interface EventBus {
  on(event: EventType, callback: EventCallback): void;
  off(event: EventType, callback: EventCallback): void;
  emit(event: EventType, data?: any): void;
}

class EventBusImpl implements EventBus {
  private events: Map<EventType, Set<EventCallback>> = new Map();

  on(event: EventType, callback: EventCallback): void {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event)!.add(callback);
  }

  off(event: EventType, callback: EventCallback): void {
    if (this.events.has(event)) {
      this.events.get(event)!.delete(callback);
      if (this.events.get(event)!.size === 0) {
        this.events.delete(event);
      }
    }
  }

  emit(event: EventType, data?: any): void {
    if (this.events.has(event)) {
      this.events.get(event)!.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in event handler for ${event}:`, error);
        }
      });
    }

    // Handle wildcard events
    if (event.includes('.')) {
      const wildcardEvent = event.substring(0, event.lastIndexOf('.') + 1) + '*';
      if (this.events.has(wildcardEvent)) {
        this.events.get(wildcardEvent)!.forEach(callback => {
          try {
            callback(data);
          } catch (error) {
            console.error(`Error in wildcard event handler for ${wildcardEvent}:`, error);
          }
        });
      }
    }
  }
}

export const eventBus: EventBus = new EventBusImpl();