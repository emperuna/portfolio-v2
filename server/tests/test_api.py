import pytest
from app import create_app

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_health_check(client):
    """Test that /health returns 200 and healthy status."""
    response = client.get('/health')
    assert response.status_code == 200
    assert response.json == {"status": "healthy"}

def test_get_status_structure(client):
    """Test that /api/status returns the expected JSON structure."""
    response = client.get('/api/status')
    assert response.status_code == 200
    data = response.json
    assert data['status'] in {'healthy', 'degraded', 'offline'}
    assert 'system' in data
    assert 'cpu' in data['system']
    assert 'memory' in data['system']
    assert 'uptime_seconds' in data['system']
    
    if data['status'] == 'offline':
        assert data['system']['cpu'] == 0
        assert data['system']['memory'] == 0
    else:
        # Verify ranges based on SimulationService logic
        app_config = client.application.config
        assert app_config['SIM_CPU_MIN'] <= data['system']['cpu'] <= app_config['SIM_CPU_MAX']
        assert app_config['SIM_MEM_MIN'] <= data['system']['memory'] <= app_config['SIM_MEM_MAX']

def test_get_meta(client):
    """Test that /api/meta returns version info."""
    response = client.get('/api/meta')
    assert response.status_code == 200
    data = response.json
    assert 'version' in data
    assert 'environment' in data

def test_get_config(client):
    """Test that /api/config returns 200 and expected keys (Ticket 8)."""
    response = client.get('/api/config')
    assert response.status_code == 200
    data = response.json
    assert 'config' in data
    assert 'debug_mode' in data['config']
    assert 'traffic_level' in data['config']
    assert 'sim_mode' in data['config']
