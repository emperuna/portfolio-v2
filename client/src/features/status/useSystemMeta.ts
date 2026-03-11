import { useState, useEffect, useRef } from 'react';
import { getSystemMeta } from '@lib/api';
import type { SystemMeta } from '@lib/types';

export function useSystemMeta() {
    const [meta, setMeta] = useState<SystemMeta | null>(null);
    const [loading, setLoading] = useState(true);
    // Live-ticking client-side uptime derived from server baseline
    const [displayUptime, setDisplayUptime] = useState(0);
    const baseUptimeRef = useRef<{ serverSeconds: number; fetchedAt: number } | null>(null);

    useEffect(() => {
        const fetchMeta = () => {
            getSystemMeta()
                .then(data => {
                    setMeta(data);
                    // Record baseline so the client-side tick is relative to this moment
                    baseUptimeRef.current = {
                        serverSeconds: data.uptime_seconds,
                        fetchedAt: Date.now(),
                    };
                    setDisplayUptime(data.uptime_seconds);
                })
                .catch(console.error)
                .finally(() => setLoading(false));
        };

        fetchMeta();
        const refetchInterval = setInterval(fetchMeta, 30_000); // Sync every 30s

        // Tick uptime every second client-side (no API call needed)
        const tickInterval = setInterval(() => {
            if (baseUptimeRef.current) {
                const elapsed = Math.floor((Date.now() - baseUptimeRef.current.fetchedAt) / 1000);
                setDisplayUptime(baseUptimeRef.current.serverSeconds + elapsed);
            }
        }, 1000);

        return () => {
            clearInterval(refetchInterval);
            clearInterval(tickInterval);
        };
    }, []);

    return { meta, loading, displayUptime };
}
