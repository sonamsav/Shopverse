import React, { useEffect } from "react";

const Toast = ({
  message,
  type = "success",
  show,
  setShow,
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed top-5 right-5 z-50 animate-slideIn">
      <div
        className={`px-5 py-3 rounded-lg shadow-lg text-white font-medium min-w-[250px]

        ${
          type === "success"
            ? "bg-green-500"
            : type === "error"
            ? "bg-red-500"
            : type === "warning"
            ? "bg-yellow-500"
            : "bg-blue-500"
        }
        `}
      >
        {message}
      </div>
    </div>
  );
};

export default Toast;