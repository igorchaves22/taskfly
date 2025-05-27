import type { CSSProperties } from "react";
import { applyClassNameIfTrue } from "~utils";
import "./styles.scss";

const MILLISECONDS = 1000;

interface ILoader {
    flexSize?: boolean;
    exitDelay?: number;
}

export const Loader = ({ flexSize, exitDelay }: ILoader) => {
    const hasExit = typeof exitDelay === "number";

    return (
        <div className={"loader" + applyClassNameIfTrue(flexSize, "loader--flex-size")}>
            <div
                style={hasExit ? ({ "--exitDelay": `${exitDelay / MILLISECONDS}s` } as CSSProperties) : undefined}
                className={"loader__box" + applyClassNameIfTrue(exitDelay, "loader__box--exit-delay")}
            />
        </div>
    );
};
