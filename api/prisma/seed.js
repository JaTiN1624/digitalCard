import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const prisma  = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL}),
});

const client = await prisma.client.upsert({
    where: { email: "demo@example.com"},
    update: {},
    create: {name: "Demo Client", email:"demo@example.com", phone:"9999999999"},
});

console.log("Demo client id: ", client.id);

await prisma.$disconnect();