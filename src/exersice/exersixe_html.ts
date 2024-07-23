
import { JSDOM } from 'jsdom';
// Bài tập thẻ HTML thông dụng #1
export const ExerciseCreare_H1_P_Img = (exercise, res) => {
    try {
        let htmlCode = exercise;
        const dom = new JSDOM(htmlCode);
        const document = dom.window.document;
        const hasH1 = document.querySelector("h1") !== null;
        const hasP = document.querySelector("p") !== null;
        const hasImg = document.querySelector("img") !== null;
        let message = " có thẻ";
        if (hasH1) message += " <h1>";
        if (hasP) message += " <p>";
        if (hasImg) message += " <img>";
        res.status(200).json(message)
    } catch (error) {
        res.status(200).json({status:1,message:error.message})
    }
};

// Bài tập thẻ HTML thông dụng #2
export const ExerciseCreare_A = (exercise, res) => {
    try {
        let htmlCode = exercise;
        const dom = new JSDOM(htmlCode);
        const document = dom.window.document;
        const paragraph = document.querySelector("p");
        const link = paragraph.querySelector("a");
        if (!paragraph.contains(link)) {
            res.status(200).json({ message: "Thẻ <a> không nằm trong thẻ <p>." });
            return;
        }
        if (!link || link.getAttribute("href") !== "https://fullstack.edu.vn" || link.textContent !== "fullstack.edu.vn") {
            res.status(200).json({ message: "Không tìm thấy thẻ <a> với nội dung 'fullstack.edu.vn' và href 'https://fullstack.edu.vn' trong thẻ <p>." });
        } else {
            res.status(200).json({ message: "Đã tồn tại thẻ <a> với nội dung và href như yêu cầu trong thẻ <p>." });
        }

    } catch (error) {
        console.log(error);
    }
};
// Bài tập thẻ HTML thông dụng #3
export const ExerciseCreare_UL_LI = (exercise, res) => {
    try {
        let htmlCode = exercise;
        const dom = new JSDOM(htmlCode);
        const document = dom.window.document;
        const list = document.querySelector("ul");
        if (!list) {
            res.status(200).json({ message: "Không tìm thấy danh sách (thẻ <ul>) trong đoạn mã HTML." });
            return;
        }
        const items = list.querySelectorAll("li");
        if (items.length !== 5) {
            res.status(200).json({ message: "Danh sách không có đúng 5 phần tử (thẻ <li>)." });
        } else {
            res.status(200).json({ message: "Đã tồn tại danh sách với 5 phần tử (thẻ <li>) trong đoạn mã HTML." });
        }

    } catch (error) {
        console.log(error);
    }
};
// Bài tập sử dụng Attribute #1
export const ExerciseGetAtribute = (exercise, res) => {
    try {
        let htmlCode = exercise;
        const dom = new JSDOM(htmlCode);
        const document = dom.window.document;

        const img = document.querySelector("img");
        const a = document.querySelector("a");
        const results = [];

        const imgTitle = img ? img.getAttribute("title") : null;
        if (!imgTitle || imgTitle.trim() === "") {
            results.push({ status: false, message: "Thiếu thuộc tính title cho thẻ img." });
        } else {
            results.push({ status: true, message: "Đã tồn tại thuộc tính title cho thẻ img." });
        }

        const href = a ? a.getAttribute("href") : null;
        if (!href || href.trim() === "") {
            results.push({ status: false, message: "Thiếu thuộc tính href cho thẻ a." });
        } else if (!/^https?:\/\/.*/.test(href)) {
            results.push({ status: false, message: "Giá trị của thuộc tính href không phải là một URL hợp lệ." });
        } else {
            results.push({ status: true, message: "Đã tồn tại thuộc tính href cho thẻ a và là một URL hợp lệ." });
        }

       
            res.status(200).json({ status: 0,results });
        

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 1, message: error.message });
    }
};
// Thực hành sử dụng CSS internal
export const ExerciseCssInternal = (exercise, res) => {
    try {
        let htmlCode = exercise;
        const dom = new JSDOM(htmlCode);
        const document = dom.window.document;
        const h1 = document.querySelector("h1");
        const p = document.querySelector("p");

        const results = [];

        const h1ComputedStyle = dom.window.getComputedStyle(h1);
        const h1Color = h1ComputedStyle.getPropertyValue("color");
        const redColor = "rgb(255, 0, 0)";
        if (!h1Color || h1Color !== redColor) {
            results.push({ status: false, message: "Thẻ h1 không có màu đỏ." });
        } else {
            results.push({ status: true, message: "Thẻ h1 có màu đỏ." });
        }

        const pComputedStyle = dom.window.getComputedStyle(p);
        const pColor = pComputedStyle.getPropertyValue("color");
        const greenColor = "rgb(0, 128, 0)";
        if (!pColor || pColor !== greenColor) {
            results.push({ status: false, message: "Thẻ p không có màu xanh." });
        } else {
            results.push({ status: true, message: "Thẻ p có màu xanh." });
        }

        res.status(200).json(results);
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: "Có lỗi xảy ra." });
    }
};
// Thực hành sử dụng CSS external


