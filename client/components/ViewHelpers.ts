import { EventType } from '../models/enums'

export function showEventType(et: EventType): string {
    switch(et) {
        case EventType.Birthday:
        return 'Birthday';
        case EventType.Christmas:
        return 'Christmas'
    }
}