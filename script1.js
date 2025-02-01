// script1.js

let userProgress = {
    stock: false,
    bond: false,
    quizScore: 0
};

function showQuiz(term) {
    const quizQuestion = document.getElementById("quiz-question");

    if (term === "stock") {
        quizQuestion.innerHTML = "Which of these is a debt investment? Stock or Bond?";
    } else if (term === "bond") {
        quizQuestion.innerHTML = "Which one is considered ownership in a company? Stock or Bond?";
    }
}

function submitAnswer(answer) {
    const correctAnswer = "bond"; // Example correct answer for this question
    const resultElement = document.getElementById("quiz-result");

    if (answer === correctAnswer) {
        userProgress.quizScore++;
        resultElement.innerHTML = "Correct!";
    } else {
        resultElement.innerHTML = "Incorrect. Try again!";
    }

    updateProgress();
}

function updateProgress() {
    const progressBarFill = document.getElementById("progress-bar-fill");
    const progress = (userProgress.quizScore / 1) * 100; // Update progress (adjust based on total quiz score)
    progressBarFill.style.width = `${progress}%`;
}

document.addEventListener("DOMContentLoaded", () => {
    fetchNews();
});

async function fetchNews() {
    const response = await fetch("http://localhost:5000/api/news");
    const news = await response.json();

    const newsContainer = document.getElementById("news-container");
    news.forEach(item => {
        const newsItem = document.createElement("div");
        newsItem.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p>`;
        newsContainer.appendChild(newsItem);
    });
}
$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
    var $this = $(this),
        label = $this.prev('label');
  
        if (e.type === 'keyup') {
              if ($this.val() === '') {
            label.removeClass('active highlight');
          } else {
            label.addClass('active highlight');
          }
      } else if (e.type === 'blur') {
          if( $this.val() === '' ) {
              label.removeClass('active highlight'); 
              } else {
              label.removeClass('highlight');   
              }   
      } else if (e.type === 'focus') {
        
        if( $this.val() === '' ) {
              label.removeClass('highlight'); 
              } 
        else if( $this.val() !== '' ) {
              label.addClass('highlight');
              }
      }
  
  });
  
  $('.tab a').on('click', function (e) {
    
    e.preventDefault();
    
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    
    target = $(this).attr('href');
  
    $('.tab-content > div').not(target).hide();
    
    $(target).fadeIn(600);
    
  });