import { redirect } from "next/navigation";

// The standalone funnel is retired — the one pipeline lives in the middle of
// the homepage. Old links and ads land there.
export default function StartPage() {
  redirect("/#plan");
}
