import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import LoginBtn from "../LoginBtn/LoginBtn";
import LogoutBtn from "../LogoutBtn/LogoutBtn";
import styles from "./Homepage.module.css";
import { youtubeApi } from "../../api/api";
import Loader from "../Loader/Loader";

export default function Homepage() {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [liveStream, setLiveStream] = useState(null);
  const [refreshLiveCheck, setRefreshLiveCheck] = useState(false);

  useEffect(() => {
    if (currentUser?.user) {
      setIsLoading(true);
      youtubeApi
        .get(`liveBroadcasts`, {
          headers: { Authorization: `Bearer ${currentUser.token}` },
          params: { broadcastStatus: "active" },
        })
        .then(({ data: { items } }) => {
          console.log(items);
          items.length > 0 ? setLiveStream(items[0]) : setLiveStream(null);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
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
                <p className={styles.statusText}>
                  {liveStream
                    ? `🔴 Currently Live!\n${liveStream.snippet.title}`
                    : `Not Currently Live... 😴`}
                </p>
                <button
                  className={styles.refreshBtn}
                  onClick={() => setRefreshLiveCheck(!refreshLiveCheck)}>
                  Refresh
                </button>
              </div>
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
