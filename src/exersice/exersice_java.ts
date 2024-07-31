import { exec } from 'child_process';
import fs from 'fs';
import { AnyArray } from 'mongoose';

export const ExercisePythonArray = (exercise, res) => {
  //     # -*- coding: utf-8 -*-

  // def get_most_favorite_sport(sports):
  //     return [sport for sport in sports if sport['like'] > 5]

  // sports = [
  //     {'name': 'Basketball', 'like': 6},
  //     {'name': 'Swimming', 'like': 5},
  //     {'name': 'Football', 'like': 10}
  // ]

  // favorite_sports = get_most_favorite_sport(sports)
  // for sport in favorite_sports:
  //     print("Name: {}, Like: {}".format(sport['name'], sport['like']))
  const tmpFileName = 'TempCode.py';
  fs.writeFileSync(tmpFileName, exercise);
  exec(`python ${tmpFileName}`, (runError, runStdout, runStderr) => {
    fs.unlinkSync(tmpFileName);

    if (runError || runStderr) {
      console.error('Run error or stderr:', runStderr || runError.message);
      return res.status(200).json({
        status: 0,
        results: [{ status: false, message: runStderr || runError.message }],
      });
    }
    try {
      const output = runStdout.trim();
      const lines = output.split('\n');
      const result = lines.map((line) => {
        const [name, like] = line
          .split(', ')
          .map((part) => part.split(': ')[1]);
        return { name, like: parseInt(like, 10) };
      });
      const expected = [
        { name: 'Basketball', like: 6 },
        { name: 'Football', like: 10 },
      ];
      const isCorrect = JSON.stringify(result) === JSON.stringify(expected);
      return res.status(200).json({
        status: 0,
        results: [
          isCorrect
            ? { status: true, message: 'Chúc mừng bạn đã vượt qua thử thách ' }
            : { status: false, message: 'Kết quả trả về không như mong muốn' },
        ],
      });
    } catch (error) {
      console.error('Error parsing output:', error);
      return res.status(500).json({ error: 'Error parsing output' });
    }
  });
};

export const ExercisePythonTotal = (exercise, res) => {
  //     # -*- coding: utf-8 -*-

  // def get_total(orders):
  //     total = sum(order['price'] for order in orders)
  //     return total, orders

  // orders = [
  //     {'name': 'Khóa học HTML - CSS Pro', 'price': 3000000},
  //     {'name': 'Khóa học Javascript Pro', 'price': 2500000},
  //     {'name': 'Khóa học React Pro', 'price': 6200000}
  // ]

  // total, orders = get_total(orders)
  // result = {'total': total, 'orders': orders}
  // import json
  // print(json.dumps(result))
  const tmpFileName = 'TempCode.py';
  fs.writeFileSync(tmpFileName, exercise);

  // Thực thi file Python
  exec(`python ${tmpFileName}`, (runError, runStdout, runStderr) => {
    // Xóa file tạm thời sau khi thực thi
    fs.unlinkSync(tmpFileName);

    if (runError || runStderr) {
      console.error('Run error or stderr:', runStderr || runError.message);
      return res.status(200).json({
        status: 0,
        results: [{ status: false, message: runStderr || runError.message }],
      });
    }

    // Phân tích kết quả đầu ra
    try {
      const output = JSON.parse(runStdout.trim());
      const { total, orders } = output;

      // Tính tổng giá trị đơn hàng từ mảng orders bằng JavaScript
      const calculatedTotal = orders.reduce(
        (acc, order) => acc + order.price,
        0,
      );

      // So sánh tổng giá trị được tính từ JavaScript với tổng giá trị từ Python
      const isCorrectTotal = total === calculatedTotal;

      return res.status(200).json({
        status: 0,
        results: [
          isCorrectTotal
            ? { status: true, message: 'Chúc mừng bạn đã vượt qua thử thách ' }
            : { status: false, message: 'Kết quả trả về không như mong muốn' },
        ],
      });
    } catch (error) {
      console.error('Error parsing output:', error);
      res.status(500).json({ error: 'Error parsing output' });
    }
  });
};

