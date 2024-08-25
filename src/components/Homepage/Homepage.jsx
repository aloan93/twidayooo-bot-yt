import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import LoginBtn from "../LoginBtn/LoginBtn";
import LogoutBtn from "../LogoutBtn/LogoutBtn";
import styles from "./Homepage.module.css";
import { youtubeApi } from "../../api/api";
import Loader from "../Loader/Loader";
import LiveChatQuiz from "../LiveChatQuiz/LiveChatQuiz";
import Error from "../Error/Error";

export default function Homepage() {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [liveStream, setLiveStream] = useState(null);
  const [refreshLiveCheck, setRefreshLiveCheck] = useState(false);

  useEffect(() => {
    if (currentUser?.user) {
      setIsLoading(true);
      setErr(null);
      youtubeApi
        .get(`liveBroadcasts`, {
          headers: { Authorization: `Bearer ${currentUser.token}` },
          params: {
            broadcastStatus: "active",
            key: import.meta.env.VITE_FIREBASE_API_KEY,
            part: "snippet",
          },
        })
        .then(({ data: { items } }) => {
          items.length > 0 ? setLiveStream(items[0]) : setLiveStream(null);
          setIsLoading(false);
        })
        .catch((error) => {
          {
            error.response
              ? setErr(
                  `Failed to retrieve livestream status...\n${error.response.data.error.code} - ${error.response.data.error.status}`
                )
              : setErr(
                  `Failed to retrieve livestream status...\nPlease try again later`
                );
          }
          setIsLoading(false);
        });
    }
  }, [currentUser, refreshLiveCheck]);

  return (
    <div className={styles.container}>
      {currentUser?.user ? (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className={styles.statusContainer}>
                {err ? (
                  <Error err={err} />
                ) : (
                  <p className={styles.statusText}>
                    {liveStream
                      ? `🔴 Currently Live!\n${liveStream.snippet.title}`
                      : `Not Currently Live... 😴`}
                  </p>
                )}
                <button
                  className={styles.refreshBtn}
                  onClick={() => setRefreshLiveCheck(!refreshLiveCheck)}>
                  Refresh
                </button>
              </div>
              {liveStream ? <LiveChatQuiz liveStream={liveStream} /> : null}
              <LogoutBtn />
            </>
          )}
        </>
      ) : (
        <LoginBtn />
      )}
    </div>
  );
}
