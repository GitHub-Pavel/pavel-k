export const deleteProperty = <T>
    (item: T, propsName: keyof T | Array<keyof T>) => {
        const itemback = {...item};

        if (Array.isArray(propsName)) {
            propsName.map(propName => delete itemback[propName]);
            return itemback;
        }

        delete itemback[propsName];
        return itemback;
    }