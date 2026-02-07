# Rinkal Panda - Portfolio Dashboard

A minimalist, unscrollable dashboard portfolio featuring a "Bento Grid" layout and an AI-powered chatbot. 

## Features
- **Bento Grid Layout**: Optimized for desktop viewing without scrolling.
- **AI Chatbot**: Integrated with Groq API to answer questions based on resume data.
- **Dark Mode**: Premium slate/blue aesthetic.
- **Responsive**: Stacks vertically on mobile devices.

## ⚠️ Important Security Note
This project uses a **client-side API key** (`script.js`) for the Chatbot to work on a static host. 
- **DO NOT** use this method for a serious production app with paid API limits.
- If you push this to a public GitHub repository, your API key will be visible. 
- **Recommendation**: For this demo, keep the repository **Private** on GitHub.

## Deployment Instructions (Render)

### 1. Push to GitHub
1. Create a new **repository** on GitHub (Recommend: **Private**).
2. Run the following commands in this folder:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### 2. Deploy on Render
1. Log in to [Render.com](https://render.com).
2. Click **New +** -> **Static Site**.
3. Connect your GitHub repository.
4. **Build Command**: (Leave empty)
5. **Publish Directory**: `.` (Dot, or leave default if it implies root)
6. Click **Create Static Site**.

Your portfolio will be live in seconds!
