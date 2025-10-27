// Global variables
let nationalData = null;
let districtData = null;
let regionalData = null;
let candidatesMap = {};
let map = null;
let pieChart = null;
let barChart = null;

// API endpoints
const API_BASE = './api/';
const API_ENDPOINTS = {
    national: API_BASE + 'national_results.json',
    districts: API_BASE + 'district_results.json',
    regions: API_BASE + 'regional_results.json'
};

// Initialize dashboard
async function initDashboard() {
    try {
        // Load all data
        await loadAllData();
        
        // Render all components
        renderWinnerBanner();
        renderStatistics();
        renderCandidateList();
        renderCharts();
        renderDistrictTable();
        renderRegionTable();
        updateLastUpdated();
        
        // Initialize map (only when tab is active)
        setTimeout(() => {
            if (document.getElementById('tab-map').classList.contains('active')) {
                initMap();
            }
        }, 100);
        
    } catch (error) {
        console.error('Error initializing dashboard:', error);
        alert('Error loading election data. Please check console for details.');
    }
}

// Load all data from API
async function loadAllData() {
    try {
        const [nationalResponse, districtResponse, regionalResponse] = await Promise.all([
            fetch(API_ENDPOINTS.national),
            fetch(API_ENDPOINTS.districts),
            fetch(API_ENDPOINTS.regions)
        ]);
        
        nationalData = await nationalResponse.json();
        districtData = await districtResponse.json();
        regionalData = await regionalResponse.json();
        
        // Create candidates map for easy lookup
        nationalData.candidates.forEach(candidate => {
            candidatesMap[candidate.id] = candidate;
        });
        
        console.log('All data loaded successfully');
    } catch (error) {
        console.error('Error loading data:', error);
        throw error;
    }
}

// Render winner banner
function renderWinnerBanner() {
    const winner = nationalData.winner;
    const bannerHTML = `
        <div class="winner-banner">
            <div class="trophy">🏆</div>
            <div class="content">
                <h2>WINNER DECLARED</h2>
                <div class="name">${winner.name}</div>
                <div class="stats">${winner.party} • ${winner.votes.toLocaleString()} votes (${winner.percentage.toFixed(2)}%)</div>
            </div>
        </div>
    `;
    document.getElementById('winner-banner').innerHTML = bannerHTML;
}

// Render statistics cards
function renderStatistics() {
    const summary = nationalData.summary;
    
    document.getElementById('stat-registered').textContent = summary.total_registered_voters.toLocaleString();
    document.getElementById('stat-votes-cast').textContent = summary.total_votes_cast.toLocaleString();
    document.getElementById('stat-turnout').textContent = summary.voter_turnout_percentage.toFixed(1) + '%';
    document.getElementById('stat-valid').textContent = summary.total_valid_votes.toLocaleString();
    
    document.getElementById('reporting-info').textContent = 
        `${summary.reporting_districts} of ${summary.total_districts} districts (${summary.reporting_percentage}%)`;
}

// Render candidate list
function renderCandidateList() {
    const candidates = nationalData.candidates.sort((a, b) => b.votes - a.votes);
    
    const candidatesHTML = candidates.map((candidate, index) => {
        const isWinner = candidate.id === nationalData.winner.candidate_id;
        const progressWidth = candidate.percentage;
        
        return `
            <div class="candidate-card ${isWinner ? 'winner' : ''}" style="animation: slideIn 0.5s ease-out ${index * 0.1}s both;">
                <div class="rank">${index + 1}</div>
                <img src="${candidate.photo}" alt="${candidate.name}" class="candidate-photo">
                <div class="candidate-info">
                    <div class="name">
                        ${candidate.name}
                        ${isWinner ? '<span class="winner-badge">WINNER</span>' : ''}
                    </div>
                    <div class="party">${candidate.party}</div>
                </div>
                <div class="candidate-stats">
                    <div class="percentage">${candidate.percentage.toFixed(2)}%</div>
                    <div class="votes">${candidate.votes.toLocaleString()} votes</div>
                </div>
                <div class="progress-bar" style="width: ${progressWidth}%; background: ${candidate.color};"></div>
            </div>
        `;
    }).join('');
    
    document.getElementById('candidate-list').innerHTML = candidatesHTML;
}

