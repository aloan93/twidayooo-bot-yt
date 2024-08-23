import { youtubeApi } from "../../api/api";
import useAuth from "../../hooks/useAuth";
import styles from "./LiveChatQuiz.module.css";

export default function LiveChatQuiz({ liveStream }) {
  const { currentUser } = useAuth();

  function handleQuestion(e) {
    e.preventDefault(e);
    console.log(e.target[0].value);
    youtubeApi
      .post(
        `liveChat/messages`,
        {
          snippet: {
            liveChatId: liveStream.snippet.liveChatId,
            type: "textMessageEvent",
            textMessageDetails: {
              messageText: e.target[0].value,
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
      .then((results) => {
        console.log("success", results);
      })
      .catch((error) => {
        console.log("wrong", error);
      });
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleQuestion}>
        <input type="text" placeholder="Question" required />
        <button>hit it</button>
      </form>
    </div>
  );
}
