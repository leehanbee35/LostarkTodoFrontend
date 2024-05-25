import React from "react";

const Notify = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        background: "linear-gradient(90deg, #ff8a00, #e52e71)",
        color: "white",
        fontSize: "16px",
        fontWeight: "bold",
        maxWidth: "1200px",
        borderRadius: "5px",
        marginBottom: "5px",
        padding: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
      }}
    >
      <a
        href="https://dev.loatodo.com"
        target="_blank"
        style={{
          color: "white",
          textDecoration: "none",
          transition: "color 0.3s",
          fontWeight: "bold",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#ffda79";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "white";
        }}
      >
        개발중인 V2버전 보러가기 (6월 1일 업데이트 예정)
      </a>
    </div>
  );
};

export default Notify;
