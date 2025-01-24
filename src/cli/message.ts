export type ResultMessage = typeof DataBaseMessage.SELECT_RESULT_MESSAGE
                            | typeof DataBaseMessage.UPDATE_RESULT_MESSAGE
                            | typeof DataBaseMessage.DELETE_RESULT_MESSAGE
                            | typeof DataBaseMessage.INSERT_RESULT_MESSAGE;

export class DataBaseMessage {
    static SELECT_RESULT_MESSAGE = (result: any) => result;
    static INSERT_RESULT_MESSAGE = (result: number) => `${result}명의 학생이 등록되었습니다.`;
    static UPDATE_RESULT_MESSAGE = (result: number) => `${result}건이 변경되었습니다.`;
    static DELETE_RESULT_MESSAGE = (result: number) => `${result}건이 삭제되었습니다.`;
}