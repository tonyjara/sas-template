# The best SAS starter

Thank you for purchase. To quickly get started please follow the following instructions.

The file **.env.mjs** acts as a guard to make sure that you're always deploying with the right environment variables. Open the **.env.example** to get an overview of what you'll need to get started or to modify everything according to your needs.

Inside the **Constants.ts** file you can change all the site data to match your branding.

Update your app name in the site.webmanifest.json

## Database

You can use whatever database is supported by prisma. Just add the url to you .env file. To create the first migration and transfer the schema to your db run **npx prisma migrate dev --name init** .

### Installation

```bash
pnpm i
```

### Development

To run the app in development mode:

```bash
pnpm dev
```

This script runs a linter in parallel to get a better experience with typescript.

## Creating an admin user

To create an admin user create first a regular user and then change the role to admin directly in your database with any DB editor.

# Features

### Media

- Image cropping and compression
- Upload to Azure storage blob or AWS S3.

### Stripe and user usage

- Free trial banner
- Free trial logic
- Keep track of all usage with a credit system
- Pricing page synced with Stripe
- Restart your subscrption banner
- Send coupons to extend user usage
- Stripe measured products logic
- Stripe product creation/edit from the platform
- Stripe subscription

### Auth

- Auth with Next-auth. No third party services
- Confirm email logic
- Forgot my password logic

### Openai

- ChatGPT api integration
- ChatGPT chat completion drawer
- Send only the necessary tokend to the api

### Support and Maintenance

- Admin Panel
- Env guards
- Manage feature flags manually or automatically
- Receive user feedback or bug reports with images
- Seed page to quickly test features
- Selective logging for webhooks
- Support page to manage feedback

### Theming

- Bring your own color palette, easy replace
- Chakra UI integration
- Darkmode on everything

### Cool components

- Custom audio player with audio waveform
- Chakra-ui / React-table table with filtering per column
- Controlled Rich text editor
- Tons of controlled form components integrated with react-hook form

### Misc

- Change easily from local, staging or production environments with .env.cmd
- Deepgram integration for audio transcription
- Email integration with mailersend
- Google Analytics
- Google Recaptcha
- Prisma and trpc integration
- Privacy policy and Terms of Service examples ( NOT A LAWYER, USE AT YOUR OWN DISCRETION )
- SEO and open graph
- Single schema system used for Database, types and validation
- Telegram notifications
