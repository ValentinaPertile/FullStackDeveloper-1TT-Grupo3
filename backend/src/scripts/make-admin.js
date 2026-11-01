import { connectDB } from "../core/database/database.js";
import User from "../core/models/User.js";

const email = process.argv[2];

if (!email) {
  console.error("Uso: npm run make-admin -- <email>");
  process.exit(1);
}

await connectDB();

const escaped = email.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const user = await User.findOneAndUpdate(
  { email: new RegExp(`^${escaped}$`, "i") },
  { $set: { role: "ADMIN" } },
  { returnDocument: "after", runValidators: true },
).select("-password");

if (!user) {
  console.error(`No existe un usuario con el email "${email}".`);
  process.exit(1);
}

console.log(`✅ ${user.email} ahora tiene rol ADMIN.`);
console.log("⚠️  Cerrá sesión y volvé a entrar para que el JWT tome el rol nuevo.");
process.exit(0);
