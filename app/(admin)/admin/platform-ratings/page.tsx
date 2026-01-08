import { db } from "@/lib/db";
import { PlatformRatingsForm } from "./_components/platform-ratings-form";

const PlatformRatingsPage = async () => {
  try {
    // Fetch existing ratings from database
    const googleRating = await db.platformRating.findUnique({
      where: { platform: "Google" },
    });

    const culthRating = await db.platformRating.findUnique({
      where: { platform: "Culth" },
    });

    // Create default values if they don't exist
    const defaultGoogle = {
      id: "",
      platform: "Google",
      rating: 0,
      reviewCount: 0,
    };

    const defaultCulth = {
      id: "",
      platform: "Culth",
      rating: 0,
      reviewCount: 0,
    };

    return (
      <>
        <PlatformRatingsForm
          googleRating={googleRating || defaultGoogle}
          culthRating={culthRating || defaultCulth}
        />
      </>
    );
  } catch (error: any) {
    // Handle case where Prisma client hasn't been regenerated
    if (
      error?.message?.includes("platformRating") ||
      error?.code === "P2001" ||
      error?.message?.includes("findUnique")
    ) {
      return (
        <div className="p-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-yellow-800 mb-2">
              Prisma Client Needs to be Regenerated
            </h2>
            <p className="text-yellow-700 mb-4">
              The database schema has been updated, but the Prisma client needs
              to be regenerated to recognize the new PlatformRating model.
            </p>
            <div className="bg-white rounded p-4 mb-4">
              <p className="font-semibold text-sm mb-2">Please follow these steps:</p>
              <ol className="list-decimal list-inside mt-2 space-y-2 text-sm">
                <li>
                  <strong>Stop your development server</strong> (press Ctrl+C in
                  the terminal where it&apos;s running)
                </li>
                <li>
                  Run:{" "}
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono">
                    npx prisma generate
                  </code>
                </li>
                <li>
                  <strong>Restart your development server</strong> (run{" "}
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono">
                    npm run dev
                  </code>
                  )
                </li>
              </ol>
            </div>
            <p className="text-xs text-yellow-600">
              Note: The Prisma client files are locked while the dev server is
              running. You must stop it first before regenerating.
            </p>
          </div>
        </div>
      );
    }
    // Re-throw other errors
    throw error;
  }
};

export default PlatformRatingsPage;
