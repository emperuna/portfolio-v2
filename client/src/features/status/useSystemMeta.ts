import { useState, useEffect } from 'react';
import { getSystemMeta } from '@lib/api';
import type { SystemMeta } from '@lib/types';

export function useSystemMeta() {
    const [meta, setMeta] = useState<SystemMeta | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSystemMeta()
            .then(setMeta)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return { meta, loading };
}
