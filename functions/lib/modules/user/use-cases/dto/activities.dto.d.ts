import * as yup from 'yup';
export declare class ActivitiesDTO {
    id: string;
    approval: boolean;
    file: string;
    workload: string;
    category: string;
    proof: string;
    startDate: Date;
    description: string;
    comments: Array<string>;
}
export declare const ActivitiesSchema: yup.ObjectSchema<{
    approval: boolean;
    file: string;
    workload: string;
    category: string;
    proof: string;
    startDate: Date;
    description: string;
    comments: string[];
}, yup.AnyObject, {
    approval: undefined;
    file: undefined;
    workload: undefined;
    category: undefined;
    proof: undefined;
    startDate: undefined;
    description: undefined;
    comments: "";
}, "">;
