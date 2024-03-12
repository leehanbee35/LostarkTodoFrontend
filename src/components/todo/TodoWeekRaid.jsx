import React, {useState} from 'react';
import WeekEponaWrap from "./weekContent/WeekEponaWrap";
import SilmaelChangeWrap from "./weekContent/SilmaelChangeWrap";
import CubeWrap from "./weekContent/CubeWrap";
import DoneIcon from '@mui/icons-material/Done';
import TodoWeekContentContainer from "../../containers/todo/TodoWeekContentContainer";
import CloseIcon from "@mui/icons-material/Close";
import AddBoxIcon from '@mui/icons-material/AddBox';
import RaidSortWrap from "./weekRaidSort/RaidSortWrap";
import SaveIcon from "@mui/icons-material/Save";
import * as todo from "../../apis/todo";
import * as friend from "../../apis/friend";

const TodoWeekRaid = ({
                          setIsLoading,
                          showMessage,
                          character,
                          characters,
                          setCharacters,
                          openAddTodoForm,
                          updateWeekCheck,
                          updateWeekCheckAll,
                          updateWeekMessage,
                          changeShow,
                          setModalTitle,
                          setModalContent,
                          setOpenModal
                      }) => {
    const [showSortRaid, setShowSortRaid] = useState(false);
    const saveRaidSort = async () => {
        try {
            setIsLoading(true);
            const response = await todo.saveRaidSort(character);

            setCharacters((prevCharacters) => {
                const updatedCharacters = prevCharacters.map((char) =>
                    char.id === character.id ? { ...char, char: response.data } : char
                );
                return updatedCharacters;
            });
            showMessage("레이드 순서 업데이트가 완료되었습니다.");
            setShowSortRaid(false);
        } catch (error) {
            console.error('Error saveSort:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="character-wrap">
            <div className="content" style={{padding: 0, display: character.settings.showWeekTodo ? "block" : "none"}}>
                <p className="title">주간 레이드</p>{/* pub 추가 */}
                {showSortRaid ? <p className="txt">저장 버튼 클릭시 순서가 저장됩니다.</p> :
                    <p className="txt">마우스 우클릭 시 한번에 체크됩니다</p>}
                {showSortRaid ?
                    <button
                        className={"content-button sort"}
                        onClick={() => saveRaidSort()}
                        style={{right: "55px"}}
                    >
                        저장
                    </button> :
                    <button
                        className={"content-button sort"}
                        onClick={() => setShowSortRaid(true)}
                        style={{right: "55px"}}
                    >
                        정렬
                    </button>
                }
                <button
                    className={"content-button"}
                    onClick={() => openAddTodoForm(character.id, character.characterName, character.goldCharacter, character.settings.goldCheckVersion)}
                >
                    편집{/* pub 추가 */}
                </button>

            </div>
            <div className="character-todo">
                {showSortRaid ?
                    <RaidSortWrap character={character} setCharacters={setCharacters} characters={characters}/> :
                    character.todoList.map((todo) => (
                        <div className="content-wrap" key={todo.id}>
                            <div
                                className="content"
                                style={{
                                    height: 75,
                                    position: "relative",
                                    justifyContent: "space-between",
                                    fontSize: 14, //pub 수정
                                }}
                            >
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    cursor: "pointer"
                                }}>
                                    {/* 여기서 부터 */}
                                    <button
                                        className={`content-button ${todo.check ? "done" : ""}`}
                                        style={{cursor: "pointer"}}
                                        onClick={() => updateWeekCheck(character.characterName, todo)}
                                        onContextMenu={(e) => updateWeekCheckAll(e, character.characterName, todo)}
                                    >
                                        {todo.check ? <DoneIcon/> : <CloseIcon/>}
                                    </button>
                                    {/* 여기까지 클릭 버튼 */}
                                    {/* 여기서 부터 */}
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        width: "100%"
                                    }}>
                                        <div
                                            className={`${todo.check ? "text-done" : ""}`}
                                            onClick={() => updateWeekCheck(character.characterName, todo)}
                                            onContextMenu={(e) => updateWeekCheckAll(e, character.characterName, todo)}
                                            dangerouslySetInnerHTML={{__html: todo.name.replace(/\n/g, "<br />")}} // pub 이부분 원래로 원복
                                        >
                                        </div>
                                        <div
                                            className={`${todo.check ? "text-done" : ""}`}
                                            onClick={() => updateWeekCheck(character.characterName, todo)}
                                            onContextMenu={(e) => updateWeekCheckAll(e, character.characterName, todo)}
                                        >
                                        <span
                                            className="gold">{character.goldCharacter ? todo.gold + " G" : ""}</span> {/* pub span gold 추가 */}
                                        </div>
                                        <div className={"input-field"} id={"input_field_" + todo.id}>
                                            {todo.message !== null && (
                                                <input
                                                    type="text"
                                                    spellCheck="false"
                                                    defaultValue={todo.message}
                                                    style={{width: "90%"}}
                                                    onBlur={(e) => updateWeekMessage(character.id, todo.id, e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            updateWeekMessage(character.id, todo.id, e.target.value);
                                                            e.target.blur();
                                                        }
                                                    }}
                                                    placeholder="메모 추가"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    {/* 여기까지 출력 글씨 */}
                                    {/* 여기서 부터 */}
                                    <div>
                                        {todo.message === null ?
                                            <AddBoxIcon id={"input_field_icon_" + todo.id}
                                                        onClick={() => changeShow(character.id, todo.id)}/> : ""}
                                    </div>
                                    {/* 여기까지 "+" 버튼 */}
                                </div>
                            </div>
                            <div className="content gauge-box"
                                 style={{height: 16, padding: 0, position: "relative"}}> {/* pub guage-box 클래스추가 */}
                                {Array.from({length: todo.totalGate}, (_, index) => (
                                    <div key={`${todo.id}-${index}`} className="gauge-wrap"
                                         style={{
                                             backgroundColor: todo.currentGate > index ? "#ffbfb6" : "", // pub
                                             width: 100 / todo.totalGate + "%",
                                             alignItems: "center",
                                             justifyContent: "center",
                                             color: "var(--text-color)"
                                         }}>
                                        <span>{index + 1}관문</span>
                                    </div>
                                ))}
                                <span className="gauge-text"></span>
                            </div>
                        </div>
                    ))}
            </div>
            {/* pub 2023-10-23 스타일 적용 완료 */}
            {(character.settings.showWeekEpona || character.settings.showSilmaelChange || character.settings.showCubeTicket) &&
                <div className="content title02" style={{padding: 0}}>
                    <p className="title">주간 숙제</p>
                </div>
            }
            {/*주간 숙제(에포나, 큐브, 실마엘)*/}
            <TodoWeekContentContainer
                showMessage={showMessage}
                setIsLoading={setIsLoading}
                character={character}
                characters={characters}
                setCharacters={setCharacters}
                setModalTitle={setModalTitle}
                setModalContent={setModalContent}
                setOpenModal={setOpenModal}
            />
        </div>
    );
};

export default TodoWeekRaid;