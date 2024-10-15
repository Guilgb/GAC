import { Activities } from '../../../../modules/db/entities/activities.entity';
import { Course } from '../../../../modules/db/entities/study.entity';
import * as yup from 'yup';

export interface UserDTO {
  name: string;
  email: string;
  isAdmin: boolean;
  activities: Array<Activities>;
  courses: Array<Course>;
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
  courses: Array<Course>;
}

export interface UserReponses {
  id: string;
  email: string;
  isAdmin: boolean;
  activities: any[];
  permissions: string[];
  name: string;
  registration: string;
  courses: Array<Course>;
}

export const ValidateSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  isAdmin: yup.boolean(),
  activities: yup.array(),
  courses: yup.array(),
  password: yup.string().required(),
  registration: yup.string().required(),
  permissions: yup.array(),
});