// Render pie chart
function renderCharts() {
    // Pie Chart
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    const candidates = nationalData.candidates.filter(c => c.name !== 'Others');
    
    pieChart = new Chart(pieCtx, {
        type: 'doughnut',
        data: {
            labels: candidates.map(c => c.name),
            datasets: [{
                data: candidates.map(c => c.votes),
                backgroundColor: candidates.map(c => c.color),
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const percentage = ((value / nationalData.summary.total_valid_votes) * 100).toFixed(2);
                            return `${label}: ${value.toLocaleString()} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
    
    // Bar Chart
    const barCtx = document.getElementById('barChart').getContext('2d');
    
    barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: candidates.map(c => c.name.split(' ').slice(-1)[0]), // Last name only
            datasets: [{
                label: 'Votes',
                data: candidates.map(c => c.votes),
                backgroundColor: candidates.map(c => c.color),
                borderColor: candidates.map(c => c.color),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed.y;
                            const percentage = ((value / nationalData.summary.total_valid_votes) * 100).toFixed(2);
                            return `Votes: ${value.toLocaleString()} (${percentage}%)`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Initialize map
function initMap() {
    if (map) return; // Already initialized
    
    map = L.map('map').setView([1.3733, 32.2903], 7);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
    }).addTo(map);
    
    // Load GeoJSON and add election results
    fetch('uganda_districts.geojson')
        .then(response => response.json())
        .then(geojsonData => {
            // Add winner information to each district
            geojsonData.features.forEach(feature => {
                const districtName = feature.properties.ADM2_EN.toUpperCase();
                const districtResult = districtData.districts.find(d => 
                    d.district_name.toUpperCase() === districtName
                );
                
                if (districtResult) {
                    feature.properties.winner_id = districtResult.winner_id;
                    feature.properties.turnout = districtResult.turnout_percentage;
                    feature.properties.votes_cast = districtResult.votes_cast;
                }
            });
            
            // Add to map
            L.geoJSON(geojsonData, {
                style: styleDistrict,
                onEachFeature: onEachDistrict
            }).addTo(map);
            
            // Add legend
            addMapLegend();
        })
        .catch(error => {
            console.error('Error loading map data:', error);
            document.getElementById('map').innerHTML = 
                '<p style="padding: 20px; text-align: center;">Map data not available. Make sure uganda_districts.geojson is present.</p>';
        });
}

// Style districts based on winner
function styleDistrict(feature) {
    const winnerId = feature.properties.winner_id;
    const winner = candidatesMap[winnerId];
    
    return {
        fillColor: winner ? winner.color : '#cccccc',
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
    };
}

// Add interactions to each district
function onEachDistrict(feature, layer) {
    const districtName = feature.properties.ADM2_EN;
    const winnerId = feature.properties.winner_id;
    const winner = candidatesMap[winnerId];
    
    let popupContent = `<div style="padding: 10px;"><h4>${districtName}</h4>`;
    
    if (winner) {
        popupContent += `
            <p><strong>Winner:</strong> ${winner.name}</p>
            <p><strong>Turnout:</strong> ${feature.properties.turnout?.toFixed(1)}%</p>
            <p><strong>Votes Cast:</strong> ${feature.properties.votes_cast?.toLocaleString()}</p>
        `;
    } else {
        popupContent += '<p>No data available</p>';
    }
    
    popupContent += '</div>';
    
    layer.bindPopup(popupContent);
    
    layer.on({
        mouseover: function(e) {
            e.target.setStyle({
                weight: 3,
                color: '#666',
                fillOpacity: 0.9
            });
        },
        mouseout: function(e) {
            e.target.setStyle({
                weight: 1,
                color: 'white',
                fillOpacity: 0.7
            });
        }
    });
}

// Add legend to map
function addMapLegend() {
    const legend = L.control({ position: 'bottomright' });
    
    legend.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'legend');
        div.innerHTML = '<h4>Winner by District</h4>';
        
        // Add top candidates to legend
        const topCandidates = nationalData.candidates
            .filter(c => c.name !== 'Others')
            .sort((a, b) => b.votes - a.votes)
            .slice(0, 4);
        
        topCandidates.forEach(candidate => {
            div.innerHTML += `
                <div class="legend-item">
                    <div class="legend-color" style="background-color: ${candidate.color}"></div>
                    <span>${candidate.name.split(' ').slice(-1)[0]}</span>
                </div>
            `;
        });
        
        return div;
    };
    
    legend.addTo(map);
}

// Render district table
function renderDistrictTable() {
    const districts = districtData.districts;
    
    const tableHTML = districts.map(district => {
        const winner = candidatesMap[district.winner_id];
        const winnerResult = district.candidate_results.find(r => r.candidate_id === district.winner_id);
        
        return `
            <tr>
                <td><strong>${district.district_name}</strong></td>
                <td>${district.registered_voters.toLocaleString()}</td>
                <td>${district.votes_cast.toLocaleString()}</td>
                <td>${district.turnout_percentage.toFixed(1)}%</td>
                <td>${winner ? winner.name : 'N/A'}</td>
                <td><strong>${winnerResult ? winnerResult.percentage.toFixed(1) + '%' : 'N/A'}</strong></td>
            </tr>
        `;
    }).join('');
    
    document.getElementById('district-table-body').innerHTML = tableHTML;
}

// Render region table
function renderRegionTable() {
    const regions = regionalData.regions;
    
    const tableHTML = regions.map(region => {
        const winnerResult = region.candidate_results.sort((a, b) => b.votes - a.votes)[0];
        const winner = candidatesMap[winnerResult.candidate_id];
        
        return `
            <tr>
                <td><strong>${region.region_name}</strong></td>
                <td>${region.districts}</td>
                <td>${region.registered_voters.toLocaleString()}</td>
                <td>${region.turnout_percentage.toFixed(1)}%</td>
                <td>${winner ? winner.name : 'N/A'}</td>
                <td><strong>${winnerResult.percentage.toFixed(1)}%</strong></td>
            </tr>
        `;
    }).join('');
    
    document.getElementById('region-table-body').innerHTML = tableHTML;
}

// Update last updated time
function updateLastUpdated() {
    const now = new Date();
    document.getElementById('last-updated').textContent = 
        `Last Updated: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
}

// Tab switching
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active from all tab buttons
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById('tab-' + tabName).classList.add('active');
    event.target.classList.add('active');
    
    // Initialize map if map tab is selected
    if (tabName === 'map' && !map) {
        setTimeout(initMap, 100);
    }
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', initDashboard);

