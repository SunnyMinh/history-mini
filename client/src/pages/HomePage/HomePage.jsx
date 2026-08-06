// import {
//   useEffect,
//   useState,
// } from "react";

// import {
//   useNavigate,
// } from "@tanstack/react-router";

// import Lists from "../../components/Menu/Menu";
// import Texts from "../../components/Texts/Text";

// import {
//   getPeriods,
//   getEvents,
// } from "../../services/historyApi";

// import {
//   removeStoredAuth,
//   getStoredUser,
// } from "../../utils/authStorage";

// import "./HomePage.css";

// function HomePage() {
//   const navigate = useNavigate();

//   const user = getStoredUser();

//   const isAdmin = user?.roles?.includes(
//     "Admin"
//   );

//   const [periods, setPeriods] =
//     useState([]);

//   const [events, setEvents] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(true);

//   const [error, setError] =
//     useState("");

//   useEffect(() => {
//     async function loadHistoryData() {
//       try {
//         setLoading(true);
//         setError("");

//         const [
//           periodsData,
//           eventsData,
//         ] = await Promise.all([
//           getPeriods(),
//           getEvents(),
//         ]);

//         console.log(
//           "Periods từ API:",
//           periodsData
//         );

//         console.log(
//           "Events từ API:",
//           eventsData
//         );

//         setPeriods(
//           periodsData.data
//         );

//         setEvents(
//           eventsData.data
//         );
//       } catch (error) {
//         console.error(
//           "Lỗi lấy dữ liệu lịch sử:",
//           error
//         );

//         setError(
//           error.message ||
//             "Không thể lấy dữ liệu lịch sử"
//         );
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadHistoryData();
//   }, []);

//   function handleLogout() {
//     removeStoredAuth();

//     navigate({
//       to: "/",
//       replace: true,
//     });
//   }

//   function handleGoToAdmin() {
//     navigate({
//       to: "/admin",
//     });
//   }

//   if (loading) {
//     return (
//       <p>
//         Đang tải dữ liệu lịch sử...
//       </p>
//     );
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <main className="home-page">
//   <header className="home-topbar">
//     <div className="home-topbar__actions">
//       {isAdmin && (
//         <button
//           type="button"
//           className="home-topbar__admin-button"
//           onClick={handleGoToAdmin}
//         >
//           Quay lại trang quản trị
//         </button>
//       )}

//       <button
//         type="button"
//         className="home-topbar__logout-button"
//         onClick={handleLogout}
//       >
//         Đăng xuất
//       </button>
//     </div>
//   </header>

//   <section className="hero">
//     <h1 className="hero__title">
//       Các giai đoạn của Việt Nam
//     </h1>
//   </section>

//       <section className="history-container">
//         <aside className="history-sidebar">
//           <Lists
//             periods={periods}
//             events={events}
//           />
//         </aside>

//         <div className="history-content">
//           <Texts
//             periods={periods}
//             events={events}
//           />
//         </div>
//       </section>
//     </main>
//   );
// }

// export default HomePage;

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "@tanstack/react-router";

import Lists from "../../components/Menu/Menu";
import Texts from "../../components/Texts/Text";

import {
  getPeriods,
  getEvents,
} from "../../services/historyApi";

import {
  removeStoredAuth,
  getStoredUser,
} from "../../utils/authStorage";

function HomePage() {
  const navigate = useNavigate();

  const user = getStoredUser();

  const isAdmin =
    user?.roles?.includes("Admin");

  const [periods, setPeriods] =
    useState([]);

  const [events, setEvents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadHistoryData() {
      try {
        setLoading(true);
        setError("");

        const [
          periodsData,
          eventsData,
        ] = await Promise.all([
          getPeriods(),
          getEvents(),
        ]);

        console.log(
          "Periods từ API:",
          periodsData
        );

        console.log(
          "Events từ API:",
          eventsData
        );

        setPeriods(
          periodsData.data
        );

        setEvents(
          eventsData.data
        );
      } catch (error) {
        console.error(
          "Lỗi lấy dữ liệu lịch sử:",
          error
        );

        setError(
          error.message ||
            "Không thể lấy dữ liệu lịch sử"
        );
      } finally {
        setLoading(false);
      }
    }

    loadHistoryData();
  }, []);

  function handleLogout() {
    removeStoredAuth();

    navigate({
      to: "/",
      replace: true,
    });
  }

  function handleGoToAdmin() {
    navigate({
      to: "/admin",
    });
  }

  if (loading) {
    return (
      <p>
        Đang tải dữ liệu lịch sử...
      </p>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main
      className="
        min-h-screen
        pt-16
        max-[600px]:pt-[60px]
      "
    >
      <header
        className="
          fixed
          top-0
          right-0
          left-0
          z-[1000]

          flex
          min-h-16
          items-center
          justify-end

          border-b
          border-white/15
          bg-black/[0.68]

          px-6
          py-2.5

          backdrop-blur-[8px]

          max-[600px]:min-h-[60px]
          max-[600px]:px-3
          max-[600px]:py-2
        "
      >
        <div
          className="
            flex
            items-center
            gap-3

            max-[600px]:gap-2
          "
        >
          {isAdmin && (
            <button
              type="button"
              className="
                cursor-pointer
                rounded-md
                border
                border-blue-600
                bg-blue-600

                px-4
                py-2.5

                font-semibold
                text-white

                transition-colors
                duration-200

                hover:border-blue-700
                hover:bg-blue-700

                max-[600px]:px-2.5
                max-[600px]:py-2
                max-[600px]:text-[0.85rem]
              "
              onClick={handleGoToAdmin}
            >
              Quay lại trang quản trị
            </button>
          )}

          <button
            type="button"
            className="
              cursor-pointer
              rounded-md
              border
              border-white/20
              bg-red-600/90

              px-4
              py-2.5

              font-semibold
              text-white

              transition-colors
              duration-200

              hover:bg-red-700

              max-[600px]:px-2.5
              max-[600px]:py-2
              max-[600px]:text-[0.85rem]
            "
            onClick={handleLogout}
          >
            Đăng xuất
          </button>
        </div>
      </header>

      <section
        className="
          flex
          min-h-[700px]
          w-full
          items-center
          justify-center

          bg-[url('/img/VN-flag.png')]
          bg-cover
          bg-center
          bg-no-repeat
        "
      >
        <h1
          className="
            m-0
            p-5

            text-center
            text-[clamp(2.5rem,6vw,5rem)]
            font-black
            tracking-[2px]
            text-white
            uppercase

            [text-shadow:0_4px_15px_rgba(0,0,0,0.5)]
          "
        >
          Các giai đoạn của Việt Nam
        </h1>
      </section>

      <section
        className="
          grid
          w-full
          grid-cols-[minmax(240px,280px)_minmax(0,1fr)]
          items-start
          gap-6

          bg-[#eef2f7]
        "
      >
        <aside
          className="
            sticky
            top-[84px]
            max-h-[calc(100vh-104px)]
            self-start
            overflow-y-auto
          "
        >
          <Lists
            periods={periods}
            events={events}
          />
        </aside>

        <div className="min-w-0">
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
