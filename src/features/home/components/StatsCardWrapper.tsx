import StatsCard from "@components/common/widgets/StatsCard";
import useQueryApi from "@hooks/useQueryApi";
import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

interface ResponseApi<T> {
    data: T;
    metadata: MetadataEntity;
}

interface StatsCardWrapperProps {
    entityName: string;
    apiCall: () => Promise<any>;
    title: string;
    subTitle: string;
}

const StatsCardWrapper: React.FC<StatsCardWrapperProps> = ({ entityName, apiCall, title, subTitle }) => {
    const { data, isLoading } = useQueryApi<ResponseApi<Response>>(entityName, apiCall);
    return (
        <StatsCard
            title={title}
            subTitle={subTitle}
            quantity={data?.metadata?.count ?? 0}
            shadow={2}
            isLoading={isLoading}
            textColorTitle="primary"
            colorIcon="primary"
            backgroundIconColor="primary"
        />
    );
};

export default StatsCardWrapper;
