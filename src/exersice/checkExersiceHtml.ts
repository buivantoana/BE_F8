import { ExerciseCreare_A, ExerciseCreare_H1_P_Img, ExerciseCreare_UL_LI, ExerciseCssExternal, ExerciseCssInternal, ExerciseCssPriority, ExerciseCssSelectors, ExerciseGetAtribute } from "./exersixe_html";



export const checkExerciseHtml = async(type, exercise,res) => {
    switch (type) {
        case 'ExerciseCreare_H1_P_Img':
           await ExerciseCreare_H1_P_Img(exercise,res); 
            break;
        case 'ExerciseCreare_A':
            await ExerciseCreare_A(exercise,res); 
            break;
        case 'ExerciseCreare_UL_LI':
            await ExerciseCreare_UL_LI(exercise,res); 
            break;
        case 'ExerciseGetAtribute':
            await ExerciseGetAtribute(exercise,res); 
            break;
        case 'ExerciseCssInternal':
            await ExerciseCssInternal(exercise,res); 
            break;
        case 'ExerciseCssExternal':
            await ExerciseCssExternal(exercise,res); 
            break;
        case 'ExerciseCssSelectors':
            await ExerciseCssSelectors(exercise,res); 
            break;
        case 'ExerciseCssPriority':
                await ExerciseCssPriority(exercise,res); 
                break;
       
       
        default:
            break;
    }
  };