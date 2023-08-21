import jwt from 'jsonwebtoken';
import db from './../db.js';
class TokenService {
    generateTokens(payload) {
        const JWT_ACCESS_SECRET_KEY = process.env.JWT_ACCESS_SECRET_KEY;
        const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;
        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET_KEY, { expiresIn: '5m' });
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET_KEY, { expiresIn: '24h' });
        return {
            accessToken,
            refreshToken
        };
    }
    async saveRefreshToken(user_id, refreshToken) {
        const refreshTokenData = await db.query(`SELECT * FROM REFRESH_TOKEN WHERE user_id=$1 OR  refresh_token=$2`, [
            user_id, refreshToken
        ]);
        if (refreshTokenData === undefined)
            return;
        if (refreshTokenData.rows.length > 0) {
            await db.query(`UPDATE REFRESH_TOKEN SET refresh_token=$1 WHERE user_id=$2`, [
                refreshToken, user_id
            ]);
            return;
        }
        await db.query(`INSERT INTO REFRESH_TOKEN(refresh_token, user_id) values($1,$2)`, [
            refreshToken, user_id
        ]);
        return;
    }
    async removeToken(id) {
        await db.query(`DELETE FROM REFRESH_TOKEN WHERE user_id=$1`, [id]);
        return;
    }
    validateAccessToken(accessToken) {
        try {
            const JWT_ACCESS_SECRET_KEY = process.env.JWT_ACCESS_SECRET_KEY;
            const employeeData = jwt.verify(accessToken, JWT_ACCESS_SECRET_KEY);
            return employeeData;
        }
        catch (error) {
            return null;
        }
    }
    validateRefreshToken(refreshToken) {
        try {
            const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;
            const employeeData = jwt.verify(refreshToken, JWT_REFRESH_SECRET_KEY);
            return employeeData;
        }
        catch (error) {
            return null;
        }
    }
    async findToken(refreshToken) {
        const tokenData = await db.query(`SELECT * FROM REFRESH_TOKEN WHERE refresh_token=$1`, [refreshToken]);
        return tokenData.rows[0];
    }
}
export default new TokenService();
