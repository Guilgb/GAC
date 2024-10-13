import * as yup from 'yup';

export class ActivitiesDTO {
  id: string;
  approval: string;
  file?: string | Express.Multer.File;
  workload: number;
  category: Array<string>;
  proof: string;
  startDate: Date;
  description: string;
  comments: Array<string>;
}

export const ActivitiesSchema = yup.object().shape({
  approval: yup.string().required('Approval status is required'),
  workload: yup.number().required('Workload is required'),
  category: yup.array().of(yup.string()),
  proof: yup.string().required('Proof is required'),
  startDate: yup.date().required('Start date is required'),
  description: yup.string(),
  comments: yup.array().of(yup.string()),
});