export const ExercisePythonSwitch = (exercise, res, age) => {
  //     # -*- coding: utf-8 -*-

  // import sys

  // def get_can_vote_message(age):
  //     if age >= 18:
  //         return "Bạn có thể bỏ phiếu"
  //     else:
  //         return "Bạn chưa được bỏ phiếu"

  // if __name__ == "__main__":
  //     age = int(sys.argv[1])
  //     print(get_can_vote_message(age))
  // Ghi mã Python vào một file tạm thời
  const tmpFileName = 'TempCode.py';
  fs.writeFileSync(tmpFileName, exercise);

  // Thực thi file Python
  exec(`python ${tmpFileName} ${age}`, (runError, runStdout, runStderr) => {
    // Xóa file tạm thời sau khi thực thi
    fs.unlinkSync(tmpFileName);

    if (runError || runStderr) {
      console.error('Run error or stderr:', runStderr || runError.message);
      return res.status(200).json({
        status: 0,
        results: [{ status: false, message: runStderr || runError.message }],
      });
    }

    // Kiểm tra kết quả đầu ra
    const output = runStdout.trim();
    const expected =
      age >= 18 ? 'Bạn có thể bỏ phiếu' : 'Bạn chưa được bỏ phiếu';
    const isCorrect = output === expected;

    return res.status(200).json({
      status: 0,
      results: [
        isCorrect
          ? { status: true, message: 'Chúc mừng bạn đã vượt qua thử thách ' }
          : { status: false, message: 'Kết quả trả về không như mong muốn' },
      ],
    });
  });
};

export const ExercisePythonAvaribal = (exercise, res) => {
  //     # -*- coding: utf-8 -*-
  // # Tạo biến weight và gán giá trị cho nó
  // weight = '70.5'

  // # In giá trị của biến weight ra màn hình
  // print(weight)
  // Ghi mã Python vào một file tạm thời
  const tmpFileName = 'TempCode.py';
  fs.writeFileSync(tmpFileName, exercise);

  // Thực thi file Python
  exec(`python ${tmpFileName}`, (runError, runStdout, runStderr) => {
    // Xóa file tạm thời sau khi thực thi
    fs.unlinkSync(tmpFileName);

    if (runError || runStderr) {
      console.error('Run error or stderr:', runStderr || runError.message);
      return res.status(200).json({ error: runStderr || runError.message });
    }

    // Kiểm tra kết quả đầu ra
    const output: any = runStdout.trim();
    const isNumber = !isNaN(parseFloat(output)) && isFinite(output);

    res.status(200).json({
      output: parseFloat(output),
      isNumber: isNumber,
      expected: 'A valid number',
    });
  });
};

