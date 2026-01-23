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
    assert data['status'] == 'operational'
    assert 'system' in data
    assert 'cpu' in data['system']
    assert 'memory' in data['system']
    assert 'uptime_seconds' in data['system']
    
    # Verify ranges based on SimulationService logic
    assert 5 <= data['system']['cpu'] <= 45
    assert 30 <= data['system']['memory'] <= 60

def test_get_meta(client):
    """Test that /api/meta returns version info."""
    response = client.get('/api/meta')
    assert response.status_code == 200
    data = response.json
    assert 'version' in data
    assert 'environment' in data
