/**
 * Reduce length of list by grouping items into smaller chunks of x
 * @param {Array} list The list to chunk
 * @param {number} chunkSize The size of each chunk
 * @return {Array} The chunked list
 */
const chunkList = (list, chunkSize) => {
  return list.reduce((chunks, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);

    if (!chunks[chunkIndex]) {
      chunks[chunkIndex] = [];
    }

    chunks[chunkIndex].push(item);

    return chunks;
  }, []);
};

/**
 * A hook that chunks a list into smaller pieces
 * @param {Array} list The list to chunk
 * @param {number} chunkSize The size of each chunk
 * @return {Array} The chunked list
 */
const useChunked = (list, chunkSize) => {
  const [chunkedList, setChunkedList] = useState([]);

  useEffect(() => {
    setChunkedList(chunkList(list, chunkSize));
  }, [list, chunkSize]);

  return chunkedList;
};
