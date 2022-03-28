function instanceOf(left, right) {
  let proto = Object.getPrototypeOf(left);
  while (proto) {
    if (proto === right.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}
