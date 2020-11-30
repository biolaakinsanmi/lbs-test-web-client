import { User } from './User';

export class ClassRoom {
    id: number;
    name: string;
    description: string;
    users?: Array<User>;
}
