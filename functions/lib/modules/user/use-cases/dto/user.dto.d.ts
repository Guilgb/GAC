import { Activities } from '../../../../modules/db/entities/activities.entity';
import { Study } from '../../../../modules/db/entities/study.entity';
import * as yup from 'yup';
export interface UserDTO {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    activities: Array<Activities>;
    studies: Array<Study>;
    password: string;
    registration: string;
    permissions: string[];
}
export interface UserReponse {
    activities: any[];
    permissions: string[];
    name: string;
    registration: string;
    email: string;
    modality: string;
    level: string;
    institutionName: string;
    workload: number;
    studyArea: string;
    studies: any[];
}
export declare const ValidateSchema: yup.ObjectSchema<{
    name: string;
    email: string;
    isAdmin: boolean;
    activities: any[];
    studies: any[];
    password: string;
    registration: string;
    permissions: any[];
}, yup.AnyObject, {
    name: undefined;
    email: undefined;
    isAdmin: undefined;
    activities: undefined;
    studies: undefined;
    password: undefined;
    registration: undefined;
    permissions: undefined;
}, "">;
