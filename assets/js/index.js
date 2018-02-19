
// contador de respuestas correctas
let counterCorrect = 0;
// contador de respuestas incorrectas 
let counterIncorrect = 0;

// Evento click para comenzar la trivia
$('#start, #next').click(function() {
  // Llamado api
  fetch('https://opentdb.com/api.php?amount=30&category=17&difficulty=easy&type=multiple')
    .then(response => response.json())
    .then(data => {
      $('#intro, .answer').remove();
      $('#theTrivias').empty();
      $('#next').removeAttr('class');
      // Guardando los datos 
      const datos = data.results;
      const arrayDatos = datos.sort();
      // creando dom
      $('#theTrivias').append('<h3>' + arrayDatos[0].question + '</h3><button value="correct" class="option">' + 
        arrayDatos[0].correct_answer + '</button><button value="incorrect" class="option">' + 
        arrayDatos[0].incorrect_answers[0] + '</button><button value="incorrect" class="option">' + 
        arrayDatos[0].incorrect_answers[1] + '</button><button value="incorrect" class="option">' + 
        arrayDatos[0].incorrect_answers[2] + '</button>');
      // guardando suma
      let sumCounter = counterCorrect + counterIncorrect;
      // si la suma de los resultados es menos a 10, se sigue con las preguntas
      if (sumCounter < 10) {
        // funcion seleccion de la respuesta
        $('.option').click(function() {
          const select = $(this).val();
          if (select === 'correct') {
            $(this).addClass('correct');
            // dom muestra respuesta correcta
            $('#next').after('<h3 class="answer">¡Correct Yaayy! </h3>');
            counterCorrect++;
          } else {
            // don muestra respuesta incorrecta
            $(this).addClass('incorrect');
            $('#next').after('<h3 class="answer">¡Cuak Incorrect! The answer is: "' + 
              data.results[0].correct_answer + '" </h3>');
            counterIncorrect++;
          }
        });
        // si la cantidad de preguntas es 10, entonces muestra resultados de respuestas correcta y respuestas incorrectas
      } if (sumCounter === 10) {
        $('#theTrivias').empty();
        $('#next').addClass('hidden');
        $('#theTrivias').append('<h3 class="end"> You got ' + 
          counterCorrect + ' correct answers and ' + 
          counterIncorrect + ' incorrect answers. </h3>');
      }
    });
});


