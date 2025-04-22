const entityAdapters = {

};

export type ModuleKey = keyof typeof entityAdapters;
export const getEntityAdapter = (moduleKey: string) => {
    const defaultAdapter = {
        toFormik: (data: any) => data,
        toApi: (data: any) => data,
        toTable: (input: any) => {
            const normalized = Array.isArray(input)
                ? input
                : Array.isArray(input?.data)
                    ? input.data
                    : input
                        ? [input]
                        : [];

            return {
                data: normalized,
                metadata: {
                    count: normalized.length,
                    pageNumber: 1,
                    pageSize: normalized.length,
                    totalPages: 1,
                },
            };
        },
    };

    return {
        ...defaultAdapter,
        ...(entityAdapters[moduleKey as ModuleKey] as Record<string, any> ?? {}),
    };
};