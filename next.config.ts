import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Permitir acceso al dev server desde la IP de la LAN (iPad, celular,
     otro equipo en la red). Sin esto, Next bloquea las requests de RSC
     y los Client Components no terminan de hidratarse. */
  allowedDevOrigins: ["192.168.0.198", "192.168.0.*", "192.168.1.*"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;
