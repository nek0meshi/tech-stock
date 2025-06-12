import { articleInfoClient, callRequest } from "@/server/grpc-client";
import type {
  GetArticleInfoRequest,
  GetArticleInfoResponse,
} from "@/server/grpc-client/generated/article_info";

export async function getArticleInfo(request: {
  url: string;
}): Promise<GetArticleInfoResponse> {
  return callRequest<GetArticleInfoRequest, GetArticleInfoResponse>(
    // wrapしないとOverloadが解決できない
    (call, callback) => articleInfoClient.getArticleInfo(call, callback),
    request,
  );
}
