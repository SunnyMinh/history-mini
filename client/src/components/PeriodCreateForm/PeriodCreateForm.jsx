import {
  useState,
} from "react";

function PeriodCreateForm({
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
        aria-labelledby="period-create-title"
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
              id="period-create-title"
              className="
                m-0
                text-[1.4rem]
              "
            >
              Thêm thời kỳ
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

              transition-[background-color,color,transform,box-shadow]
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
              htmlFor="new-period-name"
              className="font-semibold"
            >
              Tên thời kỳ
            </label>

            <input
              id="new-period-name"
              type="text"
              value={periodName}
              onChange={(event) =>
                setPeriodName(
                  event.target.value
                )
              }
              placeholder="Nhập tên thời kỳ"
              autoFocus
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
              htmlFor="new-period-time"
              className="font-semibold"
            >
              Thời gian
            </label>

            <input
              id="new-period-time"
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

                transition-[background-color,color,transform,box-shadow]
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

                transition-[background-color,color,transform,box-shadow]
                duration-200
                ease-in-out

                hover:-translate-y-0.5
                hover:bg-blue-700
                hover:shadow-[0_5px_12px_rgba(37,99,235,0.3)]

                active:translate-y-0
                active:shadow-none
              "
            >
              Thêm thời kỳ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PeriodCreateForm;
