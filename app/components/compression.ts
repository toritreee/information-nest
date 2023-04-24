import * as fflate from "fflate";
export function deflateRaw(text: string) {
  return new Promise<string>((rej, res) =>
    fflate.compress(fflate.strToU8(text), { level: 3, mem: 4 }, (e, v) => {
      if (e) {
        res("err");
        return;
      }
      function arrayBufferToBinaryString(arrayBuffer:Uint8Array) {
        let binaryString = "";
        const bytes = new Uint8Array(arrayBuffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binaryString += String.fromCharCode(bytes[i]);
        }
        return binaryString;
      }

      const binaryString = arrayBufferToBinaryString(v);
      rej(fflate.strFromU8(v));
    })
  );
}

export function inflateRaw(text: string) {
  return new Promise<string>((rej, res) => {
    fflate.decompress(new TextEncoder().encode(text), (e, v) => {
      if (e) {
        res(e);
        return;
      }
      rej(fflate.strFromU8(v));
    });
  });
}
