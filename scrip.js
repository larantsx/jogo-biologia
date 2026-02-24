
  'use strict';

  const questions = [
  {
    id: 1,
    question: "Qual é a principal modelo estrutural da membrana plasmatica?",
    answers: [
      {id: 'a', text: "Modelo de folheto lipídico.", correct: false},
      {id: 'b', text: "Modelo demosaico fluido.", correct:  true},
      {id: 'c', text: "Modelo de barreira rigída.", correct:false},
      {id: 'd', text: "Modelo de rede proteica.", correct:false},
    ]
  },
  {
    id: 2,
    question: "A membrana plasmática controla a entrada e saída de substâncias de forma seletiva. Qual o nome dessa característica? ",
    answers: [
      {id: 'a', text: " Permeabilidade total", correct: false},
      {id: 'b', text: " Permeabilidade seletiva (ou semipermeabilidade)", correct: true},
      {id: 'c', text: "Impermeabilidade", correct: false},
      {id: 'd', text: "Difusão simples ", correct: false},
    ]
  },
  {
    id: 3,
    question: " O que é o citoplasma?",
    answers: [
      {id: 'a', text: "O núcleo da célula", correct: false},
      {id: 'b', text: "A membrana externa apenas", correct: false},
      {id: 'c', text: "O espaço entre a membrana e o núcleo, contendo citosol e organelas", correct: true},
    ]
  },
  {
    id: 4,
    question: "Qual componente da membrana celular é responsável pelo reconhecimento de substâncias e células?",
    answers: [
      {id: 'a', text: " Fosfolipídios", correct: false},
      {id: 'b', text: " Glicocálix", correct: true},
      {id: 'c', text: "Colesterol", correct: false},
    ]
  },
  {
    id: 5,
    question: "Quais estruturas abaixo não são encontradas no citoplasma de células eucariontes?",
    answers: [
      {id: 'a', text: " Mitocôndrias", correct: false},
      {id: 'b', text: "Ribossomos", correct: false},
      {id: 'c', text: "Complexo de Golgi", correct: false},
      {id: 'd', text: " Nucleoide ", correct: true},
    ]
  },
  {
    id: 6,
    question: "Quando uma substância atravessa a membrana a favor do gradiente de concentração, sem gasto de energia, chamamos de:",
    answers: [
      {id: 'a', text: "Transporte ativo.", correct: false},
      {id: 'b', text: "Osmose apenas.", correct: false},
      {id: 'c', text: " Transporte passivo.", correct: true},
    ]
  },
  {
    id: 7,
    question: "A 'Bomba de Sódio e Potássio' é um exemplo clássico de:",
    answers: [
      {id: 'a', text: "Difusão simples.", correct: false},
      {id: 'b', text: "Transporte ativo (com gasto de ATP).", correct: true},
      {id: 'c', text: "Transporte passivo.", correct: false},
      {id: 'd', text: "Fagocitose.", correct: false},
    ]
  },
  {
    id: 8,
    question: "O processo de englobamento de partículas sólidas grandes pela célula, através da emissão de pseudópodes, é a:",
    answers: [
      {id: 'a', text: "Pinocitose", correct: false},
      {id: 'b', text: "Difusão facilitada.", correct: false},
      {id: 'c', text: "Fagocitose.", correct: true},
      {id: 'd', text: "Diapedese.", correct: false},
    ]
  },
  {
    id: 9,
    question: "No citoplasma, qual organela é responsável pela síntese de proteínas?",
    answers: [
      {id: 'a', text: "Mitocôndria.", correct: false},
      {id: 'b', text: " Complexo de Golgi.", correct: false},
      {id: 'c', text: " Ribossomo.", correct: true},
    ]
  },
  {
    id: 10,
    question: " O citoesqueleto, presente no citoplasma, é formado por:",
    answers: [
      {id: 'a', text: " Microtúbulos e microfilamentos de proteína", correct: true},
      {id: 'b', text: "Fibras de celulose rígidas", correct: false},
      {id: 'c', text: "Apenas moléculas de gordura", correct: false}
    ]
  },
  {
    id: 11,
    question: "A osmose é um caso particular de difusão que envolve o movimento de:",
    answers: [
      {id: 'a', text: "Proteínas grandes", correct: false},
      {id: 'b', text: " Solutos como o sal", correct: false},
      {id: 'c', text: "Água (solvente)", correct: true}
    ]
  },
  {
    id: 12,
    question: " Qual organela citoplasmática possui enzimas digestivas para a reciclagem de componentes celulares?",
    answers: [
      {id: 'a', text: " Peroxissomo", correct: false},
      {id: 'b', text: "Lisossomo", correct: true},
      {id: 'c', text: " Retículo Endoplasmático Liso", correct: false},
      {id: 'd', text: "Vacúolo contrátil", correct: false}
    ]
  }
];


  let currentQuestionIndex = 0;
  let score = 0;

  const questionTitleEl = document.getElementById('questionTitle');
  const questionDescEl = document.getElementById('questionDesc');
  const answersListEl = document.getElementById('answersList');
  const scoreBoardEl = document.getElementById('scoreBoard');
  const questionListEl = document.getElementById('questionList');
  const toastEl = document.getElementById('toast');
  const toastMessageEl = document.getElementById('toastMessage');
  const toastIconEl = document.getElementById('toastIcon');
  const sidebarEl = document.querySelector('nav.sidebar');
  const sidebarToggleBtn = document.getElementById('sidebarToggle');


  // Accessibility: Focus management helper
  function setFocus(el) {
    if (!el) return;
    el.focus();
  }


  function createQuestionList() {
    questions.forEach((q, idx) => {
      const li = document.createElement('li');
      li.setAttribute('role', 'listitem');
      li.setAttribute('tabindex', '0');
      li.dataset.index = idx;
      li.textContent = `Pergunta ${idx + 1}`;
      if(idx === currentQuestionIndex){
        li.classList.add('selected');
      }
      li.addEventListener('click', () => {
        if(currentQuestionIndex !== idx){
          currentQuestionIndex = idx;
          loadQuestion(currentQuestionIndex);
          updateSelectedListItem();
        }
        closeSidebarIfMobile();
      });
      li.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          li.click();
        }
      });
      questionListEl.appendChild(li);
    });
  }

  function updateSelectedListItem() {
    [...questionListEl.children].forEach((li, i) => {
      li.classList.toggle('selected', i === currentQuestionIndex);
    });
  }

  function loadQuestion(index) {
    const q = questions[index];
    questionTitleEl.textContent = q.question;
    answersListEl.innerHTML = '';

    q.answers.forEach(({id, text}) => {
      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.type = 'button';
      btn.setAttribute('role', 'listitem');
      btn.textContent = text;
      btn.dataset.answerId = id;
      btn.disabled = false;

      btn.addEventListener('click', () => handleAnswerSelection(btn, q));
      btn.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });

      answersListEl.appendChild(btn);
    });

    // Focus on first answer for accessibility
    setFocus(answersListEl.firstElementChild);
  }

  function handleAnswerSelection(btn, question) {
    const selectedAnswerId = btn.dataset.answerId;
    const answer = question.answers.find(a => a.id === selectedAnswerId);
    if (!answer) return;

    // Disable all buttons after one selection
    const allButtons = answersListEl.querySelectorAll('button');
    allButtons.forEach(b => b.disabled = true);

    // Mark correct and incorrect
    allButtons.forEach(b => {
      const aid = b.dataset.answerId;
      const ans = question.answers.find(a => a.id === aid);
      if(ans.correct) {
        b.classList.add('correct');
      }
      if(b === btn && !ans.correct){
        b.classList.add('incorrect');
      }
    });

    // Score calculation and toast
    let message = '';
    if(answer.correct) {
      score += 2;
      message = '+2 pontos! Resposta correta!.';
      showToast(message, 'check_circle', true);
    } else {
      score -= 1;
      if(score < 0) score = 0; // no negative score
      message = '-1 ponto. Resposta incorreta!.';
      showToast(message, 'error', false);
    }
    updateScore();

    // Auto-advance after short delay when correct or incorrect
    setTimeout(() => {
      goToNextQuestion();
    }, 2000);
  }

  function updateScore() {
scoreBoardEl.innerHTML = `<i class="fa-solid fa-star"></i> Pontuação: ${score}`;
  }

  function goToNextQuestion() {
    if(currentQuestionIndex + 1 < questions.length){
      currentQuestionIndex++;
      loadQuestion(currentQuestionIndex);
      updateSelectedListItem();
      closeSidebarIfMobile();
    } else {
      showQuizComplete();
    }
  }

  function showQuizComplete() {
    questionTitleEl.textContent = 'Parabéns! Você concluiu o quiz.';
    questionDescEl.textContent = `Sua pontuação final é: ${score} ponto${score !== 1 ? 's' : ''}.`;
    answersListEl.innerHTML = '';
    scoreBoardEl.textContent = `Pontuação final: ${score}`;
  }

  // Toast notifications
  let toastTimeout;
  function showToast(message, icon, positive = true) {
    toastMessageEl.textContent = message;
    toastIconEl.textContent = icon;
    toastIconEl.style.color = positive ? '#22c55e' : '#ef4444';
    toastEl.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2500);
  }

  // Sidebar toggle for mobile
  sidebarToggleBtn.addEventListener('click', () => {
    sidebarEl.classList.toggle('open');
  });
  function closeSidebarIfMobile(){
    if(window.innerWidth < 1024 && sidebarEl.classList.contains('open')){
      sidebarEl.classList.remove('open');
      sidebarToggleBtn.focus();
    }
  }
  // Close sidebar on window resize if needed
  window.addEventListener('resize', () => {
    if(window.innerWidth >= 1024){
      sidebarEl.classList.remove('open');
    }
  });

  // Initialization
  createQuestionList();
  loadQuestion(currentQuestionIndex);
  updateScore();
  document.getElementById('startBtn').addEventListener('click', () => {
    document.getElementById('startScreen').style.display = 'none';
  });



