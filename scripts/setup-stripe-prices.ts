// scripts/setup-stripe-prices.ts
import Stripe from "stripe";
import { plans } from "../src/lib/stripe";

const stripe = new Stripe("sk_test_51RmHKOPD8W9LZ4BLEW5MoecTTmr1JtbIWDo9YH6mOCLVdjtjVyNXBTR7clUqX30NUc69E8AiSMOWnyj8NxVrqnjU00e2bUpQ7a", {
  apiVersion: "2025-06-30.basil",
  typescript: true,
});

interface PriceMapping {
  planName: string;
  monthlyPriceId: string;
  yearlyPriceId?: string;
}

async function createProduct(name: string, description: string) {
  try {
    // Check if product already exists
    const existingProducts = await stripe.products.list({
      limit: 100,
    });

    const existingProduct = existingProducts.data.find(
      (product) => product.name === name
    );

    if (existingProduct) {
      console.log(`✓ Product "${name}" already exists`);
      return existingProduct;
    }

    // Create new product
    const product = await stripe.products.create({
      name,
      description,
      type: "service",
    });

    console.log(`✓ Created product: ${name}`);
    return product;
  } catch (error) {
    console.error(`Error creating product ${name}:`, error);
    throw error;
  }
}

async function createPrice(
  productId: string,
  amount: number,
  interval: "month" | "year",
  planName: string
) {
  try {
    // Check if price already exists for this product and interval
    const existingPrices = await stripe.prices.list({
      product: productId,
      limit: 100,
    });

    const existingPrice = existingPrices.data.find(
      (price) =>
        price.recurring?.interval === interval && price.unit_amount === amount
    );

    if (existingPrice) {
      console.log(`✓ Price for ${planName} (${interval}) already exists`);
      return existingPrice;
    }

    // Create new price
    const price = await stripe.prices.create({
      currency: "usd",
      unit_amount: amount,
      recurring: {
        interval,
      },
      product: productId,
      nickname: `${planName} ${interval === "month" ? "Monthly" : "Yearly"}`,
    });

    console.log(`✓ Created price: ${planName} ${interval} - $${amount / 100}`);
    return price;
  } catch (error) {
    console.error(`Error creating price for ${planName}:`, error);
    throw error;
  }
}

async function setupStripePrices(): Promise<PriceMapping[]> {
  console.log("🚀 Setting up Stripe prices...\n");

  const priceMappings: PriceMapping[] = [];

  for (const plan of plans) {
    if (plan.name === "Free") {
      // Skip creating Stripe prices for free plan
      priceMappings.push({
        planName: plan.name,
        monthlyPriceId: "price_free", // Keep existing free price ID
      });
      continue;
    }

    try {
      console.log(`Processing plan: ${plan.name}`);

      // Create product
      const product = await createProduct(
        `FlyerWeb ${plan.name}`,
        plan.description
      );

      // Create monthly price
      const monthlyAmount = Math.round(plan.price * 100); // Convert to cents
      const monthlyPrice = await createPrice(
        product.id,
        monthlyAmount,
        "month",
        plan.name
      );

      // Create yearly price (20% discount)
      const yearlyAmount = Math.round(plan.price * 12 * 0.8 * 100); // 20% discount, convert to cents
      const yearlyPrice = await createPrice(
        product.id,
        yearlyAmount,
        "year",
        plan.name
      );

      priceMappings.push({
        planName: plan.name,
        monthlyPriceId: monthlyPrice.id,
        yearlyPriceId: yearlyPrice.id,
      });

      console.log(`✅ Completed setup for ${plan.name}\n`);
    } catch (error) {
      console.error(`❌ Failed to setup ${plan.name}:`, error);
    }
  }

  return priceMappings;
}

async function main() {
  try {
    // if (!process.env.STRIPE_SECRET_KEY) {
    //   throw new Error("STRIPE_SECRET_KEY environment variable is required");
    // }

    const priceMappings = await setupStripePrices();

    console.log("\n📋 Price Mappings Created:");
    console.log("================================");
    priceMappings.forEach((mapping) => {
      console.log(`${mapping.planName}:`);
      console.log(`  Monthly: ${mapping.monthlyPriceId}`);
      if (mapping.yearlyPriceId) {
        console.log(`  Yearly: ${mapping.yearlyPriceId}`);
      }
      console.log("");
    });

    console.log("\n✨ Stripe setup completed successfully!");
    console.log("\n📝 Next steps:");
    console.log("1. Update your stripe.ts file with the new price IDs");
    console.log("2. Test the checkout flow");
    console.log("3. Set up webhooks for subscription management");
  } catch (error) {
    console.error("❌ Setup failed:", error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

export { setupStripePrices };
