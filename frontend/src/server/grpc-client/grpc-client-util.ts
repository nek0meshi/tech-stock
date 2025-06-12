import type { ServiceError } from "@grpc/grpc-js";
import type { ClientUnaryCall } from "@grpc/grpc-js";

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
