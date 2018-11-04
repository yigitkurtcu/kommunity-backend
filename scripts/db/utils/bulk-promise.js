export default function bulkPromise(Model, items) {
  const promises = items.map((item) => {
    return Model.create({
      ...item,
    });
  });
  return Promise.all(promises);
}
