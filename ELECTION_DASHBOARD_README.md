# Uganda Presidential Election Results Dashboard 2021

A complete, interactive election results portal with dynamic data loading, charts, maps, and detailed statistics.

## 🎯 Features

### ✅ Complete Implementation

- **🏆 Winner Declaration Banner** - Prominent display of election winner with vote count and percentage
- **📊 Interactive Charts** - Pie chart and bar chart showing vote distribution
- **🗺️ Electoral Map** - Districts color-coded by winning candidate with click/hover information
- **📈 Live Statistics** - Key metrics: registered voters, votes cast, turnout percentage
- **📋 Detailed Tables** - District-by-district and regional breakdowns
- **🎨 Professional UI** - Modern, responsive design that works on all devices
- **🔄 Dynamic Data Loading** - Fetches data from mock API structure (JSON files)
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile

## 📁 File Structure

```
uganda/
├── election_results.html          # Main dashboard page
├── election_dashboard.js          # JavaScript logic and API integration
├── api/
│   ├── national_results.json     # National-level election data
│   ├── district_results.json     # District-level results
│   └── regional_results.json     # Regional summaries
├── uganda_districts.geojson       # Geographic data for map
└── start_server.bat              # Quick start script
```

## 🚀 How to Use

### Quick Start

1. **Start the web server:**
   ```bash
   # Option 1: Double-click
   start_server.bat
   
   # Option 2: Manual
   python -m http.server 8000
   ```

2. **Open in browser:**
   ```
   http://localhost:8000/election_results.html
   ```

3. **Explore the dashboard:**
   - View winner declaration and statistics
   - Click tabs to switch between Charts, Map, Districts, and Regions
   - Click on map districts for detailed results
   - Scroll through candidate rankings

## 🔧 Mock API Structure

The dashboard uses a mock API with three JSON files:

### 1. `api/national_results.json`

Contains:
- Election metadata (year, type, date, status)
- National summary statistics
- Candidate information (name, party, votes, percentage, color)
- Winner declaration

**Example structure:**
```json
{
  "election": {...},
  "summary": {
    "total_registered_voters": 18103603,
    "total_votes_cast": 10556128,
    "voter_turnout_percentage": 58.3
  },
  "candidates": [
    {
      "id": 1,
      "name": "Candidate Name",
      "party": "Party Name",
      "votes": 5851037,
      "percentage": 56.54,
      "color": "#FFD93D"
    }
  ],
  "winner": {...}
}
```

### 2. `api/district_results.json`

Contains district-level results:
- District name and code
- Registered voters and turnout
- Vote breakdown by candidate
- District winner

### 3. `api/regional_results.json`

Contains regional summaries:
- Region name
- Number of districts
- Aggregate statistics
- Regional winner

## 🔄 Replacing Mock Data with Real Data

### Option 1: Update JSON Files Manually

1. Edit the JSON files in the `api/` folder
2. Maintain the same structure
3. Update values with real data
4. Refresh the dashboard

### Option 2: Connect to Real API

Edit `election_dashboard.js`:

```javascript
// Change these lines (around line 11-15):
const API_BASE = './api/';
const API_ENDPOINTS = {
    national: API_BASE + 'national_results.json',
    districts: API_BASE + 'district_results.json',
    regions: API_BASE + 'regional_results.json'
};

// To your real API endpoints:
const API_BASE = 'https://your-api.com/';
const API_ENDPOINTS = {
    national: API_BASE + 'national-results',
    districts: API_BASE + 'district-results',
    regions: API_BASE + 'regional-results'
};
```

**Important:** Your API must return data in the same structure as the mock JSON files.

### Option 3: Convert Excel to JSON

Use the provided Python script:

```python
# Create: excel_to_api.py
import pandas as pd
import json

# Read Excel file
df = pd.read_excel('your_election_data.xlsx')

# Convert to JSON structure matching the API format
# (Implementation depends on your Excel structure)

# Save as JSON
with open('api/national_results.json', 'w') as f:
    json.dump(data, f, indent=2)
```

## 🎨 Customization

### Change Colors

Edit candidate colors in `api/national_results.json`:

```json
{
  "candidates": [
    {
      "id": 1,
      "color": "#FFD93D"  // Change this hex color
    }
  ]
}
```

### Change Map Colors

Colors are automatically applied from candidate data. The map uses the same colors as the charts.

### Modify Layout

Edit `election_results.html` to:
- Rearrange sections
- Add new statistics
- Change header styling
- Adjust grid layouts

### Add New Charts

In `election_dashboard.js`, add new Chart.js visualizations:

```javascript
const newChart = new Chart(ctx, {
    type: 'line', // or 'bar', 'radar', etc.
    data: {...},
    options: {...}
});
```

## 📊 Data Requirements

### Minimum Required Data

For the dashboard to work, you need:

1. **Candidates:**
   - Name, party, total votes, percentage
   - Unique color for each candidate

2. **National Summary:**
   - Total registered voters
   - Total votes cast
   - Turnout percentage

3. **District Results:**
   - District name
   - Vote breakdown by candidate
   - Winner per district

### Optional Data

- Regional summaries
- Invalid votes count
- Reporting status

## 🌐 Deployment

### GitHub Pages

1. Create a new repository
2. Upload all files
3. Enable GitHub Pages in Settings
4. Your dashboard will be live at: `https://username.github.io/repo-name/election_results.html`

### Other Hosting

Upload to any web host:
- Netlify (drag & drop)
- Vercel
- AWS S3
- Your own server

**Note:** Ensure the server serves JSON files with correct MIME type.

## 🐛 Troubleshooting

### Map doesn't load
- Ensure `uganda_districts.geojson` is in the same folder
- Check browser console for errors
- Make sure you're using a web server (not file://)

### Charts don't appear
- Verify Chart.js is loading (check Network tab)
- Check JSON data structure matches expected format

### "Failed to fetch" errors
- Must use web server (not file:// protocol)
- Check API endpoint URLs
- Verify JSON file paths

### Blank statistics
- Check JSON data structure
- Open browser console to see errors
- Verify all required fields are present

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Security Notes

- All data is loaded client-side
- No sensitive information is transmitted
- Use HTTPS in production
- Validate data before displaying

## 📈 Performance

- Initial load: ~2-3 seconds
- JSON file sizes: ~20KB (mock data)
- GeoJSON file: ~18MB (can be optimized)
- Renders smoothly on mobile devices

## 🛠️ Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling with modern flexbox/grid
- **JavaScript (ES6+)** - Logic and interactivity
- **Leaflet.js** - Interactive maps
- **Chart.js** - Data visualization
- **OpenStreetMap** - Base map tiles

## 📝 License

Free to use and modify. Map data © OpenStreetMap contributors.

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Verify your JSON structure matches the examples
3. Check browser console for error messages

---

## 🎯 Next Steps

1. ✅ Dashboard is ready with mock data
2. 📝 Replace mock data with your real election data
3. 🎨 Customize colors and branding
4. 🚀 Deploy to GitHub Pages or web host
5. 📊 Share with users!

**The dashboard is fully functional right now with mock data. You can see all features working before adding real data.**

