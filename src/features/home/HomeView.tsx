import { DashboardLayout } from "@layout/DashboardLayout";
import { statsCardConfig } from "./components/statsCardConfig";
import StatsCardWrapper from "./components/StatsCardWrapper";


const HomeView = () => {
    return (
        <DashboardLayout>
            <div className="card">
                <div className='text-3xl mt-2 mb-2'>
                    Inicio
                </div>
                <div className="grid">
                    {statsCardConfig.map(({ entityName, apiCall, title, subTitle }) => (
                        <StatsCardWrapper
                            key={entityName}
                            entityName={entityName}
                            apiCall={apiCall}
                            title={title}
                            subTitle={subTitle}
                        />
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default HomeView;
