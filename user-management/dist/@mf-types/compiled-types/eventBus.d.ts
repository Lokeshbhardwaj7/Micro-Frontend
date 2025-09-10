type EventCallback = (data: any) => void;
type EventType = string;
interface EventBus {
    on(event: EventType, callback: EventCallback): void;
    off(event: EventType, callback: EventCallback): void;
    emit(event: EventType, data?: any): void;
}
export declare const eventBus: EventBus;
export {};
