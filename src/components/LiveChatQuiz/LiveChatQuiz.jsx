import { useState } from "react";
import { youtubeApi } from "../../api/api";
import useAuth from "../../hooks/useAuth";
import styles from "./LiveChatQuiz.module.css";

export default function LiveChatQuiz({ liveStream }) {
  const { currentUser } = useAuth();
  // const [nextPage, setNextPage] = useState(null);
  const [question, setQuestion] = useState(null);
  const [timer, setTimer] = useState(null);
  const [questionReponses, setQuestionResponses] = useState(null);
  const [pageMarker, setPageMarker] = useState(null);

  function handleQuestion(e) {
    e.preventDefault(e);
    console.log("starting...", question, timer);
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
        console.log("HERE", results[1].data.items);
        return getChatReponses(results[1].data.nextPageToken);
      })
      .then(({ data: { items, nextPageToken } }) => {
        console.log("time success", items);
        setPageMarker(nextPageToken);
        setQuestionResponses(items);
      })
      .catch((error) => {
        console.log("wrong", error);
      });
  }

  function getChatReponses(nextPage = null) {
    return youtubeApi.get(`liveChat/messages`, {
      headers: { Authorization: `Bearer ${currentUser.token}` },
      params: {
        liveChatId: liveStream.snippet.liveChatId,
        part: "snippet",
        pageToken: nextPage,
      },
    });
    //   .then(({ data: { items, nextPageToken } }) => {
    //     // setNextPage(results.data.nextPageToken);
    //     console.log(items, nextPageToken);
    //     return items;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleQuestion}>
        <input
          type="text"
          placeholder="Question"
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Seconds"
          onChange={(e) => setTimer(e.target.value)}
          required
        />
        <button>hit it</button>
      </form>
      {/* <button onClick={getChatReponses}>get chats</button> */}
    </div>
  );
}
