import { v2 as cloudinary, ConfigOptions, UploadApiOptions } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const FOLDER = process.env.CLOUDINARY_FOLDER || "media_uploads";

if (!cloudName || !apiKey || !apiSecret) {
  // Do not throw at import time to avoid breaking build; API routes can validate
  // eslint-disable-next-line no-console
  console.warn(
    "Cloudinary env vars are missing. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET"
  );
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
} as ConfigOptions);

process.env.CLOUDINARY_ANALYTICS = "false";

export type MediaResource = {
  publicId: string;
  resourceType: "image" | "video" | "raw" | string;
  format?: string;
  url: string;
  thumbnailUrl: string;
  bytes: number;
  createdAt: string; // ISO
  width?: number;
  height?: number;
  duration?: number; // for video
  filename?: string;
};

// lib/cloudinary.ts
export const mapResource = (r: any): MediaResource => {
  const isVideo = r.resource_type === "video";
  const isSvg = r.resource_type === "image" && (r.format === "svg" || /\.svg$/i.test(r.public_id));

  const thumb = isVideo
    ? cloudinary.url(r.public_id + ".jpg", {
        resource_type: "video",
        transformation: [{ width: 300, height: 300, crop: "fill" }],
      })
    : cloudinary.url(r.public_id, {
        resource_type: "image",
        // For SVGs, rasterize to PNG so we can crop/fill
        format: isSvg ? "png" : undefined,
        transformation: [{ width: 300, height: 300, crop: "fill" }],
      });

  const directUrl = isVideo
    ? cloudinary.url(r.public_id, { resource_type: "video" })
    : cloudinary.url(r.public_id, { resource_type: "image" });

  return {
    publicId: r.public_id,
    resourceType: r.resource_type,
    format: r.format,
    url: directUrl,
    thumbnailUrl: thumb,
    bytes: r.bytes,
    createdAt: r.created_at,
    width: r.width,
    height: r.height,
    duration: r.duration,
    filename: r.filename,
  };
};

// export const listResources = async ({
//   nextCursor,
//   maxResults = 30,
//   resourceType = "all",
//   prefix,
//   expression,
// }: {
//   nextCursor?: string;
//   maxResults?: number;
//   resourceType?: "image" | "video" | "all";
//   prefix?: string;
//   expression?: string; // search expression
// }) => {
//   if (expression) {
//     const res = await cloudinary.search
//       .expression(expression)
//       .max_results(maxResults)
//       .next_cursor(nextCursor)
//       .execute();
//     return {
//       resources: res.resources.map(mapResource),
//       nextCursor: res.next_cursor as string | undefined,
//     };
//   }

//   const type = resourceType === "all" ? undefined : resourceType;
//   const res = await cloudinary.api.resources({
//     type: "upload",
//     resource_type: (type as any) || undefined,
//     max_results: maxResults,
//     next_cursor: nextCursor,
//     prefix,
//   } as any);
//   return {
//     resources: res.resources.map(mapResource),
//     nextCursor: res.next_cursor as string | undefined,
//   };
// };

export const listResources = async ({
  nextCursor,
  maxResults = 30,
  resourceType = "all",
  prefix,
  expression,
}: {
  nextCursor?: string;
  maxResults?: number;
  resourceType?: "image" | "video" | "all";
  prefix?: string;
  expression?: string;
}) => {
  // Build a folder-scoped search expression
  let searchExpr = `folder:${FOLDER}`;
  if (resourceType === "image") searchExpr += ` AND resource_type:image`;
  else if (resourceType === "video") searchExpr += ` AND resource_type:video`;
  else
    searchExpr += ` AND (resource_type:image OR resource_type:video OR resource_type:raw)`;

  if (expression && expression.trim()) {
    const q = expression.trim();
    searchExpr += ` AND (filename:*${q}* OR public_id:*${q}*)`;
  }

  const res = await cloudinary.search
    .expression(searchExpr)
    .sort_by("created_at", "desc")
    .max_results(maxResults)
    .next_cursor(nextCursor)
    .execute();

  return {
    resources: res.resources.map(mapResource),
    nextCursor: res.next_cursor as string | undefined,
  };
};
export const deleteResource = async (
  publicId: string,
  resourceType: "image" | "video" | "raw" = "image"
) => {
  if (resourceType === "video") {
    return cloudinary.api.delete_resources([publicId], {
      resource_type: "video",
    });
  }
  if (resourceType === "raw") {
    return cloudinary.api.delete_resources([publicId], {
      resource_type: "raw",
    });
  }
  return cloudinary.api.delete_resources([publicId]);
};

export const renameResource = async (
  fromPublicId: string,
  toPublicId: string,
  resourceType: "image" | "video" | "raw" = "image"
) => {
  return cloudinary.uploader.rename(fromPublicId, toPublicId, {
    resource_type: resourceType,
  } as any);
};

