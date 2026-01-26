import { useStore } from '@nanostores/react';
import { useEffect } from 'react';
import { $systemConfig, loadSystemConfig, setDebugMode, setTrafficLevel, setSimMode } from '../state/configStore';

export function useSystemConfig() {
    const config = useStore($systemConfig);

    useEffect(() => {
        // Load initial config from backend on mount
        loadSystemConfig();
    }, []);

    return {
        config,
        setDebugMode,
        setTrafficLevel,
        setSimMode
    };
}
