import { env } from "@/config/env";
import { credentials } from "@grpc/grpc-js";
import { ArticleInfoServiceClient } from "./generated/article_info";
import { ImageServiceClient } from "./generated/image";

console.log({
  GRPC_BASE_URL: env.GRPC_BASE_URL,
});

export const articleInfoClient = new ArticleInfoServiceClient(
  env.GRPC_BASE_URL,
  credentials.createInsecure(),
);

export const imageClient = new ImageServiceClient(
  env.GRPC_BASE_URL,
  credentials.createInsecure(),
);