export const getSignedUploadParams = ({
  folder = "media_uploads",
  resourceType = "auto",
  publicId,
  overwrite = false,
}: {
  folder?: string;
  resourceType?: string;
  publicId?: string;
  overwrite?: boolean;
}) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const paramsToSign: Record<string, any> = { timestamp, folder };

  if (publicId) paramsToSign.public_id = publicId;
  if (overwrite) paramsToSign.overwrite = overwrite;

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!
  );

  return {
    timestamp,
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    folder,
    resourceType,
  };
};

export { cloudinary };
// import { v2 as cloudinary } from "cloudinary";

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const FOLDER = "cms-media-novaa"; // Your folder name

// export interface CloudinaryResource {
//   publicId: string;
//   resourceType: string;
//   url: string;
//   thumbnailUrl: string;
//   createdAt: string;
//   format?: string;
//   bytes?: number;
//   width?: number;
//   height?: number;
// }

// export interface ListResourcesParams {
//   nextCursor?: string;
//   maxResults?: number;
//   resourceType?: "image" | "video" | "all";
//   expression?: string;
// }

// export interface ListResourcesResult {
//   resources: CloudinaryResource[];
//   nextCursor?: string;
// }

// export async function listResources({
//   nextCursor,
//   maxResults = 30,
//   resourceType = "all",
//   expression,
// }: ListResourcesParams): Promise<ListResourcesResult> {
//   try {
//     let searchExpression = `folder:${FOLDER}`;

//     // Handle resource type filtering
//     if (resourceType && resourceType !== "all") {
//       searchExpression += ` AND resource_type:${resourceType}`;
//     } else {
//       searchExpression += ` AND (resource_type:image OR resource_type:video OR resource_type:raw)`;
//     }

//     // Add search query if provided
//     if (expression && expression.trim()) {
//       const queryTerm = expression.trim();
//       searchExpression += ` AND (filename:*${queryTerm}* OR public_id:*${queryTerm}*)`;
//     }

//     const searchBuilder = cloudinary.search
//       .expression(searchExpression)
//       .sort_by("created_at", "desc")
//       .max_results(maxResults);

//     if (nextCursor) {
//       searchBuilder.next_cursor(nextCursor);
//     }

//     const result = await searchBuilder.execute();

//     const resources: CloudinaryResource[] = (result.resources || []).map(
//       (resource: any) => ({
//         publicId: resource.public_id,
//         resourceType: resource.resource_type,
//         url: resource.secure_url,
//         thumbnailUrl: getThumbnailUrl(resource),
//         createdAt: resource.created_at,
//         format: resource.format,
//         bytes: resource.bytes,
//         width: resource.width,
//         height: resource.height,
//       })
//     );

//     return {
//       resources,
//       nextCursor: result.next_cursor,
//     };
//   } catch (error) {
//     console.error("Cloudinary list resources error:", error);
//     throw error;
//   }
// }

// function getThumbnailUrl(resource: any): string {
//   if (resource.resource_type === "video") {
//     return cloudinary.url(resource.public_id, {
//       resource_type: "video",
//       format: "jpg",
//       transformation: [{ width: 300, height: 300, crop: "fill", quality: "auto" }],
//     });
//   } else if (resource.resource_type === "image") {
//     return cloudinary.url(resource.public_id, {
//       resource_type: "image",
//       transformation: [{ width: 300, height: 300, crop: "fill", quality: "auto" }],
//     });
//   }
//   // For other types, return the original URL
//   return resource.secure_url;
// }

// export async function uploadFile(file: File, folder?: string) {
//   try {
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     const base64 = buffer.toString("base64");
//     const dataURI = `data:${file.type};base64,${base64}`;

//     const timestamp = Date.now();
//     const originalName = file.name.replace(/\.[^/.]+$/, "");
//     const cleanName = originalName.replace(/[^a-zA-Z0-9-_]/g, "_");

//     let resourceType: "image" | "video" | "raw" = "raw";
//     if (file.type.startsWith("image/")) {
//       resourceType = "image";
//     } else if (file.type.startsWith("video/")) {
//       resourceType = "video";
//     }

//     const result = await cloudinary.uploader.upload(dataURI, {
//       folder: folder || FOLDER,
//       resource_type: resourceType,
//       quality: resourceType === "image" ? "auto:good" : undefined,
//       fetch_format: resourceType === "image" ? "auto" : undefined,
//       public_id: `${cleanName}_${timestamp}`,
//       overwrite: false,
//     });

//     return {
//       success: true,
//       url: result.url,
//       secure_url: result.secure_url,
//       public_id: result.public_id,
//       format: result.format,
//       resource_type: result.resource_type,
//       bytes: result.bytes,
//       width: result.width,
//       height: result.height,
//       created_at: result.created_at,
//     };
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : "Upload failed",
//     };
//   }
// }

// export async function deleteFile(
//   publicId: string,
//   resourceType: "image" | "video" | "raw" = "image"
// ): Promise<boolean> {
//   try {
//     const result = await cloudinary.uploader.destroy(publicId, {
//       resource_type: resourceType,
//     });
//     return result.result === "ok";
//   } catch (error) {
//     console.error("Cloudinary delete error:", error);
//     return false;
//   }
// }
