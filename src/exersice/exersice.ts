// Thực hành toán tử số học
export const ExerciseAge = (exercise, res) => {
    let sentence = JSON.stringify(exercise);
    try {
      eval(`
      (function() {
        try{
          ${exercise}
          if (typeof age !== 'undefined' && typeof nextAge !== 'undefined') {
            if (nextAge - age == 1) {
                if (${sentence}.includes('++')) {
                    return  res.status(200).json({
                      status:0,
                      results:[{status:false,message:"Bạn đã sử dụng toán tử ++ trong bài này, điều này không đúng với yêu cầu của đề bài."}],
                      
                     }) 
                  
                } else {
                  return  res.status(200).json({
                    status:0,
                    results:[{status:true,message:"Chính xác! Biến nextAge có giá trị là 21 mà không sử dụng toán tử ++."}],
                    
                   }) 
                  
                }
            } else {
              return  res.status(200).json({
                status:0,
                results:[{status:false, message:"Sai! Giá trị của biến nextAge không đúng."}],
                
               }) 
            }
        } else {
          return  res.status(200).json({
            status:0,
            results:[{status:false,  message:"Sai! Bạn chưa định nghĩa đúng biến age và nextAge."}],
            
           }) 
          
           
        }
        }catch(error){
           throw error;
        }
      })();
        
        `);
    } catch (error) {
      return  res.status(200).json({
        status:0,
        results:[{status:false,  message: error.message,}],
        
       }) 
      
    }
  };
  // Bắt đầu với một thử thách nhỏ
  export const ExerciseAlert = (exercise, res) => {
    let sentence = JSON.stringify(exercise);
    try {
      eval(`
        try{
          const check = ${sentence}.includes('alert');
                 if(check){
                    try {
                      new Function(${sentence})();
                      res.status(200).json({
                        status:0,
                        results:[{status:true,message:"Bạn đã viết đúng cú pháp câu lệnh alert"}],
                        code:${sentence}
                       }) 
                      } catch (err) {
                        if(err.message=="alert is not defined"){
                          res.status(200).json({
                            status:0,
                            results:[{status:true,message:"Bạn đã viết đúng cú pháp câu lệnh alert"}],
                            code:${sentence}
                           }) 
                        }else{
                          res.status(200).json({
                            status:0,
                            results:[{status:false,message:err.message}]
                            
                           }) 
  
                        }
                      }
                   
                 }else{
                  res.status(200).json({
                    status:0,
                    results:[{status:false,message:"Phải là câu lệnh alert"}]
                    
                   }) 
                 }
        }catch(error){
          throw error;
        }
        
        `);
    } catch (error) {
      res.status(200).json({
        status: 0,
        results: [{ status: false, message: error.message }],
      });
    }
  };
  // Thực hành sử dụng biến
  export const ExerciseWeight = (exercise, res) => {
    let sentence = JSON.stringify(exercise);
    try {
      eval(`
      try {
            ${exercise}
            if (typeof weight === 'number') {
              res.status(200).json({
                status:0,
                results:[{status:true,message:'Chúc mừng bạn đã hoàn thành thử thách'}]
                
               }) 
              
            } else {
              res.status(200).json({
                status:0,
                results:[{status:false, message:"Biến weight không có giá trị hoặc không phải là số."}]
                
               }) 
            }
      } catch (error) {
        res.status(200).json({
          status:0,
          results:[{status:false,message:error.message}]
          
         }) 
        
      }
          `);
    } catch (error) {
      res.status(200).json({
        status:0,
        results:[{status:false,message: error.message,}]
        
       }) 
     
    }
  };
  // Thực hành sử dụng console.log
  export const ExerciseConsoleLog = (exercise, res) => {
    let sentence = JSON.stringify(exercise);
    try {
      eval(`
        try{
              const check = ${sentence}.includes('console.log');
              if(check){
                try {
                  new Function(${sentence})();
                  } catch (err) {
                         alert(err.message);
                  }
              }else{
                console.log("khon phai")
              }
          
            }catch(error){
              console.log(error)
            }
            `);
    } catch (error) {
      alert(error);
    }
  };
  
  // Thực hành với toán tử gán
  export const checkExerciseOperator = (exercise, res) => {
    let sentence = JSON.stringify(exercise);
    try {
      eval(`
          try {
            ${exercise}
            if (typeof a !== 'undefined' && typeof b !== 'undefined' && typeof c !== 'undefined' && typeof d !== 'undefined') {
              if (typeof a === 'number' && typeof b === 'number' && typeof c === 'number' && typeof d === 'number') {
                if (a > 0 && b < 0) {
                  if (c === a + b && d === a - b) {
                    if (${sentence}.includes('++')) {
                      alert("Bạn đã sử dụng toán tử ++ trong bài này, điều này không đúng với yêu cầu của đề bài.");
                    } else {
                      alert("Chính xác! Biến nextAge có giá trị là 21 mà không sử dụng toán tử ++.");
                    }
                  } else {
                    alert("Sai! Giá trị của biến c hoặc d không đúng.");
                  }
                } else {
                  alert("Sai! Giá trị của biến a phải là số dương và biến b phải là số âm.");
                }
              } else {
                alert("Sai! Các biến a, b, c, d phải được định nghĩa là số.");
              }
            } else {
              alert("Sai! Bạn chưa định nghĩa đúng các biến a, b, c, d.");
            }
          } catch (error) {
            throw error;
          }
        `);
    } catch (error) {
      alert(error);
    }
  };
  // Thực hành nối chuỗi
  export const checkExerciseFullName = (exercise, res) => {
    try {
      eval(`
          try {
            ${exercise}
            if (typeof fullName !== 'undefined') {
              if (typeof fullName === 'string') {
                const expectedFullName = firstName + ' ' + lastName;
                if (fullName === expectedFullName) {
                  const spaceIndex = fullName.indexOf(' ');
                  if (spaceIndex > 0 && spaceIndex < fullName.length - 1) {
                    alert("Chính xác! Biến fullName được tạo ra đúng như mong đợi.");
                  } else {
                    alert("Sai! Giữa firstName và lastName phải có ít nhất một khoảng trắng.");
                  }
                } else {
                  alert("Sai! Giá trị của biến fullName không đúng.");
                }
              } else {
                alert("Sai! Biến fullName phải là kiểu chuỗi (string).");
              }
            } else {
              alert("Sai! Bạn chưa định nghĩa biến fullName.");
            }
          } catch (error) {
            throw error;
          }
        `);
    } catch (error) {
      alert(error);
    }
  };
  // Thực hành dùng boolean
  export const checkExerciseCanBuyAlcohol = (exercise, res) => {
    try {
      eval(`
          try {
            ${exercise}
            if (typeof canBuyAlcohol !== 'undefined') {
              if (typeof canBuyAlcohol === 'boolean') {
                const legalAge = 18;
                if (age >= legalAge) {
                  if (canBuyAlcohol === true) {
                    alert("Chính xác! Bạn đã đủ tuổi để mua rượu.");
                  } else {
                    alert("Sai! Bạn đủ tuổi để mua rượu nhưng biến canBuyAlcohol không được đặt là true.");
                  }
                } else {
                  if (canBuyAlcohol === false) {
                    alert("Chính xác! Bạn chưa đủ tuổi để mua rượu.");
                  } else {
                    alert("Sai! Bạn chưa đủ tuổi để mua rượu nhưng biến canBuyAlcohol không được đặt là false.");
                  }
                }
              } else {
                alert("Sai! Biến canBuyAlcohol phải là kiểu boolean.");
              }
            } else {
              alert("Sai! Bạn chưa định nghĩa biến canBuyAlcohol.");
            }
          } catch (error) {
            throw error;
          }
        `);
    } catch (error) {
      alert(error);
    }
  };
  // Thực hành tạo hàm sum #1
  export const checkExerciseSumFunction = (exercise, res) => {
    try {
      eval(`
          try {
            ${exercise}
            if (typeof sum === 'function') {
              alert("Chính xác! Hàm sum đã được định nghĩa.");
            } else {
              alert("Sai! Hàm sum chưa được định nghĩa.");
            }
          } catch (error) {
            throw error;
          }
        `);
    } catch (error) {
      alert(error);
    }
  };
  // Thực hành tạo hàm sum #2
  export const checkExerciseSumParameters = (exercise, res) => {
    try {
      eval(`
        try {
          ${exercise}
          if (typeof sum === 'function') {
            const sumParameters = sum.toString().match(/\(([^)]*)\)/)[1];
            const parameters = sumParameters.split(',').map((param,index) =>index==0? param.trim().slice(1):param.trim()); 
              console.log(parameters)
            if (parameters.length === 2 && parameters[0] === 'a' && parameters[1] === 'b') {
              alert("Chính xác! Hàm sum đã được định nghĩa với hai tham số a và b.");
            } else {
              alert("Sai! Hàm sum không được định nghĩa với hai tham số a và b.");
            }
          } else {
            alert("Sai! Hàm sum chưa được định nghĩa.");
          }
        } catch (error) {
          throw error;
        }
        `);
    } catch (error) {
      alert(error);
    }
  };
  // Thực hành tạo hàm sum #3
  export const checkExerciseSumTotal = (exercise, res) => {
    try {
      eval(`
          try {
            ${exercise}
            if (typeof sum === 'function') {
              const sumParameters = sum.toString().match(/\(([^)]*)\)/)[1];
              const parameters = sumParameters.split(',').map((param,index) =>index==0? param.trim().slice(1):param.trim()); 
                console.log(parameters)
              if (parameters.length === 2 && parameters[0] === 'a' && parameters[1] === 'b') {
                  const resultAdd = sum(3, 4); 
                  
                  
                  if (resultAdd === 7) {
                    alert("Chính xác! Hàm sum đã được định nghĩa đúng và trả về tổng của hai tham số a và b khi cộng và khi trừ.");
                  } else {
                    alert("Sai! Hàm sum không trả về đúng tổng của hai tham số a và b khi cộng hoặc khi trừ.");
                  }
              } else {
                alert("Sai! Hàm sum không được định nghĩa với hai tham số a và b.");
              }
              
            } else {
              alert("Sai! Hàm sum chưa được định nghĩa.");
            }
          } catch (error) {
            throw error;
          }
        `);
    } catch (error) {
      alert(error);
    }
  };
  //   Thực hành dùng hàm sum
  export const checkExerciseResult = (exercise, res) => {
    try {
      eval(`
              try {
                  ${exercise}
                  if (typeof result !== 'undefined') {
                      if (result === 30) {
                          console.log("Chính xác! Kết quả của phép cộng 20 + 10 là:", result);
                      } else {
                          console.log("Sai! Kết quả của phép cộng 20 + 10 không đúng.");
                      }
                  } else {
                      console.log("Sai! Bạn chưa định nghĩa biến result.");
                  }
              } catch (error) {
                  if (error.toString().includes("is not a function")) {
                      console.log("Sai! Hàm sum cần nhận đủ 2 tham số.");
                  }  else {
                      throw error;
                  }
              }
          `);
    } catch (error) {
      alert(error);
    }
  };
  //  Thực hành với chuỗi #1
  export const checkExerciseEmailAssignment = (exercise, res) => {
    try {
      eval(`
              try {
                  ${exercise}
                  if (typeof email !== 'undefined') {
                      if (typeof email === 'string') {
                          console.log("Chính xác! Biến email đã được gán giá trị là một chuỗi:", email);
                      } else {
                          console.log("Sai! Biến email không được gán giá trị là một chuỗi.");
                      }
                  } else {
                      console.log("Sai! Biến email chưa được gán giá trị.");
                  }
              } catch (error) {
                  throw error;
              }
          `);
    } catch (error) {
      alert(error);
    }
  };
  // Thực hành với chuỗi #2
  export const checkExerciseSplit = (exercise, res) => {
    try {
      eval(`
              try {
                  ${exercise}
                  const expected = ['HTML & CSS','JavaScript','ReactJS'];
                  const result = strToArray(coursesStr);
  
                  if (JSON.stringify(result) === JSON.stringify(expected)) {
                      console.log("Chính xác! Kết quả đúng:", result);
                  } else {
                      console.log("Sai! Kết quả không đúng.");
                  }
              } catch (error) {
                  throw error;
              }
          `);
    } catch (error) {
      alert(error);
    }
  };
  // Hàm lấy độ dài chuỗi
  
  export const checkExerciselength = (exercise, res) => {
    try {
      eval(`
              try {
                  ${exercise}
                  const expectedLength = total;
                  const result = getContentLength('JavaScript');
                  if (result === expectedLength) {
                      console.log("Chính xác! Độ dài của content là:", result);
                  } else {
                      console.log("Sai! Độ dài của content không đúng.");
                  }
              } catch (error) {
                  throw error;
              }
          `);
    } catch (error) {
      console.error(error);
    }
  };
  // Chuyển đổi sang chữ in hoa
  export const checkExerciseUpperCase = (exercise, res) => {
    try {
      eval(`
              try {
                  ${exercise}
                  if (typeof getUpperCaseName === 'function') {
                      const testName = "john";
                      const expectedUpperCaseName = "JOHN";
                      
                      if (typeof getUpperCaseName.length !== 'undefined' && getUpperCaseName.length === 1) {
                          const result = getUpperCaseName(testName);
                          
                          if (result === expectedUpperCaseName) {
                              console.log("Chính xác! Phiên bản chữ viết hoa của name là:", result);
                          } else {
                              console.log("Sai! Phiên bản chữ viết hoa của name không đúng.");
                          }
                      } else {
                          console.log("Sai! Hàm getUpperCaseName cần chứa đúng 1 tham số.");
                      }
                  } else {
                      console.log("Sai! Hàm getUpperCaseName không tồn tại.");
                  }
              } catch (error) {
                  throw error;
              }
          `);
    } catch (error) {
      alert(error);
    }
  };
  // Tạo một biến mang giá trị số
  export const checkExerciseInterge = (exercise, res) => {
    try {
      eval(`
              try {
                  ${exercise}
  
                  if (typeof year !== 'undefined') {
                      if (Number.isInteger(year)) {
                          console.log("Chính xác! Biến year đã được khai báo và gán một giá trị số nguyên.");
                      } else {
                          console.log("Sai! Giá trị của biến year không phải là số nguyên.");
                      }
                  } else {
                      console.log("Sai! Bạn chưa khai báo biến year.");
                  }
              } catch (error) {
                  throw error;
              }
          `);
    } catch (error) {
      alert(error);
    }
  };
  // Viết hàm kiểm tra kiểu number #1
  export const checkExerciseIsNumber = (exercise, res) => {
    try {
      eval(`
              try {
                  ${exercise}
                  if (typeof isNumber !== 'undefined') {
                      let check = 5
                      const result1 = isNumber(check);
                      if(result1){
                          console.log('thanh cong')
                      }else{
                          console.log('sai')
                      }
                      
                  } else {
                      console.log("Sai! Bạn chưa định nghĩa hàm isNumber.");
                  }
              } catch (error) {
                  throw error;
              }
          `);
    } catch (error) {
      alert(error);
    }
  };
  
  // Thực hành tạo array #1
  export const checkExerciseGames = (exercise, res) => {
    try {
      eval(`
              try {
                  ${exercise}
                  if (typeof games !== 'undefined') {
                      if (Array.isArray(games)) {
                          console.log("games array: ", games);
                          console.log("Number of games: ", games.length);
                          if (games.length >= 3) {
                              console.log("Chính xác! Biến games đã được khởi tạo là một mảng với ít nhất 3 phần tử.");
                          } else {
                              console.log("Sai! Biến games cần ít nhất 3 phần tử.");
                          }
                      } else {
                          console.log("Sai! Biến games cần là một mảng.");
                      }
                  } else {
                      console.log("Sai! Bạn chưa khởi tạo biến games.");
                  }
              } catch (error) {
                  throw error;
              }
          `);
    } catch (error) {
      alert(error);
    }
  };
  // Thực hành tạo array #2
  export const checkExerciseNumbers = (exercise, res) => {
    try {
      eval(`
              try {
                  ${exercise}
                  if (typeof numbers !== 'undefined') {
                      if (Array.isArray(numbers)) {
                          if (numbers.length >= 3) {
                              const allNumbers = numbers.every((num) => typeof num === 'number');
                              if (allNumbers) {
                                  console.log("Chính xác! Biến numbers đã được khởi tạo là một mảng với ít nhất 3 phần tử là các số.");
                              } else {
                                  console.log("Sai! Mảng numbers cần chứa ít nhất 3 phần tử là các số.");
                              }
                          } else {
                              console.log("Sai! Biến numbers cần ít nhất 3 phần tử.");
                          }
                      } else {
                          console.log("Sai! Biến numbers cần là một mảng.");
                      }
                  } else {
                      console.log("Sai! Bạn chưa khởi tạo biến numbers.");
                  }
              } catch (error) {
                  throw error;
              }
          `);
    } catch (error) {
      alert(error);
    }
  };
  // Làm việc với mảng #3
  export const checkExerciseFirstElement = (exercise, res) => {
    try {
      eval(`
              try {
                  ${exercise}
                  if (typeof getFirstElement !== 'undefined') {
                      if (typeof getFirstElement === 'function') {
                          const array = [10, 20, 30];
                          const firstElement = getFirstElement(array);
                          console.log("First element of the array:", firstElement);
                          if (firstElement === 10||firstElement[0]===10) {
                              console.log("Chính xác! Hàm getFirstElement trả về phần tử đầu tiên của mảng.");
                          } else {
                              console.error("Sai! Hàm getFirstElement không trả về phần tử đầu tiên của mảng.");
                          }
                      } else {
                          console.error("Sai! getFirstElement không phải là một hàm.");
                      }
                  } else {
                      console.error("Sai! Bạn chưa khai báo hàm getFirstElement.");
                  }
              } catch (error) {
                  throw error;
              }
          `);
    } catch (error) {
      console.error(error);
    }
  };
  // Tạo object student
  export const checkStudentObject = (exercise, res) => {
    try {
      eval(`
              try {
                  ${exercise}
                  if (typeof student === 'object') {
                      const keys = Object.keys(student);
                      if (keys.length === 3) {
                          const expectedKeys = ['name', 'age', 'address'];
                          const missingKeys = expectedKeys.filter(key => !keys.includes(key));
                          if (missingKeys.length === 0) {
                              console.log("Chính xác! Biến student đã được khởi tạo đúng.");
                          } else {
                              console.log("Sai! Thiếu các key:", missingKeys.join(', '));
                          }
                      } else {
                          console.log("Sai! Biến student cần có đúng 3 keys.");
                      }
                  } else {
                      console.log("Sai! Biến student cần phải là một object.");
                  }
              } catch (error) {
                  throw error;
              }
          `);
    } catch (error) {
      alert(error);
    }
  };
  // Tạo object constructor Animal
  export const checkAnimalConstructor = (exercise, res) => {
    try {
      eval(`
              try {
                  ${exercise}
                  const parrot = new Animal('parrot', 2, 50);
  
                  if (parrot instanceof Animal && parrot.name === 'parrot' && parrot.leg === 2 && parrot.speed === 50) {
                      console.log("Chính xác! Biến parrot đã được khởi tạo đúng.");
                  } else {
                      console.log("Sai! Biến parrot không được khởi tạo đúng.");
                  }
              } catch (error) {
                  throw error;
              }
          `);
    } catch (error) {
      alert(error);
    }
  };
  // Thêm phương thức getFullName
  export const checkStudentConstructor = (exercise, res) => {
    try {
      eval(`
              try {
                  ${exercise}
                  const student = new Student('John', 'Doe');
  
                  if (student instanceof Student && student.getFullName() === 'John Doe') {
                      console.log("Chính xác! Phương thức getFullName đã hoạt động đúng.");
                  } else {
                      console.log("Sai! Phương thức getFullName không hoạt động đúng.");
                  }
              } catch (error) {
                  throw error;
              }
          `);
    } catch (error) {
      alert(error);
    }
  };
  