// java
export const ExerciseJava = (exercise, res) => {
  //     import java.util.Arrays;

  // public class TempCode {
  //     public static void main(String[] args) {
  //         Sport[] sports = {
  //             new Sport("Basketball", 6),
  //             new Sport("Swimming",4 ),
  //             new Sport("Football", 10)
  //         };

  //         Sport[] favoriteSports = getMostFavoriteSport(sports);

  //         // In ra kết quả dưới dạng văn bản đơn giản
  //         for (Sport sport : favoriteSports) {
  //             System.out.println(sport.name + "," + sport.like);
  //         }
  //     }

  //     public static Sport[] getMostFavoriteSport(Sport[] sports) {
  //         return Arrays.stream(sports)
  //                      .filter(sport -> sport.like > 5)
  //                      .toArray(Sport[]::new);
  //     }
  // }

  // class Sport {
  //     String name;
  //     int like;

  //     Sport(String name, int like) {
  //         this.name = name;
  //         this.like = like;
  //     }
  // }
  // Ghi mã Java vào một file tạm thời
  const tmpFileName = 'TempCode.java';
  fs.writeFileSync(tmpFileName, exercise);

  // Biên dịch file Java
  exec(`javac ${tmpFileName}`, (compileError, stdout, stderr) => {
    if (compileError || stderr) {
      console.error('Compile error or stderr:', stderr || compileError.message);
      fs.unlinkSync(tmpFileName); // Xóa file Java sau khi biên dịch lỗi
      return res.status(200).json({
        status: 0,
        results: [{ status: false, message: stderr || compileError.message }],
      });
    }

    // Thực thi file Java đã biên dịch
    exec('java TempCode', (runError, runStdout, runStderr) => {
      // Xóa file tạm thời sau khi thực thi
      fs.unlinkSync(tmpFileName);
      fs.unlinkSync('TempCode.class');

      if (runError || runStderr) {
        console.error('Run error or stderr:', runStderr || runError.message);
        return res.status(500).json({ error: runStderr || runError.message });
      }

      // Phân tích kết quả đầu ra
      try {
        // Chia đầu ra thành các dòng và chuyển đổi thành mảng đối tượng
        const lines = runStdout.trim().split('\n');
        const result = lines.map((line) => {
          const [name, like] = line.split(',').map((part) => part.trim());
          return {
            name,
            like: parseInt(like, 10),
          };
        });

        // Tính tổng giá trị trong JavaScript
        const jsTotal = result.filter((item) => item.like < 5);

        // Trả về kết quả và tổng giá trị
        return res.status(200).json({
          status: 0,
          results: [
            !jsTotal[0]
              ? {
                  status: true,
                  message: 'Chúc mừng bạn đã vượt qua thử thách ',
                }
              : {
                  status: false,
                  message: 'Kết quả trả về không như mong muốn',
                },
          ],
        });
      } catch (error) {
        console.error('Error parsing output:', error);
        res.status(500).json({ error: 'Error parsing output' });
      }
    });
  });
};
export const ExerciseJavaSum = (exercise, res) => {
  // public class TempCode {
  //     public static void main(String[] args) {
  //         // Tạo biến weight và gán giá trị
  //         int weight = 75; // Ví dụ trọng lượng là 75 kg

  //         // Tính toán giá trị gấp đôi của trọng lượng
  //         int doubleWeight = weight * 2;

  //         // In kết quả ra màn hình
  //         System.out.println("Original weight: " + weight + " kg");
  //         System.out.println("Double weight: " + doubleWeight + " kg");
  //     }
  // }

  // Ghi mã Java vào một file tạm thời
  const tmpFileName = 'TempCode.java';
  fs.writeFileSync(tmpFileName, exercise);

  // Biên dịch file Java
  exec(`javac ${tmpFileName}`, (compileError, stdout, stderr) => {
    if (compileError || stderr) {
      console.error('Compile error or stderr:', stderr || compileError.message);
      fs.unlinkSync(tmpFileName);

      return res.status(200).json({
        status: 0,
        results: [{ status: false, message: stderr || compileError.message }],
      });
    }

    // Thực thi file Java đã biên dịch
    exec('java TempCode', (runError, runStdout, runStderr) => {
      // Xóa file tạm thời sau khi thực thi
      fs.unlinkSync(tmpFileName);
      fs.unlinkSync('TempCode.class');

      if (runError || runStderr) {
        console.error('Run error or stderr:', runStderr || runError.message);
        return res.status(500).json({ error: runStderr || runError.message });
      }

      // Kiểm tra kết quả đầu ra
      try {
        // Kiểm tra đầu ra
        const lines = runStdout.trim().split('\n');
        const originalWeightLine = lines[0].split(': ')[1];
        const doubleWeightLine = lines[1].split(': ')[1];

        const originalWeight = parseInt(originalWeightLine, 10);
        const doubleWeight = parseInt(doubleWeightLine, 10);

        const expectedDoubleWeight = originalWeight * 2;
        const isCorrect = doubleWeight === expectedDoubleWeight;
        return res.status(200).json({
          status: 0,
          results: [
            isCorrect
              ? {
                  status: true,
                  message: 'Chúc mừng bạn đã vượt qua thử thách ',
                }
              : {
                  status: false,
                  message: 'Kết quả trả về không như mong muốn',
                },
          ],
        });
      } catch (error) {
        console.error('Error parsing output:', error);
        res.status(500).json({ error: 'Error parsing output' });
      }
    });
  });
};
// Ví dụ sử dụng
const javaCode = `
public class TempCode {
  public static void main(String[] args) {
    Sport[] sports = {
        new Sport("Bóng rổ", 6),
        new Sport("Bơi lội", 5),
        new Sport("Bóng đá", 10)
    };

    Sport[] favoriteSports = getMostFavoriteSport(sports);
    for (Sport sport : favoriteSports) {
      System.out.println(sport.name + ", like: " + sport.like);
    }
  }

  public static Sport[] getMostFavoriteSport(Sport[] sports) {
    return java.util.Arrays.stream(sports)
                            .filter(sport -> sport.like > 5)
                            .toArray(Sport[]::new);
  }
}

class Sport {
  String name;
  int like;

  Sport(String name, int like) {
    this.name = name;
    this.like = like;
  }
}
// `;
