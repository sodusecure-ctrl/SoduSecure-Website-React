const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'images', 'blogs');

// Ensure directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Blog image configurations
const blogs = [
  {
    id: 7,
    name: 'React 4 Shell RCE',
    colors: { bg: '#1a1a2e', accent: '#00d4ff' }
  },
  {
    id: 8,
    name: 'OpenClaw Security',
    colors: { bg: '#2d1b4e', accent: '#ff6b9d' }
  },
  {
    id: 9,
    name: 'Cybersecurity für KMU',
    colors: { bg: '#1b2d1a', accent: '#4ade80' }
  },
  {
    id: 10,
    name: 'OWASP Top 10 2026',
    colors: { bg: '#1b2430', accent: '#f59e0b' }
  }
];

async function createBlogImage(id, name, bgColor, accentColor) {
  const width = 800;
  const height = 600;
  
  // Create SVG with blog title
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#0a0a0a;stop-opacity:1" />
        </linearGradient>
        <pattern id="grid${id}" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${accentColor}" stroke-width="0.5" opacity="0.1"/>
        </pattern>
      </defs>
      
      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#grad${id})"/>
      
      <!-- Grid pattern -->
      <rect width="${width}" height="${height}" fill="url(#grid${id})"/>
      
      <!-- Accent shapes -->
      <circle cx="100" cy="100" r="80" fill="${accentColor}" opacity="0.15"/>
      <circle cx="700" cy="500" r="120" fill="${accentColor}" opacity="0.1"/>
      <rect x="500" y="50" width="150" height="150" fill="${accentColor}" opacity="0.08" rx="10"/>
      
      <!-- Security icon/element -->
      <g transform="translate(${width/2}, ${height/2 - 80})">
        <circle cx="0" cy="0" r="50" stroke="${accentColor}" stroke-width="3" fill="none"/>
        <path d="M -30 -30 Q -30 -50 -10 -60 Q 10 -50 10 -30 L 10 -10 Q 0 0 -10 0 Q -20 0 -30 -10 Z" fill="${accentColor}" opacity="0.8"/>
      </g>
      
      <!-- Title -->
      <text x="${width/2}" y="${height/2 + 100}" 
            font-size="42" 
            font-weight="bold" 
            text-anchor="middle"
            fill="${accentColor}"
            font-family="Arial, sans-serif">
        ${name}
      </text>
      
      <!-- Decorative lines -->
      <line x1="150" y1="${height - 80}" x2="650" y2="${height - 80}" 
            stroke="${accentColor}" stroke-width="2" opacity="0.5"/>
    </svg>
  `;
  
  const filename = `image${id}.png`;
  
  try {
    await sharp(Buffer.from(svg))
      .png()
      .toFile(path.join(imagesDir, filename));
    console.log(`✓ Created ${filename}`);
  } catch (err) {
    console.error(`✗ Error creating ${filename}:`, err.message);
  }
}

async function generateAllImages() {
  console.log('Generating blog images...\n');
  
  for (const blog of blogs) {
    await createBlogImage(blog.id, blog.name, blog.colors.bg, blog.colors.accent);
  }
  
  console.log('\n✓ All blog images created successfully!');
}

generateAllImages().catch(console.error);
