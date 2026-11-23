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

// A published demo invitation to open at http://localhost:5173/i/rahul-weds-priya
const invitation = await prisma.invitation.upsert({
    where: { slug: "rahul-weds-priya" },
    update: {},
    create: {
        clientId: client.id,
        slug: "rahul-weds-priya",
        title: "Rahul & Priya",
        language: "EN",
        status: "PUBLISHED",
        publishedAt: new Date(),
        eventDate: new Date("2027-02-14T18:30:00+05:30"),
        config: {
            groom: "Rahul",
            bride: "Priya",
            venue: "The Grand Palace, Pune",
            message: "Your presence is the greatest gift of all.",
        },
    },
});

console.log("Demo invitation: /i/" + invitation.slug);

await prisma.$disconnect();