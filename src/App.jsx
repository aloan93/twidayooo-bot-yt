import { Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Homepage from "./components/Homepage/Homepage";
import Navbar from "./components/NavBar/Navbar";

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
