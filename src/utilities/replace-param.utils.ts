export const replaceParamId = (url: string, id: number) =>
    url.replace(/:id/g, String(id));
  