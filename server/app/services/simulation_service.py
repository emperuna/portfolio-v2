import random

class SimulationService:
    @staticmethod
    def get_system_metrics():
        """
        Generates simulated system metrics.
        Returns:
            dict: containing cpu, memory, uptime_seconds, and status
        """
        return {
            "status": "operational",
            "system": {
                "cpu": random.randint(5, 45),
                "memory": random.randint(30, 60),
                "uptime_seconds": 3600 + random.randint(0, 500)
            }
        }
