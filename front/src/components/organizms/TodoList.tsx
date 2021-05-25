import { memo, ReactNode, VFC } from "react";

export const TodoList: VFC<{ children: ReactNode }> = memo((props) => {
    const { children } = props;
    return <ul>{children}</ul>
})