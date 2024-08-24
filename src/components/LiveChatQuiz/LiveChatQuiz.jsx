import { useState } from "react";
import { youtubeApi } from "../../api/api";
import useAuth from "../../hooks/useAuth";
import styles from "./LiveChatQuiz.module.css";
import QuizResults from "../QuizResults/QuizResults";
import Loader from "../Loader/Loader";

export default function LiveChatQuiz({ liveStream }) {
  const { currentUser } = useAuth();
  const [question, setQuestion] = useState("");
  const [timer, setTimer] = useState("");
  const [questionReponses, setQuestionResponses] = useState(null);
  const [pageMarker, setPageMarker] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleQuestion(e) {
    e.preventDefault(e);
    console.log("starting...", question, timer);
    setIsLoading(true);
    setQuestionResponses(null);
    youtubeApi
      .post(
        `liveChat/messages`,
        {
          snippet: {
            liveChatId: liveStream.snippet.liveChatId,
            type: "textMessageEvent",
            textMessageDetails: {
              messageText: question,
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          params: {
            part: "snippet",
          },
        }
      )
      .then(() => {
        return Promise.all([
          delay(Number(timer) * 1000),
          getChatReponses(pageMarker),
        ]);
      })
      .then((results) => {
        return getChatReponses(results[1].data.nextPageToken);
      })
      .then(({ data: { items, nextPageToken } }) => {
        console.log("time success");
        setPageMarker(nextPageToken);
        setQuestionResponses({ question, responses: items });
        setTimer("");
        setQuestion("");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("wrong", error);
        setIsLoading(false);
      });
  }

  function getChatReponses(nextPage = null) {
    return youtubeApi.get(`liveChat/messages`, {
      headers: { Authorization: `Bearer ${currentUser.token}` },
      params: {
        liveChatId: liveStream.snippet.liveChatId,
        part: "snippet,authorDetails",
        pageToken: nextPage,
      },
    });
  }

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Ask Your Chat a Question</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <form className={styles.formContainer} onSubmit={handleQuestion}>
            <input
              className={styles.questionInput}
              type="text"
              placeholder="Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
            <input
              className={styles.timerInput}
              type="number"
              placeholder="Seconds"
              value={timer}
              onChange={(e) => setTimer(e.target.value)}
              required
            />
            <button className={styles.submitBtn}>{`>>`}</button>
          </form>
          {questionReponses ? (
            <QuizResults questionResponses={questionReponses} />
          ) : null}
        </>
      )}
    </div>
  );
}
