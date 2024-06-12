export const arrayChunk = ({
  array,
  size = 20,
}: {
  array: Array<string>;
  size?: number;
}) => {
  const chunkedArray = [];
  let index = 0;

  while (index < array.length) {
    chunkedArray.push(array.slice(index, size + index));
    index += size;
  }

  return chunkedArray;
};
