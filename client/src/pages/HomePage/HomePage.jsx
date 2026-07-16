import { useEffect, useState } from "react";

import Lists from "../../components/Menu/Menu";
import Texts from "../../components/Texts/Text";

import {
  getPeriods,
  getEvents,
} from "../../services/historyApi";

import "./HomePage.css";

function HomePage() {
  const [periods, setPeriods] = useState([]);
  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadHistoryData() {
      try {
        setLoading(true);
        setError("");

        const [periodsData, eventsData] =
          await Promise.all([
            getPeriods(),
            getEvents(),
          ]);

        console.log("Periods từ API:", periodsData);
        console.log("Events từ API:", eventsData);

        setPeriods(periodsData.data);
        setEvents(eventsData.data);
      } catch (error) {
        console.error("Lỗi lấy dữ liệu lịch sử:", error);

       setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadHistoryData();
  }, []);

  if (loading) {
    return <p>Đang tải dữ liệu lịch sử...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <section className="hero">
        <h1 className="hero__title">
          Các giai đoạn của Việt Nam
        </h1>
      </section>

      <section className="history-container">
        <aside className="history-sidebar">
          <Lists
            periods={periods}
            events={events}
          />
        </aside>

        <div className="history-content">
          <Texts
            periods={periods}
            events={events}
          />
        </div>
      </section>
    </main>
  );
}

export default HomePage;