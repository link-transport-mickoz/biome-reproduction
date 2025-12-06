class Node<T> {
  value: T;
  next: Node<T> | undefined;

  constructor(value: T) {
    this.value = value;
  }
}

export default class Queue<T> implements Iterable<T> {
  private head?: Node<T>;
  private tail?: Node<T>;
  private _size: number = 0;

  get size(): number {
    return this._size;
  }

  constructor() {
    this.clear();
  }

  enqueue(value: T) {
    const node = new Node(value);

    if (this.tail) {
      this.tail.next = node;
      this.tail = node;
    } else {
      this.head = node;
      this.tail = node;
    }

    this._size++;
  }

  dequeue(): T | undefined {
    const current = this.head;
    if (!current) {
      return;
    }

    this.head = this.head?.next;
    this._size--;

    return current.value;
  }

  dequeueOrFail(): T {
    const ret = this.dequeue();
    if (!ret) {
      throw new Error('Queue is empty');
    }
    return ret;
  }

  peek(): T | undefined {
    return this.head?.value;
  }

  clear() {
    this.head = undefined;
    this.tail = undefined;
    this._size = 0;
  }

  *[Symbol.iterator]() {
    let current = this.head;

    while (current) {
      yield current.value;
      current = current.next;
    }
  }
}
