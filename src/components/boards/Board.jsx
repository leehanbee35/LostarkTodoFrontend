import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as boards from "../../apis/boards";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

// 게시글 조회
const Board = () => {
  // URL 경로에 있는 param
  const { no } = useParams();

  // State 설정
  const [board, setBoard] = useState({}); // Initialize as an object

  // 게시글 데이터
  const getBoard = async () => {
    try {
      const data = await boards.select(no);
      setBoard(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBoard();
  }, [no]); // Remove board from dependencies to avoid infinite loop

  return (
    <div className="board-container">
      <div className="board-info">
        <p className="notice-title">공지 | {board.title}</p>
        <p className="reg-date">
          {board.regDate && new Date(board.regDate).toLocaleString()}
        </p>
      </div>
      <div className="board-content">
        {board.content && <Viewer initialValue={board.content} />}
      </div>
    </div>
  );
};

export default Board;
