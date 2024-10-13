import * as yup from 'yup';

export class CourseDTO {
  id: string;
  courseName: string;
}

export const CourseSchema = yup.object().shape({
  courseName: yup.string().required('Course area is required'),
});
