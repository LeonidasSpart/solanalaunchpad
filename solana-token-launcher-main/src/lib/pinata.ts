import { PinataSDK } from "pinata-web3";

const pinataJwt = process.env.PINATA_JWT;
const pinataGateway = process.env.PINATA_GATEWAY;

if (!pinataJwt) {
  throw new Error("PINATA_JWT is not set in .env.local");
}
if (!pinataGateway) {
  throw new Error("PINATA_GATEWAY is not set in .env.local");
}

export const pinata = new PinataSDK({
  pinataJwt,
  pinataGateway,
});
