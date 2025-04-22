import * as Icons from 'react-icons/io5';

export type IconName = keyof typeof Icons;


export const iconOptions: IconName[] = Object.keys(Icons).filter(
    (key): key is IconName => key.startsWith("Io")
);