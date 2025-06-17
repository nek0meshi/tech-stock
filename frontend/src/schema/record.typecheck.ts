import type { z } from "@/lib/zod";
import type { Assert, AssertEqual } from "@/utils/typecheck";
import type { Record, RecordDBSchema } from "./record";

type _check = Assert<AssertEqual<Record, z.infer<typeof RecordDBSchema>>>;
