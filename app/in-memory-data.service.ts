import { InMemoryDbService } from 'angular2-in-memory-web-api';
import { Note} from './note';



export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let notes: Note[] = [
            { id: 1, writing: "First Note", date: new Date, archived: false, selected:false },
            { id: 2, writing: "Second Note", date: new Date, archived: false, selected:false },
            { id: 3, writing: "Third Note", date: new Date, archived: false, selected:false }
        ];
        return { notes };
    }
}