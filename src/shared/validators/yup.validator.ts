import * as yup from 'yup';

export class YupValidator {
  static async validate(schema: yup.ObjectSchema<any>, input: any) {
    await schema.validate(input, {
      abortEarly: false,
    });
  }
}
