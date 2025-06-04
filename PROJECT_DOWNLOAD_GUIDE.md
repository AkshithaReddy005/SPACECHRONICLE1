# ISRO Journey Website - Download Guide

## How to Download All Project Files

### Method 1: Using Replit (Recommended)
1. **Fork the Project**: Click the "Fork" button in the top-right corner of Replit
2. **Download as ZIP**: 
   - Go to the file explorer (left sidebar)
   - Click the three dots menu (...) next to the project name
   - Select "Download as ZIP"
   - Save the ZIP file to your computer

### Method 2: Using Git Clone
1. **Get Repository URL**: Copy the Git URL from Replit
2. **Clone Locally**:
   ```bash
   git clone [REPOSITORY_URL]
   cd [PROJECT_NAME]
   ```

### Method 3: Manual File Download
1. **Select All Files**: In Replit file explorer, select all files
2. **Right-click**: Choose "Download"
3. **Extract**: Unzip the downloaded file

## Project Structure
```
isro-journey/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # All React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and data
│   │   └── pages/          # Page components
│   └── index.html          # Main HTML file
├── server/                 # Backend Express server
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   └── storage.ts         # Data storage
├── shared/                 # Shared types and schemas
├── package.json           # Dependencies
└── vite.config.ts         # Build configuration
```

## Running the Project Locally

### Prerequisites
- Node.js 20 or higher
- npm or yarn package manager

### Installation Steps
1. **Navigate to Project Directory**:
   ```bash
   cd isro-journey
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**: Visit `http://localhost:5000`

## Features Included
- Full-screen space-themed background
- Interactive timeline with 15+ ISRO milestones
- Real-time mission tracker
- 3D orbital visualization
- Launch simulator with telemetry
- Space weather monitoring
- Interactive storytelling
- Leaders showcase with achievements
- Authentic ISRO image gallery

## Technologies Used
- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Express.js, Node.js
- **Build Tool**: Vite
- **UI Components**: Radix UI, shadcn/ui

## Customization
- **Colors**: Edit `client/src/index.css` for theme colors
- **Content**: Modify `client/src/lib/data.ts` for timeline and mission data
- **Components**: All React components are in `client/src/components/`

## Deployment Options
- **Replit**: Already deployed and running
- **Vercel**: Deploy frontend with `npm run build`
- **Netlify**: Static site deployment
- **Heroku**: Full-stack deployment

## Support
If you encounter any issues:
1. Check that all dependencies are installed
2. Ensure Node.js version is 20+
3. Clear browser cache and restart development server
4. Check console for any error messages

Enjoy your award-winning ISRO Journey website!