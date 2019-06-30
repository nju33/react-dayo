declare interface AsyncIterableFactory<T> {
  create(): AsyncIterable<T>;
}
