import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // For user session management
import ButtonGroup from "./buttonGroup";
import Totaux from "./totaux";
import { CustomerGrowthChart } from "./customerGrowth";
import { YearlyVisitorsChart } from "./yearlyVisitors";
import BestSelling from "./bestSelling";
import ButtonDl from "./buttonDownload";

export const Dashboard = ({setformSubmitFromChildren}:any) => {
    const { data: session } = useSession(); // Get the logged-in user's session
    const [dashboardData, setDashboardData] = useState(null);


    useEffect(() => {
        const fetchDashboard = async () => {
            if (!session?.user?.id) {
                console.log("Session or user ID not available");
                return;
            }

            try {
                // Fetch user data
                const resUser = await fetch('/api/users');
                const dataUser = await resUser.json();

                // Find the user with the session user ID
                const UserDashboard = dataUser.find((item: any) => item._id === session.user.id);

                if (UserDashboard) {
                    // Fetch dashboard data using the dashboard ID
                    const res = await fetch(`/api/dashboards/${UserDashboard.dashboard}`);
                    const data = await res.json();

                    console.log("Dashboard fetched successfully:", data); // Debugging output
                    setDashboardData(data);
                } else {
                    console.log("No dashboard associated with the user");
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchDashboard();
    }, [session]);

    if (!dashboardData) return <p>Loading dashboard...</p>;

    return (
        <main className="p-4 max-w-screen-xl mx-auto">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h1 className="text-2xl font-bold">Overview</h1>
                <div className="flex gap-4 mt-4 sm:mt-0">
                    <ButtonGroup />
                    <ButtonDl />
                </div>
            </header>

            <section className="grid grid-cols-1 gap-6 mb-6">
                <div className="bg-gray-100 dark:bg-neutral-800 p-6 md:items-center rounded-lg shadow">
                    <Totaux data={dashboardData} />
                </div>
            </section>

            <section className="grid grid-cols-1 gap-6">
                <div className="bg-gray-100 dark:bg-neutral-800 p-6 rounded-lg shadow">
                    <CustomerGrowthChart data={dashboardData} />
                </div>
                <div className="bg-gray-100 dark:bg-neutral-800 p-6 rounded-lg shadow">
                    <YearlyVisitorsChart dashboardData={dashboardData} />
                </div>
                <div className="lg:col-span-3 bg-gray-100 dark:bg-neutral-800 p-6 rounded-lg shadow">
                    <BestSelling data={dashboardData} setformSubmitFromChildren={setformSubmitFromChildren} />
                </div>
            </section>
        </main>
    );
};