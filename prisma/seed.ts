import { PrismaClient } from "@prisma/client";
import { seedTemplates } from "./templates-seed";

const prisma = new PrismaClient();

async function main() {
  // Create plans
  const freePlan = await prisma.plan.upsert({
    where: { name: "Free" },
    update: {},
    create: {
      name: "Free",
      description: "Perfect for trying out our service",
      price: 0,
      interval: "month",
      features: [
        "5 flyers per month",
        "Basic templates",
        "Standard QR codes",
        "Email support",
      ],
      flyerLimit: 5,
      templateAccess: { basic: true, premium: false },
      stripePriceId: "price_free",
    },
  });

  const proPlan = await prisma.plan.upsert({
    where: { name: "Pro" },
    update: {},
    create: {
      name: "Pro",
      description: "Great for small businesses",
      price: 9.99,
      interval: "month",
      features: [
        "50 flyers per month",
        "All templates",
        "Custom QR codes",
        "Priority support",
        "Analytics dashboard",
        "Custom branding",
      ],
      flyerLimit: 50,
      templateAccess: { basic: true, premium: true },
      stripePriceId: "price_pro_monthly",
    },
  });

  const enterprisePlan = await prisma.plan.upsert({
    where: { name: "Enterprise" },
    update: {},
    create: {
      name: "Enterprise",
      description: "For growing businesses",
      price: 29.99,
      interval: "month",
      features: [
        "Unlimited flyers",
        "All templates",
        "Custom domains",
        "API access",
        "Advanced analytics",
        "Custom branding",
        "Priority support",
        "Bulk upload",
      ],
      flyerLimit: -1,
      templateAccess: { basic: true, premium: true, enterprise: true },
      stripePriceId: "price_enterprise_monthly",
    },
  });
  console.log("Plans seeded successfully!");

  // Seed templates
  await seedTemplates();

  console.log("Database seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
