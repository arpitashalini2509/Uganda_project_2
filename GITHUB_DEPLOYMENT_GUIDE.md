# 🚀 GitHub Pages Deployment Guide

## Step-by-Step Instructions

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click the **+** icon (top right) → **New repository**
3. Fill in:
   - **Repository name**: `uganda-election-portal` (or your choice)
   - **Description**: "Uganda Election Results Portal and Voter Map"
   - **Public** (required for free GitHub Pages)
   - ✅ Check "Add a README file" (optional)
4. Click **Create repository**

---

### Step 2: Upload Files to GitHub

#### Option A: Upload via Web Interface (Easiest)

1. In your new repository, click **Add file** → **Upload files**

2. **Drag and drop these files/folders:**
   ```
   ✅ index.html
   ✅ election_results.html
   ✅ election_dashboard.js
   ✅ uganda_districts.geojson
   ✅ api/ (entire folder with 3 JSON files inside)
   ✅ README.md
   ✅ ELECTION_DASHBOARD_README.md
   ✅ PROJECT_SUMMARY.md
   ✅ QUICK_START.txt
   ✅ .gitignore
   ```

3. **DO NOT upload:**
   - ❌ Python files (.py)
   - ❌ Shapefiles folder (uga_admbnda_ubos_20200824_shp)
   - ❌ Excel files (.xlsx)
   - ❌ PDFs
   - ❌ Temporary files (~$*)

4. Scroll down, add commit message: "Initial upload - Election portal"

5. Click **Commit changes**

#### Option B: Upload via Git (If you have Git installed)

Open PowerShell in `D:\AS\uganda` and run:

```powershell
# Initialize git repository
git init

# Add all necessary files
git add index.html
git add election_results.html
git add election_dashboard.js
git add uganda_districts.geojson
git add api/
git add *.md
git add *.txt
git add .gitignore

# Commit
git commit -m "Initial commit - Uganda Election Portal"

# Connect to GitHub (replace YOUR-USERNAME and YOUR-REPO)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

### Step 3: Enable GitHub Pages

1. In your GitHub repository, click **Settings** (top menu)

2. Scroll down to **Pages** section (left sidebar)

3. Under **Source**:
   - Select: **Deploy from a branch**
   - Branch: **main** (or master)
   - Folder: **/ (root)**

4. Click **Save**

5. Wait 1-2 minutes for deployment

6. Refresh the page - you'll see:
   ```
   Your site is live at https://YOUR-USERNAME.github.io/YOUR-REPO/
   ```

---

### Step 4: Access Your Live Sites

**🗺️ Voter Count Map:**
```
https://YOUR-USERNAME.github.io/YOUR-REPO/index.html
```

**🏆 Election Results Dashboard:**
```
https://YOUR-USERNAME.github.io/YOUR-REPO/election_results.html
```

**📚 Main README:**
```
https://YOUR-USERNAME.github.io/YOUR-REPO/
```

---

## 📋 Quick Checklist

Before deploying, make sure you have these files:

### Essential Files (MUST upload)
- ✅ `index.html` - Voter map page
- ✅ `election_results.html` - Dashboard page
- ✅ `election_dashboard.js` - Dashboard logic
- ✅ `uganda_districts.geojson` - Map data (18MB)
- ✅ `api/national_results.json`
- ✅ `api/district_results.json`
- ✅ `api/regional_results.json`

### Documentation (RECOMMENDED)
- ✅ `README.md`
- ✅ `ELECTION_DASHBOARD_README.md`
- ✅ `PROJECT_SUMMARY.md`

### Not Needed for GitHub Pages
- ❌ `start_server.bat` (only for local)
- ❌ Python scripts (.py files)
- ❌ Excel files
- ❌ Shapefile folder

---

## 🔧 Troubleshooting

### Issue: Files not appearing
**Solution:** Check if you uploaded the `api/` folder. GitHub needs all three JSON files inside it.

### Issue: Map not loading
**Solution:** 
- Ensure `uganda_districts.geojson` was uploaded (it's large, ~18MB)
- Check if the upload completed successfully
- GitHub may take a few minutes to process large files

### Issue: "404 - File not found"
**Solution:** 
- Make sure file names match exactly (case-sensitive)
- Check that files are in the root directory, not in a subfolder

### Issue: JSON data not loading
**Solution:**
- Verify the `api/` folder structure:
  ```
  your-repo/
  ├── api/
  │   ├── national_results.json
  │   ├── district_results.json
  │   └── regional_results.json
  ```

---

## 🎨 Customization After Deployment

### Update Data
1. Edit the JSON files in the `api/` folder on GitHub
2. Click the file → Click the pencil icon (Edit)
3. Make changes
4. Commit changes
5. Wait 1-2 minutes for GitHub Pages to rebuild

### Change Colors
1. Edit `api/national_results.json`
2. Change the `color` field for each candidate
3. Commit changes

---

## 📊 File Size Considerations

GitHub Pages has these limits:
- ✅ Repository size: 1 GB (you're well under this)
- ✅ File size: 100 MB (your largest file is ~18MB)
- ✅ Bandwidth: 100 GB/month (soft limit)
- ✅ Builds: 10 per hour

Your project fits comfortably within all limits! 🎉

---

## 🔐 Making Repository Private (Paid Feature)

If you need a private repository:
1. Upgrade to GitHub Pro ($4/month)
2. Keep repository private
3. GitHub Pages still works with private repos on paid plans

For most users, **public repository is fine** - only the files are public, not your editing access.

---

## 🔄 Updating Your Site Later

### Via Web Interface:
1. Navigate to the file you want to edit
2. Click the pencil icon (Edit)
3. Make changes
4. Scroll down → Click "Commit changes"
5. Wait 1-2 minutes for changes to go live

### Via Git:
```bash
# Make changes to your local files
# Then:
git add .
git commit -m "Updated election data"
git push
```

---

## 🌐 Custom Domain (Optional)

Want a custom URL like `elections.yourdomain.com`?

1. Buy a domain (Namecheap, Google Domains, etc.)
2. In GitHub Settings → Pages → Custom domain
3. Enter your domain
4. Update DNS settings with your domain provider
5. Wait for DNS propagation (24-48 hours)

---

## ✅ Success!

Once deployed, your URLs will be:

**Voter Map:**
`https://YOUR-USERNAME.github.io/YOUR-REPO/index.html`

**Election Dashboard:**
`https://YOUR-USERNAME.github.io/YOUR-REPO/election_results.html`

Share these links with anyone - no server needed! 🎉

---

## 📞 Need Help?

- GitHub Pages docs: https://pages.github.com/
- GitHub file upload limit: 25MB via web (yours is ~18MB, should work)
- If GeoJSON is too large: Use Git command line or compress with topojson

**The deployment should take 5-10 minutes total!** 🚀

