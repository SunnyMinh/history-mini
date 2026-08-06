// import {
//   useEffect,
//   useState,
// } from "react";

// import "./PeriodEditForm.css";

// function PeriodEditForm({
//   period,
//   onSave,
//   onClose,
// }) {
//   const [
//     periodName,
//     setPeriodName,
//   ] = useState("");

//   const [
//     timeLabel,
//     setTimeLabel,
//   ] = useState("");

//   const [error, setError] =
//     useState("");

//   useEffect(() => {
//     setPeriodName(
//       period.period_name || ""
//     );

//     setTimeLabel(
//       period.time_label || ""
//     );

//     setError("");
//   }, [period]);

//   function handleSubmit(event) {
//     event.preventDefault();

//     setError("");

//     const cleanPeriodName =
//       periodName.trim();

//     const cleanTimeLabel =
//       timeLabel.trim();

//     if (!cleanPeriodName) {
//       setError(
//         "Vui lòng nhập tên thời kỳ"
//       );

//       return;
//     }

//     onSave({
//       period_name:
//         cleanPeriodName,

//       time_label:
//         cleanTimeLabel,
//     });
//   }

//   function handleOverlayClick(event) {
//     if (
//       event.target ===
//       event.currentTarget
//     ) {
//       onClose();
//     }
//   }

//   return (
//     <div
//       className="period-edit-overlay"
//       onClick={handleOverlayClick}
//     >
//       <div
//         className="period-edit-form"
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="period-edit-title"
//       >
//         <div className="period-edit-form__header">
//           <div>
//             <p className="period-edit-form__label">
//               PERIOD
//             </p>

//             <h2 id="period-edit-title">
//               Chỉnh sửa thời kỳ
//             </h2>
//           </div>

//           <button
//             type="button"
//             className="period-edit-form__close-button"
//             onClick={onClose}
//             aria-label="Đóng form"
//           >
//             ×
//           </button>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="period-edit-form__field">
//             <label htmlFor="period-name">
//               Tên thời kỳ
//             </label>

//             <input
//               id="period-name"
//               type="text"
//               value={periodName}
//               onChange={(event) =>
//                 setPeriodName(
//                   event.target.value
//                 )
//               }
//               placeholder="Nhập tên thời kỳ"
//             />
//           </div>

//           <div className="period-edit-form__field">
//             <label htmlFor="period-time">
//               Thời gian
//             </label>

//             <input
//               id="period-time"
//               type="text"
//               value={timeLabel}
//               onChange={(event) =>
//                 setTimeLabel(
//                   event.target.value
//                 )
//               }
//               placeholder="Ví dụ: 1945 - 1975"
//             />
//           </div>

//           {error && (
//             <p className="period-edit-form__error">
//               {error}
//             </p>
//           )}

//           <div className="period-edit-form__actions">
//             <button
//               type="button"
//               className="period-edit-form__cancel-button"
//               onClick={onClose}
//             >
//               Hủy
//             </button>

//             <button
//               type="submit"
//               className="period-edit-form__save-button"
//             >
//               Lưu thay đổi
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default PeriodEditForm;

import {
  useEffect,
  useState,
} from "react";

