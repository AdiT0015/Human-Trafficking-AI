# Human Trafficking AI Chatbot - Deployment Guide

This guide provides detailed instructions for deploying the Human Trafficking AI Chatbot to Netlify as a permanent website.

## Prerequisites

- A Netlify account (free tier is sufficient)
- Node.js and npm installed on your local machine
- Git (optional, but recommended for version control)

## Deployment Steps

1. **Extract the project files**
   - Download and extract the `human_trafficking_chatbot.zip` file

2. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

3. **Login to Netlify**
   ```bash
   netlify login
   ```
   This will open a browser window where you can authorize the CLI to access your Netlify account.

4. **Deploy the site**
   ```bash
   cd human_trafficking_chatbot
   netlify deploy --prod
   ```
   
5. **Follow the prompts**
   - When asked for the publish directory, enter: `dist`
   - When asked for functions directory, enter: `functions`

6. **Access your deployed site**
   - After deployment completes, Netlify will provide a URL for your site
   - The URL will typically be in the format: `https://your-site-name.netlify.app`

## Post-Deployment

- You can configure a custom domain in the Netlify dashboard
- Set up environment variables if needed
- Enable HTTPS (automatically handled by Netlify)
- Set up form handling for contact forms

## Troubleshooting

If you encounter any issues during deployment:

1. Check the Netlify deployment logs
2. Ensure all dependencies are correctly installed
3. Verify the netlify.toml configuration
4. Check that the serverless functions are properly configured

## Support

For additional help:
- Netlify Documentation: https://docs.netlify.com/
- Netlify Community Forum: https://community.netlify.com/
