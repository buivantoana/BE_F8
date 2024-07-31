import {
  ExerciseJava,
  ExerciseJavaSum,
  ExercisePythonArray,
  ExercisePythonSwitch,
  ExercisePythonTotal,
} from './exersice_java';

export const checkExerciseJava = async (type, exercise, res) => {
  switch (type) {
    case 'ExercisePythonArray':
      await ExercisePythonArray(exercise, res);
      break;
    case 'ExercisePythonTotal':
      await ExercisePythonTotal(exercise, res);
      break;
    case 'ExercisePythonSwitch':
      await ExercisePythonSwitch(exercise, res, 14);
      break;
    // java
    case 'ExerciseJavaSum':
      await ExerciseJavaSum(exercise, res);
      break;
    case 'ExerciseJava':
      await ExerciseJava(exercise, res);
      break;

    default:
      break;
  }
};
