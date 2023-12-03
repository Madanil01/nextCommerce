import React, { useState, useEffect } from "react";

interface NotificationProps {
    message: string;
    isError: boolean;
}
function NotificationComponent({ message, isError }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
        // Memperbarui halaman setelah pesan muncul selama 2 detik
        window.location.reload();
      }, 2000);
    }
  }, [message]);

  const notificationClass = isError ? "bg-red-500" : "bg-green-500";
  return (
    <div>
      {isVisible && (
        <div
          className={`flex justify-center items-center text-white z-50 fixed top-0 right-0 mt-20 mr-24 w-80 p-3 rounded ${notificationClass}`}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default NotificationComponent;
