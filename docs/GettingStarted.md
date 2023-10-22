# Getting started

follow the this instructions.

The file **.env.mjs** acts as a guard to make sure that you're always deploying with the right environment variables.
Rename the **.env.example** to __.env__ . Inside this file you can have an overview of the necessary pieces to make the application work. Through this documentation we will cover all the steps necessary to deploy this application.

### Constants

Inside the **Constants.ts** file you can change all the site data to match your branding and preferences. There are a few really useful options there such as a notifyMeWhenReady option for the hero page which will enable users to leave their emails to get notified when the application is ready. 

Update your app name in the site.webmanifest.json

### Database

You can use whatever database is supported by prisma. By default this starter uses Cockroach DB, it has a free tier and it's easy to get up and going.
Just add the databaseURL to you .env file and change the schema.prisma file accordingly.
To create the first migration and transfer the schema to your db run **npx prisma migrate dev --name init** .

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

### Creating an admin user

Admin users have access to the coupons, admin panel and the admin settings. 

To create an admin user you first need to create a regular user. To do so just go through the signup process. While in development no email will be sent to your account for confirmation ( unless specified in the constants file ). Instead, a Verification link will be printed to your terminal. 

Use that link to be redirected to the password assign page. After your regular user is created you'll have to manually change the role to admin directly in your database with any DB editor.
I recommend simply running __npx prisma studio__ and editing the account from there.
After changing the role, re login to get updated permissions.

You only need to do this once. After you have an admin user you can create more admin users from the admin/accounts page.

### Editing SEO

To manage tags such a the title, head or description look for the 'MetaTagsComponent'. This file should be present inside any page that could be indexed by search engines. Such as the main page and the pricing page.

**For documentation about how to integrate with stripe go to the docs/StripeDocumentation.md file**
