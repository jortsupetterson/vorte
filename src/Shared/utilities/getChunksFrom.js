export default (length, parts) => {
  const base = Math.floor(length / parts),
    rem = length % parts;
  const out = new Array(parts);
  let start = 0;
  for (let i = 0; i < parts; i++) {
    const size = base + (i < rem);
    out[i] = [start, start + size];
    start += size;
  }
  return out; // <num[[start0,end0), [start1,end1), ...]>
};
