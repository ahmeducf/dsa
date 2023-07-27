const Node = (val) => {
  let value = val || null;
  let next = null;

  const getValue = () => value;
  const setValue = (val) => (value = val);
  const getNext = () => next;
  const setNext = (node) => (next = node);

  return { getValue, getNext, setValue, setNext };
};

export default Node;