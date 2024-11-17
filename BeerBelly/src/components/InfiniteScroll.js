import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const InfiniteScrollComponent = () => {
  const [items, setItems] = useState(Array.from({ length: 20 }));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (items.length >= 100) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      setItems(items.concat(Array.from({ length: 20 })));
    }, 500);
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>You have seen it all!</b>
        </p>
      }
    >
      {items.map((_, index) => (
        <div key={index} style={{ height: 100, margin: 6, background: '#f0f0f0' }}>
          Item #{index + 1}
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default InfiniteScrollComponent;
