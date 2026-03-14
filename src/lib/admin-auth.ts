import { cookies } from "next/headers";
import crypto from "crypto";

export async function isAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get("admin_session")?.value;
  const hash = jar.get("admin_session_hash")?.value;

  if (!token || !hash) return false;

  const expectedHash = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  return hash === expectedHash;
}
