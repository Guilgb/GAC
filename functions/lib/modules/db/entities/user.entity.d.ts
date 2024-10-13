import { Activities } from './activities.entity';
import { Study } from './study.entity';
export interface User {
    user_id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    activities: Array<Activities>;
    studies: Array<Study>;
    password: string;
    registration: string;
    permissions: string[];
}
