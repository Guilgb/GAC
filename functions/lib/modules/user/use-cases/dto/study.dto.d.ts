import * as yup from 'yup';
export declare class StudyDTO {
    id: string;
    studyArea: string;
    workload: number;
    modality: string;
    level: string;
    institutionName: string;
}
export declare const StudySchema: yup.ObjectSchema<{
    studyArea: string;
    workload: number;
    modality: string;
    level: string;
    institutionName: string;
}, yup.AnyObject, {
    studyArea: undefined;
    workload: undefined;
    modality: undefined;
    level: undefined;
    institutionName: undefined;
}, "">;
