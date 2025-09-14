import {useCallback, useState} from "react";
import * as React from "react";

export function useFileFieldChanged() {
    const [field, setField] = useState<File>();

    const handleChange = useCallback((e: React.FormEvent) => {
        const files = (e.target as HTMLInputElement).files;
        if (files) {
            setField(files[0]);
        }
    }, [field]);

    return {
        field,
        setField,
        handleChange
    };
}