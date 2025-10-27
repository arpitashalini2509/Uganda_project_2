# Uganda Voter Count by District 2021 - Interactive Map

An interactive web map displaying voter count data across Uganda's districts for 2021.

## Features

- **Interactive Map**: Click on any district to see detailed information
- **Dynamic Visualization**: Choose between two metrics:
  - Total Voters: Absolute number of registered voters per district
  - % of Total Votes: Percentage of total votes per district
- **Color-coded Districts**: Visual representation using a color scale
- **Tooltips**: Hover over districts to see quick information
- **Responsive Design**: Works on desktop and mobile devices

## Files

- `index.html` - Main web page (open this in your browser)
- `uganda_districts.geojson` - Geographic data with voter information
- `Voter Count by District 2021_0.xlsx` - Original Excel data
- `convert_shapefile.py` - Script to convert shapefile to GeoJSON

## How to Use

### Option 1: View Locally

1. Make sure both `index.html` and `uganda_districts.geojson` are in the same folder
2. Double-click `index.html` to open it in your web browser
3. Use the dropdown menu to switch between "Total Voters" and "% of Total Votes"
4. Click on any district for detailed information
5. Hover over districts to see quick stats

### Option 2: Deploy to GitHub Pages

1. Create a new repository on GitHub
2. Upload these files:
   - `index.html`
   - `uganda_districts.geojson`
3. Go to repository Settings → Pages
4. Under "Source", select "Deploy from a branch"
5. Select the main branch and root folder
6. Click Save
7. Your site will be published at: `https://your-username.github.io/your-repo-name/`

### Option 3: Use a Local Web Server

If you have Python installed, you can run a local server:

```bash
# Python 3
python -m http.server 8000

# Then open in browser:
# http://localhost:8000
```

## Data Sources

- **Voter Data**: Voter Count by District 2021 (Excel file)
- **Geographic Data**: Uganda Administrative Boundaries (UBOS, August 2020)
  - Level: ADM2 (District level)
  - 135 districts total
  - 133 districts matched with voter data

## Technologies Used

- **Leaflet.js**: Interactive mapping library
- **OpenStreetMap**: Base map tiles
- **GeoJSON**: Geographic data format
- HTML5, CSS3, JavaScript

## Color Scheme

Both metrics use a light green to dark green gradient:

### Total Voters
- Very Light Green: 0 - 50,000
- Light Green: 50,000 - 100,000
- Medium Light Green: 100,000 - 150,000
- Medium Green: 150,000 - 200,000
- Medium Dark Green: 200,000 - 300,000
- Dark Green: 300,000+

### % of Total Votes
- Very Light Green: 0% - 0.2%
- Light Green: 0.2% - 0.4%
- Medium Light Green: 0.4% - 0.6%
- Medium Green: 0.6% - 0.8%
- Medium Dark Green: 0.8% - 1.0%
- Dark Green: 1.0%+

## Notes

- 2 districts from the shapefile did not have matching voter data
- Gray color indicates no data available for that district
- All percentages are shown to 3 decimal places

## Regenerating the GeoJSON

If you need to update the data:

1. Update the Excel file: `Voter Count by District 2021_0.xlsx`
2. Run the conversion script:
   ```bash
   python convert_shapefile.py
   ```
3. This will regenerate `uganda_districts.geojson`

## Browser Compatibility

Works on all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

Map data © OpenStreetMap contributors
Administrative boundaries © UBOS (Uganda Bureau of Statistics)

