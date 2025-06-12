import { callRequest, imageClient } from "@/server/grpc-client";
import type {
  SaveImageOfUrlRequest,
  SaveImageOfUrlResponse,
} from "@/server/grpc-client/generated/image";

export async function saveImageOfUrl(request: {
  url: string;
}): Promise<SaveImageOfUrlResponse> {
  return callRequest<SaveImageOfUrlRequest, SaveImageOfUrlResponse>(
    // wrapしないとOverloadが解決できない
    (call, callback) => imageClient.saveImageOfUrl(call, callback),
    request,
  );
}
