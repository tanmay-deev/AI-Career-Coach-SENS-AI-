"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function UpdateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) throw new Error("User not found");

  try {
      const result = await db.$transaction(async (tx) => {
        // find if the industry exists
        let industryInsights = await tx.industryInsights.findUnique({
          where: {
            industry: data.industry,
          }
        })
        
        // if not, create it
        if (!industryInsights) {
          industryInsights = await tx.industryInsights.create({
            data: {
              industry: data.industry,
              salaryRange: [],
              growthRate: 0,
              demandLever: "medium",
              topSkills: [],
              marketOutlook: "neutral",
              keyTrends: [],
              recommendedSkills: [],
              nextUpdate: new Date(Date.now() +7 * 24 * 60 * 60 * 1000), // 7 days from now
            }
          })
        }

        //update the user
        const updatedUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
          },
        });

        return { updatedUser, industryInsights };

    }, {
      timeout: 10000, // 10 seconds
    });

    return result.user;
  } catch (error) {
    console.error("Error updating user and industry:", error.message);
    throw new Error("Failed to update profile");
  }
}

export async function getUserOnboardingStatus() {
   const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) throw new Error("User not found");

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
      }
    })

    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    console.error("Error fetching user onboarding status:", error.message);
    throw new Error("Failed to fetch onboarding status");
  }
}
