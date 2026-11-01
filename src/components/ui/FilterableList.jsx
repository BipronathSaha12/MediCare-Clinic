import React from 'react';
import EmptyState from './EmptyState';

// [REQ-6] Render prop:
// Generic, reusable list component that decouples item filtering/state from presentation.
// Consumer components pass a `renderItem` function that receives each item and returns JSX.
export default function FilterableList({
  items = [],
  renderItem,
  emptyState = null,
  className = '',
  wrapper: Wrapper = 'div',
  keyExtractor = (item) => item.id
}) {
  // // [REQ-2a] Ternary operator:
  // Evaluates whether the collection is empty and conditionally renders
  // either the designated EmptyState component or the mapped items.
  if (items.length === 0) {
    return emptyState || <EmptyState title="No items found" subtitle="No matching items were found." />;
  }

  return (
    <Wrapper className={className}>
      {/* // [REQ-1] Render a list using .map() with a correct, stable key */}
      {items.map((item, index) => {
        const key = keyExtractor ? keyExtractor(item) : (item.id || index);
        return (
          <React.Fragment key={key}>
            {renderItem(item, index)}
          </React.Fragment>
        );
      })}
    </Wrapper>
  );
}
