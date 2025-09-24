/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },

  async redirects() {
    return [
      // Blog root redirect
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "blog.nexgeno.in",
          },
        ],
        destination: "https://nexgeno.in/blog",
        permanent: true,
      },

      // Redirect posts to /blog
      {
        source: "/posts/:slug*",
        has: [
          {
            type: "host",
            value: "blog.nexgeno.in",
          },
        ],
        destination: "https://nexgeno.in/blog/:slug*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
