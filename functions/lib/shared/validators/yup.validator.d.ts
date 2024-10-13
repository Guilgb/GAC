import * as yup from 'yup';
export declare class YupValidator {
    static validate(schema: yup.ObjectSchema<any>, input: any): Promise<void>;
}
