import { useTodoListWrapper } from "~hooks";
import { applyClassNameIfTrue, renderElementIfTrue } from "~utils";
import { Loader } from "../Loader";
import "./styles.scss";

export const TodoListWrapper = () => {
    const { isInitialized, exitDelayValue } = useTodoListWrapper();

    return (
        <main
            className={"todo-list-wrapper" + applyClassNameIfTrue(isInitialized, "todo-list-wrapper--is-initialized")}
        >
            {renderElementIfTrue(
                isInitialized,
                <>
                    <section className="todo-list-wrapper__box todo-list-wrapper__box--query">
                        <p>query</p>
                        <section className="todo-list-wrapper__box todo-list-wrapper__box--queries">
                            <p>query</p>
                        </section>
                    </section>
                    <section className="todo-list-wrapper__box todo-list-wrapper__box--data">
                        <p>data</p>
                    </section>
                </>,
                <Loader exitDelay={exitDelayValue} />
            )}
        </main>
    );
};
