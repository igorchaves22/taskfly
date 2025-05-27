import { HomePage, Loader, PageContainer } from "~components";
import { useApp } from "~hooks";
import { renderElementIfTrue } from "~utils";
import "~styles/global.scss";

export function App() {
    const { isInitialized, exitDelayValue } = useApp();

    return (
        <PageContainer>
            {renderElementIfTrue(
                isInitialized,
                <HomePage />,
                <Loader
                    flexSize
                    exitDelay={exitDelayValue}
                />
            )}
        </PageContainer>
    );
}
