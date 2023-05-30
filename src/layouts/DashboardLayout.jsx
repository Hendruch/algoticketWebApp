import React, {useState} from "react";
//import {useMenu} from '../hooks/dashboards/useMenu';
import Sidebar from "../components/Dashboard/global/Sidebar";
import Topbar from "../components/Dashboard/global/Topbar";
import PageRoutes from '../router/PageRoutes';


function DashboardLayout() {

    //const [dash, setDash] = useMenu();

    /* const subredditElementList = dash && dash.map((opcion) => {
        switch (opcion) {
          case 0:
            return <EventosDashboardPage />;
          case 1:
            return <EventosDashboardPage />;
          default:
            return null;
        }
    });
       */

    return(
        <>
        <div className="home_section grid xl:grid-cols-5 lg:grid-cols-3 min-h-screen ">
            <Sidebar />
            <main className="lg:col-span-3 xl:col-span-4 p-9">
                <Topbar/>
            </main>
        </div>
        </>
    );
}

export default DashboardLayout;