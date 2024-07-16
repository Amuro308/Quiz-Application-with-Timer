// Tạo tất cả các biến cần thiết
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// Khi nút Bắt Đầu được nhấn
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); // Hiển thị hộp thông tin
}

// Khi nút Thoát được nhấn
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); // Ẩn hộp thông tin
}

// Khi nút Chấp nhận được nhấn
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); // Ẩn hộp thông tin
    quiz_box.classList.add("activeQuiz"); // Hiển thị hộp câu đố
    showQuetions(0); // Gọi hàm showQestions để hiển thị câu hỏi đầu tiên
    queCounter(1); // Truyền tham số 1 cho hàm queCounter để hiển thị số thứ tự câu hỏi
    startTimer(15); // Bắt đầu đếm ngược thời gian với 15 giây
    startTimerLine(0); // Bắt đầu đếm ngược thời gian cho thanh thời gian
}

// Các biến toàn cục để lưu trữ trạng thái câu đố
let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// Khi nút restartQuiz được nhấn
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); // Hiển thị hộp câu đố
    result_box.classList.remove("activeResult"); // Ẩn hộp kết quả
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); // Gọi hàm showQestions để hiển thị câu hỏi đầu tiên
    queCounter(que_numb); // Truyền giá trị que_numb cho hàm queCounter
    clearInterval(counter); // Xóa bộ đếm thời gian
    clearInterval(counterLine); // Xóa bộ đếm thời gian cho thanh thời gian
    startTimer(timeValue); // Bắt đầu đếm ngược thời gian với giá trị timeValue
    startTimerLine(widthValue); // Bắt đầu đếm ngược thời gian cho thanh thời gian
    timeText.textContent = "Time Left"; // Thay đổi văn bản của timeText thành "Time Left"
    next_btn.classList.remove("show"); // Ẩn nút tiếp theo
}

// Khi nút quitQuiz được nhấn
quit_quiz.onclick = ()=>{
    window.location.reload(); // Tải lại trang hiện tại
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// Khi nút Next Que được nhấn
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ // Nếu số câu hỏi hiện tại ít hơn tổng số câu hỏi
        que_count++; // Tăng giá trị que_count lên 1
        que_numb++; // Tăng giá trị que_numb lên 1
        showQuetions(que_count); // Gọi hàm showQestions để hiển thị câu hỏi tiếp theo
        queCounter(que_numb); // Truyền giá trị que_numb cho hàm queCounter
        clearInterval(counter); // Xóa bộ đếm thời gian
        clearInterval(counterLine); // Xóa bộ đếm thời gian cho thanh thời gian
        startTimer(timeValue); // Bắt đầu đếm ngược thời gian với giá trị timeValue
        startTimerLine(widthValue); // Bắt đầu đếm ngược thời gian cho thanh thời gian
        timeText.textContent = "Time Left"; // Thay đổi văn bản của timeText thành "Time Left"
        next_btn.classList.remove("show"); // Ẩn nút tiếp theo
    }else{
        clearInterval(counter); // Xóa bộ đếm thời gian
        clearInterval(counterLine); // Xóa bộ đếm thời gian cho thanh thời gian
        showResult(); // Gọi hàm showResult để hiển thị kết quả
    }
}

// Lấy câu hỏi và các tùy chọn từ mảng
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    // Tạo thẻ span và div mới cho câu hỏi và tùy chọn, và truyền giá trị bằng cách sử dụng chỉ số mảng
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; // Thêm thẻ span mới vào que_tag
    option_list.innerHTML = option_tag; // Thêm thẻ div mới vào option_tag
    
    const option = option_list.querySelectorAll(".option");

    // Thiết lập thuộc tính onclick cho tất cả các tùy chọn có sẵn
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// Tạo các thẻ div mới cho các biểu tượng
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

