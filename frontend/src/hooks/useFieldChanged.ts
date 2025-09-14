import {useCallback, useState} from "react";

export function useFieldChanged(initValue: any = null) {
    const [field, setField] = useState(initValue);

    const handleChange = useCallback((e: any) => {
        setField(e.target.value);
    }, [field]);

    return {
        field,
        setField,
        handleChange
    };
}