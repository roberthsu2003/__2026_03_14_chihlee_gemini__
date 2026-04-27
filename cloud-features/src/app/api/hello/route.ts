import { getHelloData } from "@/lib/hello";

export async function GET() {
  return Response.json(getHelloData());
}
