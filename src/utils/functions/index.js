export default {
  // поиск родителя по классу
  findParent(el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
  }
}
