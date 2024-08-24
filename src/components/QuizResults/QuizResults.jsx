import styles from "./QuizResults.module.css";

export default function QuizResults({ questionResponses }) {
  const question = questionResponses.question;

  // populates authors and messages to responseData whilst ensuring no author has more than one response
  const responseData = {};

  for (let response of questionResponses.responses) {
    // logic required in future to strip response from streamer
    responseData[response.authorDetails.displayName] =
      response.snippet.displayMessage.trim().toLowerCase();
  }

  console.log("responseData", responseData);

  // populates all answers and their frequency to answerFrequencies
  const answerValues = Object.values(responseData);
  const answerFrequencies = {};

  for (let value of answerValues) {
    answerFrequencies[value]
      ? answerFrequencies[value]++
      : (answerFrequencies[value] = 1);
  }

  console.log("answerFrequencies", answerFrequencies);

  // converts answerFrequencies to an array and sorts high to low
  const highToLowAnsers = Object.entries(answerFrequencies).sort(
    (a, b) => b[1] - a[1]
  );

  console.log("highToLow", highToLowAnsers);

  return (
    <div className={styles.container}>
      <h2>{question}</h2>
      <ul>
        {highToLowAnsers.map((answer, i) => {
          return <li key={i}>{`${answer[0]} - ${answer[1]} times`}</li>;
        })}
      </ul>
    </div>
  );
}
