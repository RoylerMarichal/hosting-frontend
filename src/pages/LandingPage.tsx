import { Link } from "react-router-dom";
import Hero from "../components/landing/Hero";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
const LandingPage = () => {
  const { t } = useTranslation("home");
  const { token } = useSelector((state: any) => state.auth);
  return (
    <>
      {token ? (
        <div className="mx-auto   flex items-center  g-main p-4  h-36 justify-around">
          <h1 className="text-lg    text-white font-medium">{t("thinking")}</h1>
          <Link to={"/post"}>
            {" "}
            <button className="btn-main"> {t("post")}</button>
          </Link>
        </div>
      ) : (
        <Hero />
      )}

     
    </>
  );
};

export default LandingPage;
