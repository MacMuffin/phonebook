import React, { createContext, PropsWithChildren, useContext } from 'react';

export const createRequiredContext = <Props, Type>(name: string, useContextValue: (props: Props) => Type) => {
    // Create a context with a generic parameter or undefined
    const RequiredContext = createContext<Type | undefined>(undefined);

    RequiredContext.displayName = name;

    const RequiredContextProvider = (props: PropsWithChildren<Props>) => {
        const { children, ...restProps } = props;
        const value = useContextValue(restProps as Props); // typecast because TS didn't get it

        return <RequiredContext.Provider value={value}>{children}</RequiredContext.Provider>;
    };

    // Check if the value provided to the context is defined or throw an error
    const useRequiredContext = () => {
        const contextIsDefined = useContext(RequiredContext);
        if (!contextIsDefined) {
            throw new Error(`${name} must be used within a Provider`);
        }
        return contextIsDefined;
    };

    return [RequiredContextProvider, useRequiredContext, RequiredContext] as const;
};
