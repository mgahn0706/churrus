import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PsychicAdminEditor from "./AdminEditor";

const adminPath = "/scenarios/scenario/psychic/admin";
const cookieName = "psychic_admin_session";

function sessionToken() {
  const secret = process.env.PSYCHIC_ADMIN_SESSION_SECRET ?? "psychic-admin-session-0706-v1";
  return createHmac("sha256", secret).update(adminPath).digest("hex");
}

function hasAccess(value: string | undefined) {
  if (!value) return false;
  const received = Buffer.from(value);
  const expected = Buffer.from(sessionToken());
  return received.length === expected.length && timingSafeEqual(received, expected);
}

async function unlockAdmin(formData: FormData) {
  "use server";

  if (formData.get("code") !== "0706") {
    redirect(`${adminPath}?error=1`);
  }

  (await cookies()).set(cookieName, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: adminPath,
  });
  redirect(adminPath);
}

export default async function PsychicAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = (await cookies()).get(cookieName)?.value;
  if (hasAccess(session)) return <PsychicAdminEditor />;

  const { error } = await searchParams;
  return (
    <main style={{
      minHeight: "100dvh",
      display: "grid",
      placeItems: "center",
      padding: 20,
      background: "#080d0c",
      color: "#f8edda",
      fontFamily: "Galmuri11, sans-serif",
    }}>
      <form action={unlockAdmin} style={{
        width: "min(100%, 360px)",
        display: "grid",
        gap: 16,
        padding: 24,
        border: "1px solid rgba(231,201,148,.28)",
        background: "#111b18",
      }}>
        <label htmlFor="admin-code" style={{ fontSize: 16, fontWeight: 700 }}>관리자 코드</label>
        <input
          id="admin-code"
          name="code"
          type="password"
          inputMode="numeric"
          pattern="[0-9]{4}"
          maxLength={4}
          autoComplete="off"
          required
          aria-invalid={error === "1"}
          aria-describedby={error === "1" ? "admin-code-error" : undefined}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "12px 14px",
            border: `1px solid ${error === "1" ? "#d97c72" : "rgba(231,201,148,.4)"}`,
            outlineColor: "#bd874e",
            background: "#080d0c",
            color: "#f8edda",
            font: "inherit",
            letterSpacing: 4,
          }}
        />
        {error === "1" && <span id="admin-code-error" role="alert" style={{ color: "#f0a49d", fontSize: 13 }}>코드가 올바르지 않습니다.</span>}
        <button type="submit" style={{
          padding: "11px 14px",
          border: 0,
          background: "#bd874e",
          color: "#080d0c",
          font: "inherit",
          fontWeight: 700,
          cursor: "pointer",
        }}>열기</button>
      </form>
    </main>
  );
}
