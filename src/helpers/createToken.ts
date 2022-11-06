import jwt from 'jsonwebtoken'

const createToken = {

  activationToken: (payload: any) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET as string, { expiresIn: "5m" });
  },
  refreshToken: (payload: any) => {
    console.log(payload)
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "24h" });
  },

  accessToken: (payload: any) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "30m" });
  },
};

export default createToken;