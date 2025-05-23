import logoSvg from "~assets/svg/logo-lockup.svg";
import "./styles.scss";

export const HomePage = () => {
    return (
        <header className="home-page">
            <img
                src={logoSvg}
                alt="Logo"
                loading="lazy"
                className="home-page__logo"
            />
            <section className="home-page__box">
                <h1 className="home-page__text home-page__text--title">Stay on top of your tasks</h1>
                <p className="home-page__text">Manage, track, and complete your tasks with clarity and ease.</p>
            </section>
        </header>
    );
};
