# Image Setup Guide

## 📸 Required Images

You need to add your product images and logo to make the website fully functional.

## 📁 Image Folder Structure

All images go in: `frontend/images/`

```
frontend/images/
├── logo/
│   └── logo.png                    ← Your Royal Priesthood logo
│
├── kngdm-shirts/
│   ├── black.png                   ← KNGDM Shirt in Black
│   └── white.png                   ← KNGDM Shirt in White
│
├── limited-edition/
│   └── priesthood collection.png   ← Limited Edition Collection
│
├── men-regular/
│   ├── black.png                   ← Regular Fit Tee in Black
│   ├── grey.png                    ← Regular Fit Tee in Grey
│   ├── tan.png                     ← Regular Fit Tee in Tan
│   └── white.png                   ← Regular Fit Tee in White
│
├── pants-kngdm/
│   ├── black.png                   ← KNGDM Pants in Black
│   └── white.png                   ← KNGDM Pants in White
│
├── plain-collection/
│   ├── black.png                   ← Plain Collection Tee in Black
│   ├── grey.png                    ← Plain Collection Tee in Grey
│   ├── tan.png                     ← Plain Collection Tee in Tan
│   └── white.png                   ← Plain Collection Tee in White
│
├── royal-chosen/
│   ├── black.png                   ← Royal Chosen Tee in Black
│   ├── grey.png                    ← Royal Chosen Tee in Grey
│   ├── tan.png                     ← Royal Chosen Tee in Tan
│   └── white.png                   ← Royal Chosen Tee in White
│
└── shadow-wings/
    ├── black.png                   ← Shadow Wings Tee in Black
    ├── grey.png                    ← Shadow Wings Tee in Grey
    ├── tan.png                     ← Shadow Wings Tee in Tan
    └── white.png                   ← Shadow Wings Tee in White
```

## ✅ Image Requirements

### Format
- **Supported formats:** PNG, JPG, JPEG
- **Recommended:** PNG for best quality with transparency

### Size
- **Recommended dimensions:** 800x1000 pixels (portrait orientation)
- **Aspect ratio:** 4:5 (portrait) or 3:4
- **File size:** Keep under 500KB for faster loading

### Quality
- High resolution for product detail
- Clean white or transparent background
- Product centered in frame
- Good lighting

### Naming Convention
⚠️ **IMPORTANT: Names are case-sensitive and must match exactly:**

- `black.png` (not Black.png or BLACK.png)
- `white.png`
- `grey.png` (not gray.png)
- `tan.png`
- `priesthood collection.png` (exact name with space)

## 🖼️ Logo Specifications

**Location:** `frontend/images/logo/logo.png`

**Requirements:**
- Transparent background (PNG format)
- Square or horizontal orientation
- Minimum 200x200 pixels
- Works well in both black and white themes

**Usage:**
- Appears in navigation bar
- Appears in hero section (inverted to white)

## 📝 Step-by-Step Image Addition

### Step 1: Prepare Your Images
1. Gather all product photos
2. Edit to meet size requirements
3. Remove backgrounds if needed
4. Rename according to naming convention

### Step 2: Add Logo
1. Navigate to `frontend/images/logo/`
2. Delete the `README.txt` file
3. Add your `logo.png` file

### Step 3: Add Product Images
1. Navigate to each collection folder
2. Delete the `README.txt` file in each
3. Add the corresponding product images
4. Ensure filenames match exactly

### Step 4: Verify
1. Start the backend server: `npm start`
2. Open http://localhost:3000
3. Check that all images load correctly
4. If an image doesn't load, check:
   - Filename spelling
   - File format
   - Folder location

## 🚫 Common Mistakes

❌ Wrong filename: `Black.png` → ✅ Correct: `black.png`
❌ Wrong folder: Images in root → ✅ Correct: In specific collection folder
❌ Wrong format: `.gif` or `.bmp` → ✅ Correct: `.png` or `.jpg`
❌ Spaces in filenames (except "priesthood collection.png")

## 🎨 Image Optimization Tips

### For Best Performance:
1. **Compress images:** Use tools like TinyPNG or ImageOptim
2. **Consistent sizing:** All images same dimensions
3. **WebP format:** Consider converting to WebP for smaller size
4. **Lazy loading:** Already implemented in the code

### Recommended Tools:
- **Photoshop/GIMP:** For editing
- **TinyPNG:** For compression
- **remove.bg:** For background removal
- **Squoosh:** For format conversion

## 🔄 What If Images Are Missing?

If you don't have images yet:
- The website will show color placeholders
- "BLACK", "WHITE", "GREY", "TAN" text will appear
- Functionality remains intact
- Add images when ready

## 📱 Mobile Optimization

Images automatically adjust for mobile devices. No special mobile versions needed.

## 🎯 Quick Checklist

- [ ] Logo added to `logo/logo.png`
- [ ] 2 KNGDM Shirts images
- [ ] 1 Limited Edition image
- [ ] 4 Men Regular Fit images
- [ ] 2 Pants KNGDM images
- [ ] 4 Plain Collection images
- [ ] 4 Royal Chosen images
- [ ] 4 Shadow Wings images
- [ ] All filenames correct (lowercase, exact match)
- [ ] All images in correct folders
- [ ] Website tested and images loading

**Total: 25 images + 1 logo = 26 files**

## 💡 Pro Tips

1. Take product photos on a plain white background
2. Use natural lighting for best results
3. Keep consistent angle/perspective across collection
4. Show product details clearly
5. Consider lifestyle shots for hero section

## ❓ Need Help?

If images still don't load:
1. Check browser console (F12) for errors
2. Verify image paths in code
3. Ensure file permissions are correct
4. Clear browser cache
5. Restart the server

---

After adding all images, your Royal Priesthood shop will be fully functional! 🎉
