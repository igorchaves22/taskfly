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
        <div
            style={hasExit ? ({ "--exitDelay": `${exitDelay / MILLISECONDS}s` } as CSSProperties) : undefined}
            className={
                "loader" +
                applyClassNameIfTrue(flexSize, "loader--flex-size") +
                applyClassNameIfTrue(exitDelay, "loader--exit-delay")
            }
        />
    );
};
