import { Dashboard } from "./components/dashboard";
import React from 'react';
import Three from "./components/yearlyVisitors";
import Overview from "./components/totaux";

export default function Home() {
  return (
    // <div>
    //   <div className="p-4">
    //     <Overview />
    //     <Three />
    //   </div>
    // </div>
    <Dashboard/>
  );
}
