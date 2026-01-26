import { useState, useEffect } from 'react';
import { ApiMetaRepository } from '../../infrastructure/api/ApiMetaRepository';
import type { SystemMeta } from '@domain/entities/SystemMeta';

const repository = new ApiMetaRepository();

export function useSystemMeta() {
    const [meta, setMeta] = useState<SystemMeta | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        repository.getMeta()
            .then(setMeta)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return { meta, loading };
}
