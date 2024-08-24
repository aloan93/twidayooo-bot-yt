import useAuth from "../../hooks/useAuth";
import styles from "./QuizResults.module.css";

export default function QuizResults({ questionResponses }) {
  const { currentUser } = useAuth();
  const question = questionResponses.question;

  // populates authors and messages to responseData whilst ensuring no author has more than one response
  const responseData = {};

  for (let response of questionResponses.responses) {
    if (response.authorDetails.displayName !== currentUser.user.displayName) {
      responseData[response.authorDetails.displayName] =
        response.snippet.displayMessage.trim().toLowerCase();
    }
  }

  // if there are no responses after the filtering above this will return alternate html
  if (Object.keys(responseData) < 1) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>{question}</h3>
        <p className={styles.noResponse}>No responses...</p>
      </div>
    );
  }

  // populates all answers and their frequency to answerFrequencies
  const answerValues = Object.values(responseData);
  const totalAnswers = answerValues.length;
  const answerFrequencies = {};

  for (let value of answerValues) {
    answerFrequencies[value]
      ? answerFrequencies[value]++
      : (answerFrequencies[value] = 1);
  }

  // converts answerFrequencies to an array and sorts high to low
  const highToLowAnsers = Object.entries(answerFrequencies).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{question}</h3>
      <p className={styles.responseTotal}>{`(${totalAnswers} ${
        totalAnswers > 1 ? "responses" : "response"
      })`}</p>
      <ul className={styles.listContainer}>
        {highToLowAnsers.map((answer, i) => {
          return (
            <li className={styles.listEntry} key={i}>
              <p
                className={styles.entryValue}>{`${answer[0].toUpperCase()}`}</p>
              <p className={styles.entryPercentage}>{`${
                Math.round((100 / totalAnswers) * answer[1] * 100) / 100
              }%`}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
