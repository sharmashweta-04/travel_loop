const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Create a demo user if it doesn't already exist
  const existingUser = await prisma.user.findUnique({
    where: { email: 'demo@traveloop.com' },
  });

  let user = existingUser;
  if (!user) {
    const hashedPassword = await bcrypt.hash('TraveloopDemo2026!', 10);
    user = await prisma.user.create({
      data: {
        firstName: 'Alex',
        lastName: 'Morgan',
        email: 'demo@traveloop.com',
        password: hashedPassword,
        city: 'San Francisco',
        country: 'United States',
        isAdmin: true,
      },
    });
    console.log('✅ Created demo user: demo@traveloop.com');
  }

  // 2. Create sample trip if no trips exist for this user
  const userTrips = await prisma.trip.findMany({ where: { userId: user.id } });
  if (userTrips.length === 0) {
    const sampleTrip = await prisma.trip.create({
      data: {
        name: 'European Highlights Tour',
        description: 'A 10-day scenic journey exploring Paris, Zurich, and Rome.',
        coverPhoto: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
        startDate: new Date('2026-09-15T00:00:00.000Z'),
        endDate: new Date('2026-09-25T00:00:00.000Z'),
        isPublic: true,
        status: 'upcoming',
        userId: user.id,
        stops: {
          create: [
            {
              cityName: 'Paris',
              country: 'France',
              startDate: new Date('2026-09-15T00:00:00.000Z'),
              endDate: new Date('2026-09-18T00:00:00.000Z'),
              orderIndex: 0,
              activities: {
                create: [
                  {
                    name: 'Louvre Museum Tour',
                    description: 'Explore the Mona Lisa and historic art pieces.',
                    type: 'Sightseeing',
                    cost: 25.0,
                    duration: '3 hours',
                    timeSlot: 'Morning',
                  },
                  {
                    name: 'Eiffel Tower Sunset Summit',
                    description: 'Ascend to the summit for panoramic Parisian sunset views.',
                    type: 'Adventure',
                    cost: 35.0,
                    duration: '2 hours',
                    timeSlot: 'Evening',
                  },
                ],
              },
            },
            {
              cityName: 'Rome',
              country: 'Italy',
              startDate: new Date('2026-09-19T00:00:00.000Z'),
              endDate: new Date('2026-09-24T00:00:00.000Z'),
              orderIndex: 1,
              activities: {
                create: [
                  {
                    name: 'Colosseum & Roman Forum Walk',
                    description: 'Guided tour of ancient Roman landmarks.',
                    type: 'History',
                    cost: 30.0,
                    duration: '4 hours',
                    timeSlot: 'Morning',
                  },
                ],
              },
            },
          ],
        },
        budgets: {
          create: [
            { category: 'Flights', amount: 650.0, description: 'Roundtrip international flight' },
            { category: 'Accommodation', amount: 900.0, description: 'Hotels in Paris and Rome' },
            { category: 'Food & Dining', amount: 450.0, description: 'Daily meals and coffee' },
            { category: 'Activities', amount: 150.0, description: 'Museum passes and guided tours' },
          ],
        },
        notes: {
          create: [
            { content: 'Remember to book fast-train tickets between Paris and Rome in advance.' },
          ],
        },
      },
    });

    // 3. Create packing checklist items
    await prisma.checklistItem.createMany({
      data: [
        { name: 'Passport & Visa Documents', category: 'Documents', isPacked: true, tripId: sampleTrip.id, userId: user.id },
        { name: 'Universal Travel Adapter', category: 'Electronics', isPacked: false, tripId: sampleTrip.id, userId: user.id },
        { name: 'Comfortable Walking Shoes', category: 'Clothing', isPacked: false, tripId: sampleTrip.id, userId: user.id },
        { name: 'First Aid & Prescription Medicines', category: 'Medicines', isPacked: false, tripId: sampleTrip.id, userId: user.id },
      ],
    });

    console.log('✅ Created sample trip with stops, activities, budgets, and checklist.');
  }

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
