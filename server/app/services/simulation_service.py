import random
import time

class SimulationService:
    @staticmethod
    def get_system_metrics(config, uptime_seconds):
        """
        Generates simulated system metrics (CPU, Memory, Status) based on configuration.
        
        Uses a time-bucket approach to ensure metrics are stable for a short period (default 30s)
        rather than jumping randomly on every refresh. This creates a realistic "monitoring" feel.
        """
        bucket_seconds = max(int(config.get('SIM_BUCKET_SECONDS', 30)), 1)
        bucket = int(time.time() // bucket_seconds)
        rng = random.Random(bucket)

        cpu_min = int(config.get('SIM_CPU_MIN', 10))
        cpu_max = int(config.get('SIM_CPU_MAX', 70))
        mem_min = int(config.get('SIM_MEM_MIN', 20))
        mem_max = int(config.get('SIM_MEM_MAX', 80))

        cpu = rng.randint(cpu_min, cpu_max)
        memory = rng.randint(mem_min, mem_max)

        offline_rate = float(config.get('SIM_OFFLINE_RATE', 0.02))
        degraded_rate = float(config.get('SIM_DEGRADED_RATE', 0.12))
        roll = rng.random()

        if roll < offline_rate:
            status = "offline"
            cpu = 0
            memory = 0
        elif roll < offline_rate + degraded_rate:
            status = "degraded"
        else:
            status = "healthy"

        return {
            "status": status,
            "system": {
                "cpu": cpu,
                "memory": memory,
                "uptime_seconds": uptime_seconds
            }
        }
