import { ClassRoom } from './Classroom';

export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    classroomId: number;
    Classroom: ClassRoom;
  }
