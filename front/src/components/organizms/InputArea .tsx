import { ChangeEvent, memo, VFC } from "react";

type Props = {
    inputText: string;
    onChangeInputText: (e: ChangeEvent<HTMLInputElement>) => void;
    onClickAdd: () => void;
}

export const InputArea: VFC<Props> = memo((props) => {
    const { inputText, onChangeInputText, onClickAdd } = props;
    return (
        <div>
            <input type="text" value={inputText} onChange={onChangeInputText} />
            <button onClick={onClickAdd}>作成</button>
        </div>
    );
})