function PeriodEditForm({
  period,
  onSave,
  onClose,
}) {
  const [
    periodName,
    setPeriodName,
  ] = useState("");

  const [
    timeLabel,
    setTimeLabel,
  ] = useState("");

  const [error, setError] =
    useState("");

  useEffect(() => {
    setPeriodName(
      period.period_name || ""
    );

    setTimeLabel(
      period.time_label || ""
    );

    setError("");
  }, [period]);

  function handleSubmit(event) {
    event.preventDefault();

    setError("");

    const cleanPeriodName =
      periodName.trim();

    const cleanTimeLabel =
      timeLabel.trim();

    if (!cleanPeriodName) {
      setError(
        "Vui lòng nhập tên thời kỳ"
      );

      return;
    }

    onSave({
      period_name:
        cleanPeriodName,

      time_label:
        cleanTimeLabel,
    });
  }

  function handleOverlayClick(event) {
    if (
      event.target ===
      event.currentTarget
    ) {
      onClose();
    }
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[1000]

        grid
        place-items-center

        bg-black/55
        p-5
      "
      onClick={handleOverlayClick}
    >
      <div
        className="
          w-full
          max-w-[520px]

          rounded-[10px]
          bg-white
          p-6

          shadow-[0_20px_50px_rgba(0,0,0,0.25)]

          max-[500px]:p-[18px]
        "
        role="dialog"
        aria-modal="true"
        aria-labelledby="period-edit-title"
      >
        <div
          className="
            mb-6
            flex
            items-start
            justify-between
            gap-5
          "
        >
          <div>
            <p
              className="
                mb-[5px]
                mt-0

                text-xs
                font-bold
                tracking-[1.5px]
                text-[#6b7280]
              "
            >
              PERIOD
            </p>

            <h2
              id="period-edit-title"
              className="
                m-0
                text-[1.4rem]
              "
            >
              Chỉnh sửa thời kỳ
            </h2>
          </div>

          <button
            type="button"
            className="
              cursor-pointer
              border-0
              bg-transparent
              p-0

              text-[1.8rem]
              leading-none
              text-[#6b7280]

              transition-[color,transform]
              duration-200
              ease-in-out

              hover:scale-[1.12]
              hover:text-[#111827]
            "
            onClick={onClose}
            aria-label="Đóng form"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div
            className="
              mb-[18px]
              grid
              gap-2
            "
          >
            <label
              htmlFor="period-name"
              className="font-semibold"
            >
              Tên thời kỳ
            </label>

            <input
              id="period-name"
              type="text"
              value={periodName}
              onChange={(event) =>
                setPeriodName(
                  event.target.value
                )
              }
              placeholder="Nhập tên thời kỳ"
              className="
                w-full
                rounded-md
                border
                border-[#d1d5db]
                px-3
                py-[11px]

                [font:inherit]
                outline-none

                focus:border-blue-600
                focus:shadow-[0_0_0_3px_rgba(37,99,235,0.15)]
              "
            />
          </div>

          <div
            className="
              mb-[18px]
              grid
              gap-2
            "
          >
            <label
              htmlFor="period-time"
              className="font-semibold"
            >
              Thời gian
            </label>

            <input
              id="period-time"
              type="text"
              value={timeLabel}
              onChange={(event) =>
                setTimeLabel(
                  event.target.value
                )
              }
              placeholder="Ví dụ: 1945 - 1975"
              className="
                w-full
                rounded-md
                border
                border-[#d1d5db]
                px-3
                py-[11px]

                [font:inherit]
                outline-none

                focus:border-blue-600
                focus:shadow-[0_0_0_3px_rgba(37,99,235,0.15)]
              "
            />
          </div>

          {error && (
            <p
              className="
                mb-[18px]
                mt-0
                rounded-md
                bg-[#fee2e2]
                px-3
                py-2.5
                text-[#991b1b]
              "
            >
              {error}
            </p>
          )}

          <div
            className="
              mt-6
              flex
              justify-end
              gap-2.5

              max-[500px]:flex-col-reverse
              max-[500px]:[&>button]:w-full
            "
          >
            <button
              type="button"
              className="
                cursor-pointer
                rounded-md
                border-0
                bg-[#e5e7eb]
                px-4
                py-2.5

                text-[#374151]
                [font:inherit]

                transition-[background-color,transform,box-shadow]
                duration-200
                ease-in-out

                hover:-translate-y-0.5
                hover:bg-[#d1d5db]

                active:translate-y-0
                active:shadow-none
              "
              onClick={onClose}
            >
              Hủy
            </button>

            <button
              type="submit"
              className="
                cursor-pointer
                rounded-md
                border-0
                bg-blue-600
                px-4
                py-2.5

                text-white
                [font:inherit]

                transition-[background-color,transform,box-shadow]
                duration-200
                ease-in-out

                hover:-translate-y-0.5
                hover:bg-blue-700
                hover:shadow-[0_5px_12px_rgba(37,99,235,0.3)]

                active:translate-y-0
                active:shadow-none
              "
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PeriodEditForm;