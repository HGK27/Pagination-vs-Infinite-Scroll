import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Pagination
        </NavLink>
        <NavLink
          to="/infinite"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Infinite Scroll
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
