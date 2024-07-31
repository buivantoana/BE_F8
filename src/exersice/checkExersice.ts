import { ExerciseAge, ExerciseAlert, ExerciseConsoleLog, ExerciseWeight, checkAnimalConstructor, checkExerciseCanBuyAlcohol, checkExerciseEmailAssignment, checkExerciseFirstElement, checkExerciseFullName, checkExerciseGames, checkExerciseInterge, checkExerciseIsNumber, checkExerciseNumbers, checkExerciseOperator, checkExerciseResult, checkExerciseSplit, checkExerciseSumFunction, checkExerciseSumParameters, checkExerciseSumTotal, checkExerciseUpperCase, checkExerciselength, checkStudentConstructor, checkStudentObject } from "./exersice";

export const checkExercise = async(type, exercise,res) => {
    switch (type) {
        case 'ExerciseAge':
              await  ExerciseAge(exercise,res); 
            break;
        case 'ExerciseAlert':
            await ExerciseAlert(exercise,res); 
            break;
        case 'ExerciseWeight':
            await ExerciseWeight(exercise,res); 
            break;
        case 'ExerciseConsoleLog':
            await  ExerciseConsoleLog(exercise,res); 
            break;
        case 'checkExerciseOperator':
            await checkExerciseOperator(exercise,res); 
            break;
        case 'checkExerciseFullName':
            await checkExerciseFullName(exercise,res); 
            break;
        case 'checkExerciseCanBuyAlcohol':
            await  checkExerciseCanBuyAlcohol(exercise,res); 
            break;
        case 'checkExerciseSumFunction':
            await  checkExerciseSumFunction(exercise,res); 
            break;
        case 'checkExerciseSumParameters':
            await checkExerciseSumParameters(exercise,res); 
            break;
        case 'checkExerciseSumTotal':
            await  checkExerciseSumTotal(exercise,res); 
            break;
        case 'checkExerciseResult':
            await checkExerciseResult(exercise,res); 
            break;
        case 'checkExerciseEmailAssignment':
            await  checkExerciseEmailAssignment(exercise,res); 
            break;
        case 'checkExerciseSplit':
            await checkExerciseSplit(exercise,res); 
            break;
        case 'checkExerciselength':
            await checkExerciselength(exercise,res); 
            break;
        case 'checkExerciseUpperCase':
            await  checkExerciseUpperCase(exercise,res); 
             break;
        case 'checkExerciseInterge':
            await  checkExerciseInterge(exercise,res); 
            break;
        case 'checkExerciseIsNumber':
            await checkExerciseIsNumber(exercise,res); 
            break;
        case 'checkExerciseGames':
            await checkExerciseGames(exercise,res); 
            break;
        case 'checkExerciseNumbers':
            await checkExerciseNumbers(exercise,res); 
            break;
        case 'checkExerciseFirstElement':
            await  checkExerciseFirstElement(exercise,res); 
            break;
        case 'checkStudentObject':
            await  checkStudentObject(exercise,res); 
            break;
        case 'checkAnimalConstructor':
            await  checkAnimalConstructor(exercise,res); 
            break;
       
        default:
            break;
    }
  };