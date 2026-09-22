import { AuthService } from "../services/auth.service.js";

export class AuthController {
  constructor(authService = new AuthService()) {
    this.authService = authService;
  }
  // LOGIN
  // ============================================================
  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const token = await this.authService.login(email, password);

      const cookieAge = 24 * 60 * 60 * 1000; // 1 Día

      const isProduction = process.env.NODE_ENV === "production";

      const cookieOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: cookieAge,
        path: "/",
      };

      console.log(`Login exitoso. User: ${email}`);

      return res.cookie("accessToken", token, cookieOptions).status(200).json({
        success: true,
        message: "Login exitoso",
      });
    } catch (error) {
      next(error);
    }
  };

  // REGISTER
  // ============================================================
  register = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const token = await this.authService.register(email, password);

      const cookieAge = 24 * 60 * 60 * 1000; // 1 Día

      const isProduction = process.env.NODE_ENV === "production";

      const cookieOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: cookieAge,
        path: "/",
      };

      console.log(`Register exitoso. User: ${email}`);

      return res.cookie("accessToken", token, cookieOptions).status(200).json({
        success: true,
        message: "Register exitoso",
      });
    } catch (error) {
      next(error);
    }
  };
}
