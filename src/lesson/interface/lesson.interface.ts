export interface ILesson {
  title: string;
  description: String;
  duration: number;
  sub_lesson: string[];
  courses_id: string[];
  changeCourses?:boolean
}
