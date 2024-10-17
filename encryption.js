const encryptionKey = import.meta.env.VITE_ENCRYPTION_KEY;

const encryption = {
  xor(data) {
    return data
      .split("")
      .map((char, i) =>
        String.fromCharCode(
          char.charCodeAt(0) ^
            encryptionKey.charCodeAt(i % encryptionKey.length)
        )
      )
      .join("");
  },

  encode(data) {
    return window.btoa(data);
  },

  decode(encodedData) {
    return window.atob(encodedData);
  },

  encrypt(data) {
    return this.encode(this.xor(data));
  },

  decrypt(data) {
    return this.xor(this.decode(data));
  },
};

export default encryption;
