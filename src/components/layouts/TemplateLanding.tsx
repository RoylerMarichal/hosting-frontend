import React from "react";
import { Outlet } from "react-router";
import Footer from "../global/Footer";
import Header from "../global/Header";
import PeoplesPage from "../../pages/directory/PeoplesPage";
import PeoplesOnline from "../landing/PeoplesOnline";
import SidebarsLayout from "./SidebarsLayout";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSubscription } from "@apollo/client";
import { TIMELINE_SUBSCRIPTION } from "../../utils/queries";

const TemplateLanding = () => {
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
      <Header />
      {/*  <div className="mt-16 max-w-3xl mx-auto mb-14 "> */}
      <div className="mt-14 grid grid-cols-1 lg:grid-cols-7 ">
        <div className="lg:col-span-2">
          <SidebarsLayout side="left" />
        </div>
        <div className="lg:col-span-3 -mt-3 ">
          <Outlet />
        </div>
        <div className="lg:col-span-2">
          <SidebarsLayout side="right" />
        </div>
      </div>
       <Footer /> 
    </div>
  );
};

export default TemplateLanding;
