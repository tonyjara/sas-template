-- CreateEnum
CREATE TYPE "SupportTicketPriority" AS ENUM ('low', 'medium', 'high', 'unsorted');

-- CreateEnum
CREATE TYPE "SupportTicketStatus" AS ENUM ('open', 'closed', 'inProgress');

-- CreateEnum
CREATE TYPE "SupportTicketType" AS ENUM ('question', 'bug', 'featureRequest', 'unsorted');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user', 'mod', 'support');

-- CreateEnum
CREATE TYPE "StripePriceTag" AS ENUM ('PLAN_FEE', 'TRANSCRIPTION_MINUTE', 'CHAT_INPUT', 'CHAT_OUTPUT', 'STORAGE_PER_GB');

-- CreateEnum
CREATE TYPE "StripeInterval" AS ENUM ('month', 'year');

-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('TRIAL', 'FREE', 'HOBBY', 'BASIC', 'PRO');

-- CreateTable
CREATE TABLE "Account" (
    "id" STRING NOT NULL,
    "active" BOOL NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "email" STRING NOT NULL,
    "password" STRING NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',
    "isVerified" BOOL NOT NULL DEFAULT false,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "firstName" STRING NOT NULL,
    "lastName" STRING NOT NULL,
    "image" STRING NOT NULL,
    "accountId" STRING NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountVerificationLinks" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "verificationLink" STRING NOT NULL,
    "email" STRING NOT NULL,
    "hasBeenUsed" BOOL NOT NULL DEFAULT false,

    CONSTRAINT "AccountVerificationLinks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordRecoveryLinks" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recoveryLink" STRING NOT NULL,
    "email" STRING NOT NULL,
    "hasBeenUsed" BOOL NOT NULL DEFAULT false,
    "accountId" STRING,

    CONSTRAINT "PasswordRecoveryLinks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preferences" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hasSeenOnboarding" BOOL NOT NULL DEFAULT false,
    "showTranscriptionWarning" BOOL NOT NULL DEFAULT true,
    "userId" STRING NOT NULL,

    CONSTRAINT "Preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" STRING NOT NULL,
    "token" STRING NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOL NOT NULL,
    "isFreeTrial" BOOL NOT NULL DEFAULT false,
    "stripeCustomerId" STRING,
    "stripeSubscriptionId" STRING,
    "eventCancellationId" STRING,
    "cancellAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "userId" STRING NOT NULL,
    "productId" STRING,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coupons" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "couponCode" STRING NOT NULL,
    "hasBeenClaimed" BOOL NOT NULL DEFAULT false,
    "claimedAt" TIMESTAMP(3),
    "expirationDate" TIMESTAMP(3),
    "chatInputCredits" INT4 NOT NULL DEFAULT 0,
    "chatOutputCredits" INT4 NOT NULL DEFAULT 0,
    "transcriptionMinutes" INT4 NOT NULL DEFAULT 0,
    "subscriptionId" STRING,

    CONSTRAINT "Coupons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" STRING NOT NULL,
    "active" BOOL NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "features" STRING NOT NULL,
    "payAsYouGo" STRING NOT NULL,
    "sortOrder" STRING NOT NULL,
    "description" STRING NOT NULL,
    "name" STRING NOT NULL,
    "planType" "PlanType" NOT NULL DEFAULT 'FREE',

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price" (
    "id" STRING NOT NULL,
    "active" BOOL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nickName" STRING NOT NULL,
    "sortOrder" STRING NOT NULL,
    "currency" STRING NOT NULL,
    "unit_amount_decimal" STRING NOT NULL,
    "interval" STRING NOT NULL,
    "tag" "StripePriceTag" NOT NULL,
    "productId" STRING NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionItem" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOL NOT NULL,
    "priceTag" "StripePriceTag" NOT NULL,
    "subscriptionId" STRING,
    "stripeSubscriptionId" STRING,
    "priceId" STRING,

    CONSTRAINT "SubscriptionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentIntent" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "stripeProductId" STRING NOT NULL,
    "unit_amount_decimal" STRING NOT NULL,
    "validatedByWebhook" BOOL NOT NULL DEFAULT false,
    "validatedBySuccessPage" BOOL NOT NULL DEFAULT false,
    "confirmedByWebhookAt" TIMESTAMP(3),
    "confirmationEventId" STRING,
    "userId" STRING,

    CONSTRAINT "PaymentIntent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionCreditsActions" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "currentAmount" DECIMAL(19,4) NOT NULL DEFAULT 0,
    "prevAmount" DECIMAL(19,4) NOT NULL DEFAULT 0,
    "amount" DECIMAL(19,4) NOT NULL DEFAULT 0,
    "tag" "StripePriceTag" NOT NULL,
    "subscriptionId" STRING,

    CONSTRAINT "SubscriptionCreditsActions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureFlags" (
    "id" STRING NOT NULL,
    "signupEnabled" BOOL NOT NULL DEFAULT true,
    "rssEnabled" BOOL NOT NULL DEFAULT true,
    "transcriptionEnabled" BOOL NOT NULL DEFAULT true,
    "chatEnabled" BOOL NOT NULL DEFAULT true,
    "maintenance" BOOL NOT NULL DEFAULT false,

    CONSTRAINT "FeatureFlags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportTicket" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" STRING NOT NULL,
    "subject" STRING NOT NULL,
    "message" STRING NOT NULL,
    "status" "SupportTicketStatus" NOT NULL,
    "priority" "SupportTicketPriority" NOT NULL,
    "type" "SupportTicketType" NOT NULL,
    "imageUrl" STRING,
    "imageName" STRING,
    "userId" STRING NOT NULL,

    CONSTRAINT "SupportTicket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Logs" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "message" STRING NOT NULL,
    "level" STRING NOT NULL,
    "eventId" STRING NOT NULL,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AudioFile" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" STRING NOT NULL,
    "blobName" STRING NOT NULL,
    "url" STRING NOT NULL,
    "isHostedByPS" BOOL NOT NULL DEFAULT true,
    "isSelected" BOOL NOT NULL DEFAULT false,
    "length" INT4 NOT NULL,
    "duration" INT4 NOT NULL,
    "type" STRING NOT NULL DEFAULT 'audio/mpeg',
    "subscriptionId" STRING,
    "peaks" FLOAT8[],

    CONSTRAINT "AudioFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_accountId_key" ON "User"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Preferences_userId_key" ON "Preferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Coupons_couponCode_key" ON "Coupons"("couponCode");

-- CreateIndex
CREATE UNIQUE INDEX "AudioFile_blobName_subscriptionId_key" ON "AudioFile"("blobName", "subscriptionId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordRecoveryLinks" ADD CONSTRAINT "PasswordRecoveryLinks_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preferences" ADD CONSTRAINT "Preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coupons" ADD CONSTRAINT "Coupons_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionItem" ADD CONSTRAINT "SubscriptionItem_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionItem" ADD CONSTRAINT "SubscriptionItem_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "Price"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentIntent" ADD CONSTRAINT "PaymentIntent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionCreditsActions" ADD CONSTRAINT "SubscriptionCreditsActions_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportTicket" ADD CONSTRAINT "SupportTicket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AudioFile" ADD CONSTRAINT "AudioFile_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;
