import type { HtmlDivPropsType } from "~types";
import "./styles.scss";

type AdditionalPropsType = Pick<HtmlDivPropsType, "children">;

interface IPageContainer extends AdditionalPropsType {}

export const PageContainer = ({ children }: IPageContainer) => {
    return <section className="page-container">{children}</section>;
};
