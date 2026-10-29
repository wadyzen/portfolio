import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";


function NavBar() {
  const { t } = useTranslation();

  return (
    <nav id="navbar">
     <button>{t("navbar.home")}</button>
    </nav>
  );
}

export default NavBar;