export const ExerciseCssExternal = (exercise, res) => {
    try {
        let htmlCode = exercise;
        const dom = new JSDOM(htmlCode);
        const document = dom.window.document;

        const heading = document.querySelector("#heading");
        const paragraphs = document.querySelectorAll(".paragraph");

        const results = [];

        const headingComputedStyle = dom.window.getComputedStyle(heading);

        const redColor = "rgb(255, 0, 0)";
        const greenColor = "rgb(0, 128, 0)";
        const fontSize = "24px";

        const headingColor = headingComputedStyle.getPropertyValue("color");
        const headingFontSize = headingComputedStyle.getPropertyValue("font-size");

        if (!headingColor || headingColor !== redColor) {
            results.push({ status: false, message: "Color of heading is not red" });
        } else {
            results.push({ status: true, message: "Color of heading is red" });
        }

        if (!headingFontSize || headingFontSize !== fontSize) {
            results.push({ status: false, message: "Font size of heading is not 24px" });
        } else {
            results.push({ status: true, message: "Font size of heading is 24px" });
        }

        let allParagraphsGreen = true;
        paragraphs.forEach((paragraph) => {
            const paragraphComputedStyle = dom.window.getComputedStyle(paragraph);
            const paragraphColor = paragraphComputedStyle.getPropertyValue("color");

            if (paragraphColor !== greenColor) {
                allParagraphsGreen = false;
                return; 
            }
        });

        if (!allParagraphsGreen) {
            results.push({ status: false, message: "Not all paragraphs with class have green color" });
        } else {
            results.push({ status: true, message: "All paragraphs with class have green color" });
        }

        res.status(200).json({status:0,results});
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: "Có lỗi xảy ra." });
    }
};

// Thực hành CSS selectors #1
export const ExerciseCssSelectors = (exercise, res) => {
    try {
        let htmlCode = exercise;
        
        const dom = new JSDOM(htmlCode);
        const document = dom.window.document;

        const h2Title1 = document.querySelectorAll('h2');
        const h2Title2 = document.querySelector('.post-item .title');
        const h2Title3 = document.querySelector('.post-item h2:not(.title)');

        const h2Title1Style = dom.window.getComputedStyle(h2Title1[0]);
        const h2Title2Style = dom.window.getComputedStyle(h2Title2);
        const h2Title3Style = dom.window.getComputedStyle(h2Title1[2]);

        const redColor = "rgb(255, 0, 0)";
        const fontSize28px = "28px";

        // Kiểm tra cho Tiêu đề 1
        const h2Title1Color = h2Title1Style.getPropertyValue("color");
        const h2Title1FontSize = h2Title1Style.getPropertyValue("font-size");

        if (h2Title1Color == redColor) {
            console.log("1");
            res.status(200).json({ message: `"Tiêu đề 1" & "Tiêu đề 3" không bị ảnh hưởng` });
            return
        }

        if (h2Title1FontSize == fontSize28px) {
            console.log("1");
            res.status(200).json({ message: `"Tiêu đề 1" & "Tiêu đề 3" không bị ảnh hưởng` });
            return
        }

        // Kiểm tra cho Tiêu đề 2
        const h2Title2Color = h2Title2Style.getPropertyValue("color");
        const h2Title2FontSize = h2Title2Style.getPropertyValue("font-size");

        if (h2Title2Color !== redColor) {
            console.log("2");
            res.status(200).json({ message: "Tiêu đề 2 ko có màu đỏ" });
            return
        }

        if (h2Title2FontSize !== fontSize28px) {
            console.log("2");
            res.status(200).json({ message: "Tiêu đề 2 có ko font-size là 28px" });
            return
        }

        // Kiểm tra cho Tiêu đề 3
        const h2Title3Color = h2Title3Style.getPropertyValue("color");
        const h2Title3FontSize = h2Title3Style.getPropertyValue("font-size");

        if (h2Title3Color == redColor) {
            console.log("3");
            res.status(200).json({ message: `Tiêu đề 1" & "Tiêu đề 3" không bị ảnh hưởng` });
            return
        }

        if (h2Title3FontSize == fontSize28px) {
            console.log("3");
            res.status(200).json({ message: `Tiêu đề 1" & "Tiêu đề 3" không bị ảnh hưởng` });
            return
        }
        return res.status(200).json({ message: `oke` });
    } catch (error) {
        console.log(error);
    }
};

// Thực hành độ ưu tiên trong CSS #1
export const ExerciseCssPriority = (exercise, res) => {
    try {
        let htmlCode = exercise;
        console.log(exercise);
        const dom = new JSDOM(htmlCode);
        const document = dom.window.document;

        const h1Heading = document.querySelector('h1#heading');

        const h1HeadingStyle = dom.window.getComputedStyle(h1Heading);
        const textColor = h1HeadingStyle.getPropertyValue('color');
        console.log(textColor);
        if (textColor !== 'rgb(51, 51, 51)') {
            res.status(200).json({ message: 'CSS độ ưu tiên chưa được vận dụng.' });
            return
        }
        return res.status(200).json({ message: `oke` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Lỗi khi kiểm tra bài tập.' });
    }
};