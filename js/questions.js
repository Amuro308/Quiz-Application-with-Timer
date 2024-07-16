function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let questions = [
    {
    numb: 1,
    question: "con chó có mấy chân?",
    answer: "3",
    options: [
      "1",
      "2",
      "3",
      "4"
    ]
  },
    {
    numb: 2,
    question: "tại sao con chó có 3 chân?",
    answer: "A & C",
    options: [
      "theo truyền thuyết",
      "không biết",
      "Bà tui kể lại :))",
      "A & C"
    ]
  },
    {
    numb: 3,
    question: "Múi giờ ở Việt Nam là bao nhiêu?",
    answer: "+7",
    options: [
      "+7",
      "+9",
      "+6",
      "+8"
    ]
  },
    {
    numb: 4,
    question: "Việt Nam có nơi nào được công nhận là di sản văn hóa thế giới?",
    answer: "Vịnh Hạ Long",
    options: [
      "Vịnh Hạ Long",
      "Kinh thành Huế",
      "Đỉnh phang-xi-pang",
      "tháp bà Ponagar"
    ]
  },
    {
    numb: 5,
    question: "Game có hay không?",
    answer: "Cả 3 đáp án",
    options: [
      "có",
      "hay",
      "very good :))",
      "Cả 3 đáp án"
    ]
  },
];
questions.forEach(question => {
  question.options = shuffle(question.options);
});

console.log(questions);