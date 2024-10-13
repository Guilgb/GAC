import { Activities } from './activities.entity';
import { Course } from './study.entity';

export interface User {
  user_id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  activities: Array<Activities>;
  courses: Array<Course>;
  password: string;
  registration: string;
  permissions: string[];
}
