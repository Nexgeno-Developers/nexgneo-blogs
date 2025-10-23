import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { getSignedUploadParams } from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    const { folder, resourceType, publicId, overwrite } = await req.json();
    const signed = getSignedUploadParams({
      folder,
      resourceType,
      publicId,
      overwrite,
    });
    return NextResponse.json(signed);
  } catch (e) {
    console.error("[MEDIA_SIGN_UPLOAD]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
// /app/api/media/sign-upload/route.ts

// import { v2 as cloudinary } from "cloudinary";
// import { NextResponse } from "next/server";
// export async function POST(req: Request) {
//   try {
//     const { resourceType } = await req.json();
//     const timestamp = Math.round(new Date().getTime() / 1000);

//     const paramsToSign = { timestamp, folder: "media_uploads" };

//     const signature = cloudinary.utils.api_sign_request(
//       paramsToSign,
//       process.env.CLOUDINARY_API_SECRET!
//     );

//     return NextResponse.json({
//       timestamp,
//       signature,
//       apiKey: process.env.CLOUDINARY_API_KEY,
//       cloudName: process.env.CLOUDINARY_CLOUD_NAME,
//       folder: "media_uploads",
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Signature generation failed" }, { status: 500 });
//   }
// }