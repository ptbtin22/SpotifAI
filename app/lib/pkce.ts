import crypto from "crypto";

export const generateRandomString = (length: number) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

export const sha256 = async (plain: string) => {
  return crypto.createHash("sha256").update(plain).digest();
};

export const base64encode = (input: Buffer | Uint8Array | ArrayBuffer) => {
  let str: string;

  if (input instanceof Buffer) {
    str = input.toString("base64");
  } else if (input instanceof Uint8Array) {
    str = Buffer.from(input).toString("base64");
  } else {
    str = Buffer.from(new Uint8Array(input)).toString("base64");
  }

  return str.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
};
