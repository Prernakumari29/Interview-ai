const express = require("express");
const { registerUser, loginUser, getMeController } = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const cacheInstance = require("../config/cacheInstance");

const router = express.Router();

/**
 * @route POST/AUTH/register
 * @description register user with name, email and password
 * @access PUBLIC
 */

router.post("/register" , registerUser )

/**
 * @route POST/AUTH/LOGIN
 * @description login user with email and password
 * @access PUBLIC
 */

router.post("/login" , loginUser)

// ----------------------------------------logOut--------------------------------------

router.get("/logout", authMiddleware, async (req, res) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Token not found"
            });
        }

        await cacheInstance.set(token, "blacklisted", "EX", 86400);

        const checkToken = await cacheInstance.get(token);
        console.log("Blacklisted token exists:", checkToken);

        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/"
        });

        return res.status(200).json({
            message: "Successfully logged out"
        });
    } catch (error) {
        console.error("Logout error:", error);

        return res.status(500).json({
            message: "Logout failed"
        });
    }
});


// ----------------------------get me-----------------------
/**
 * @route get/AUTH/get-me
 * @description get the current loogedin user details
 * @access PUBLIC
 */

router.get("/get-me" , authMiddleware , getMeController)


module.exports = router;