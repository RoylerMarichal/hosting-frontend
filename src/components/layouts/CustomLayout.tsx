import { Outlet } from "react-router";
import Footer from "../global/Footer";
import Header from "../global/Header";

import { useSelector } from "react-redux";

const CustomLayout = () => {
  function checkNotificationPromise() {
    try {
      Notification.requestPermission().then();
    } catch (e) {
      return false;
    }

    return true;
  }

  checkNotificationPromise();

  const { user } = useSelector((state: any) => state.auth);

  return (
    <div>
        {/* <Header/> */}
      {/*  <div className="mt-16 max-w-3xl mx-auto mb-14 "> */}
      <div className=" w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default CustomLayout;
