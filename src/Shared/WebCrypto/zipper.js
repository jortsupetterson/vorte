import { te, td } from "../Utilities/coders";
export default {
  async zip(object) {
    const jsonBytes = te.encode(JSON.stringify(object));
    if (globalThis.CompressionStream) {
      const stream = new Blob([jsonBytes])
        .stream()
        .pipeThrough(new CompressionStream("gzip"));
      const buffer = await new Response(stream).arrayBuffer();
      return new Uint8Array(buffer);
    }
    return jsonBytes;
  },

  async unzip(bytes) {
    const input = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
    if (globalThis.DecompressionStream) {
      const stream = new Blob([input])
        .stream()
        .pipeThrough(new DecompressionStream("gzip"));
      const buffer = await new Response(stream).arrayBuffer();
      return JSON.parse(td.decode(buffer));
    }
    return JSON.parse(td.decode(input));
  },
};
