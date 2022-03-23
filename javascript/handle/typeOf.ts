function typeOf(obj: object): string {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}
typeOf([]); // 'array'
typeOf({}); // 'object'
typeOf(new Date()); // 'date'
