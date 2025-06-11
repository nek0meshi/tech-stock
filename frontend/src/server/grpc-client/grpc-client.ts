import {
  type ClientUnaryCall,
  type ServiceError,
  credentials,
} from "@grpc/grpc-js";
import { ArticleInfoServiceClient } from "./generated/article_info";

export const articleInfoClient = new ArticleInfoServiceClient(
  process.env.GRPC_BASE_URL ?? "localhost:50050",
  credentials.createInsecure(),
);

export function callRequest<Req, Res>(
  call: (
    args: Req,
    callback: (error: ServiceError | null, response: Res) => void,
  ) => ClientUnaryCall,
  request: Req,
): Promise<Res> {
  console.log({ call, request });
  return new Promise((resolve, reject) => {
    call(request, (error, response) => {
      console.log({ error, response });

      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}