// Khi người dùng nhấp vào tùy chọn
function optionSelected(answer){
    clearInterval(counter); // Xóa bộ đếm thời gian
    clearInterval(counterLine); // Xóa bộ đếm thời gian cho thanh thời gian
    let userAns = answer.textContent; // Lấy tùy chọn người dùng đã chọn
    let correcAns = questions[que_count].answer; // Lấy câu trả lời đúng từ mảng
    const allOptions = option_list.children.length; // Lấy tất cả các mục tùy chọn
    
    if(userAns == correcAns){ // Nếu tùy chọn người dùng chọn bằng với câu trả lời đúng trong mảng
        userScore += 1; // Tăng giá trị điểm số lên 1
        answer.classList.add("correct"); // Thêm màu xanh lá cây cho tùy chọn đúng đã chọn
        answer.insertAdjacentHTML("beforeend", tickIconTag); // Thêm biểu tượng tick vào tùy chọn đúng đã chọn
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); // Thêm màu đỏ cho tùy chọn sai đã chọn
        answer.insertAdjacentHTML("beforeend", crossIconTag); // Thêm biểu tượng cross vào tùy chọn sai đã chọn
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ // Nếu có một tùy chọn khớp với câu trả lời trong mảng
                option_list.children[i].setAttribute("class", "option correct"); // Thêm màu xanh lá cây cho tùy chọn khớp
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); // Thêm biểu tượng tick vào tùy chọn khớp
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); // Khi người dùng chọn một tùy chọn thì vô hiệu hóa tất cả tùy chọn
    }
    next_btn.classList.add("show"); // Hiển thị nút tiếp theo khi người dùng chọn một tùy chọn
}

// Hiển thị kết quả
function showResult(){
    info_box.classList.remove("activeInfo"); // Ẩn hộp thông tin
    quiz_box.classList.remove("activeQuiz"); // Ẩn hộp câu đố
    result_box.classList.add("activeResult"); // Hiển thị hộp kết quả
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){ // Nếu người dùng đạt điểm trên 3
        // Tạo thẻ span mới và truyền giá trị điểm số của người dùng và tổng số câu hỏi
        let scoreTag = '<span>tuyệt vời! 🎉, bạn được <p>'+ userScore +'</p> trên <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  // Thêm thẻ span mới vào score_Text
    }
    else if(userScore > 1){ // Nếu người dùng đạt điểm trên 1
        let scoreTag = '<span>và chúc mừng 😎, bạn đúng <p>'+ userScore +'</p> trên <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // Nếu người dùng đạt điểm dưới 1
        let scoreTag = '<span>thật tiếc 😐, bạn chỉ được <p>'+ userScore +'</p> trên <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

// Bắt đầu đếm ngược thời gian
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; // Thay đổi giá trị của timeCount bằng giá trị thời gian
        time--; // Giảm giá trị thời gian đi 1
        if(time < 9){ // Nếu thời gian nhỏ hơn 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; // Thêm số 0 vào trước giá trị thời gian
        }
        if(time < 0){ // Nếu thời gian nhỏ hơn 0
            clearInterval(counter); // Xóa bộ đếm thời gian
            timeText.textContent = "Time Off"; // Thay đổi văn bản của timeText thành "Time Off"
            const allOptions = option_list.children.length; // Lấy tất cả các mục tùy chọn
            let correcAns = questions[que_count].answer; // Lấy câu trả lời đúng từ mảng
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ // Nếu có một tùy chọn khớp với câu trả lời trong mảng
                    option_list.children[i].setAttribute("class", "option correct"); // Thêm màu xanh lá cây cho tùy chọn khớp
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); // Thêm biểu tượng tick vào tùy chọn khớp
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); // Khi người dùng chọn một tùy chọn thì vô hiệu hóa tất cả tùy chọn
            }
            next_btn.classList.add("show"); // Hiển thị nút tiếp theo khi người dùng chọn một tùy chọn
        }
    }
}

// Bắt đầu đếm ngược thời gian cho thanh thời gian
function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; // Tăng giá trị thời gian lên 1
        time_line.style.width = time + "px"; // Tăng chiều rộng của time_line theo px bằng giá trị thời gian
        if(time > 549){ // Nếu giá trị thời gian lớn hơn 549
            clearInterval(counterLine); // Xóa bộ đếm thời gian cho thanh thời gian
        }
    }
}

// Hiển thị số thứ tự câu hỏi
function queCounter(index){
    // Tạo thẻ span mới và truyền giá trị số thứ tự câu hỏi và tổng số câu hỏi
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  // Thêm thẻ span mới vào bottom_ques_counter
}
