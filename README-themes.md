# Portfolio Color Theme System

## Overview
This portfolio uses a centralized color system that makes it easy to change the entire website's color scheme from one place. All colors are defined using CSS custom properties (variables) in the `theme-config.css` file.

## How to Change the Color Scheme

### Method 1: Use Pre-built Themes
1. Open `theme-config.css`
2. Find the alternative theme sections (commented out)
3. Uncomment one of the themes:
   - **Cyan Ocean**: Fresh, modern cyan with orange accents (Currently Active)
   - **Purple Modern**: Professional purple/pink gradient theme
   - **Blue Professional**: Corporate blue theme
   - **Green Nature**: Fresh green theme
4. Comment out or delete the current `:root` section
5. Save the file - all colors will automatically update!

### Method 2: Create Your Own Theme
1. Open `theme-config.css`
2. Modify the color values in the `:root` section
3. Key variables to change:
   ```css
   --primary-dark: #0891b2;        /* Main dark cyan color */
   --primary-light: #22d3ee;       /* Main light cyan color */
   --accent-orange: #f97316;       /* Orange accent color */
   --gradient-primary: linear-gradient(...); /* Main background */
   --gradient-heading: linear-gradient(...); /* Heading text */
   ```

### Method 3: Quick Color Swap
To quickly test a new color scheme:
1. Open your browser's Developer Tools (F12)
2. Go to the Console tab
3. Run commands like:
   ```javascript
   document.documentElement.style.setProperty('--primary-dark', '#0891b2');
   document.documentElement.style.setProperty('--accent-orange', '#f97316');
   ```

## Color Variable Reference

### Primary Colors
- `--primary-dark`: Main dark cyan brand color (#0891b2)
- `--primary-light`: Main light cyan color (#22d3ee)
- `--accent-orange`: Orange accent color for contrast (#f97316)
- `--accent-cyan`: Primary cyan accent (#06b6d4)

### Interactive Elements
- `--hover-primary`: Hover state color (Light cyan #67e8f9)
- `--focus-ring`: Focus outline color (Cyan #06b6d4)
- `--button-primary-bg`: Primary button background (White)
- `--button-primary-text`: Primary button text (Cyan #0891b2)

### Gradients
- `--gradient-primary`: Main background gradient (Cyan ocean waves)
- `--gradient-heading`: Section heading gradient (Cyan to light cyan)
- `--gradient-accent`: Typewriter text gradient (Orange to cyan)

### Component-Specific
- `--navbar-text`: Navigation text color (White)
- `--navbar-hover`: Navigation hover color (Light cyan)
- `--project-link-color`: Project card link color (Cyan)
- `--stats-color`: Statistics number color (Cyan)

## Current Theme: Cyan Ocean 🌊

The **Cyan Ocean** theme features:
- **Fresh & Modern**: Vibrant cyan creates a contemporary feel
- **High Contrast**: Orange accents provide excellent visual contrast
- **Ocean-Inspired**: Gradient mimics ocean waves and depths
- **Professional**: Suitable for tech, design, and creative portfolios
- **Energetic**: Cyan conveys innovation and forward-thinking

## File Structure
```
portfolio/
├── index.html              # Main HTML file
├── theme-config.css         # Color theme configuration
├── script.js               # JavaScript functionality
└── README-themes.md         # This documentation
```

## Tips
1. **Test on different screens**: Colors may look different on various devices
2. **Check accessibility**: Ensure sufficient contrast for readability
3. **Use the browser's color picker**: Right-click any element and "Inspect" to see which CSS variable controls its color
4. **Backup your changes**: Save your custom theme before trying a new one

## Troubleshooting
- **Colors not updating?** Make sure you saved the `theme-config.css` file
- **Some elements still old color?** Check if they use hardcoded Tailwind classes instead of CSS variables
- **Want to revert?** Just uncomment the original `:root` section and comment out your changes

---
*Happy theming! 🎨*
