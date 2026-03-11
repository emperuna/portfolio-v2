import { useStore } from '@nanostores/react';
import { useEffect } from 'react';
import { $systemConfig, loadSystemConfig, setDebugMode, setTrafficLevel, setSimMode } from './configStore';

export function useSystemConfig() {
    const config = useStore($systemConfig);

    useEffect(() => {
        loadSystemConfig();
    }, []);

    return {
        config,
        setDebugMode,
        setTrafficLevel,
        setSimMode
    };
}
