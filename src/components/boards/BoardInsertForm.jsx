import React, {useState} from 'react';
import EditorBox from "./components/EditorBox";
import {Link, useNavigate} from "react-router-dom";
import * as boards from "../../apis/boards";

const BoardInsertForm = () => {
    // state 설정
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [fileNames, setFileNames] = useState([]);

    const addFileNames = (fileName) => {
        setFileNames([...fileNames, fileName]);
    }

    // useNavigate 사용
    const navigate = useNavigate();
    const onInsert = async (title, content) => {
        try {
            const response = await boards.insert(title, content, fileNames);
            alert("등록 완료");

            // -> 게시글 목록 이동 (히스토리 저장X)
            navigate('/boards');
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="wrap">
            <div className="boards-insert-wrap">
                <h1>공지사항 등록</h1>
                <div className="boards-insert-title">
                    <p>제목</p>
                    <input type='text' value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="boards-insert-content">
                    <p>내용</p>
                    <EditorBox setContent={setContent} addFileNames={addFileNames}/>
                </div>
                <div>
                    <button onClick={() => onInsert(title, content)}>등록</button>
                    <Link to="/boards">목록</Link>
                </div>
            </div>
        </div>
    );
};

export default BoardInsertForm;