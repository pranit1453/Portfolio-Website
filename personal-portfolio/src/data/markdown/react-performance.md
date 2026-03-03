## Understanding React’s Rendering Model
React re-renders components whenever state or props change. This is part of its declarative model and Virtual DOM diffing strategy. However, unnecessary re-renders can significantly degrade performance in large-scale applications.

Each re-render triggers:
- Virtual DOM reconciliation
- Diffing against previous tree
- Possible real DOM updates

If your component tree is deep or contains expensive computations, this process can cause visible UI lag.

## Identifying Performance Bottlenecks
Before optimizing, measure performance using:
- **React DevTools Profiler** – Analyze component render frequency
- **Performance tab in Chrome DevTools**
- Console logs to detect unnecessary re-renders

Never optimize blindly. Always identify which components are re-rendering excessively.

## Preventing Unnecessary Re-renders

### 1️⃣ React.memo
`React.memo()` is a higher-order component that memoizes functional components. It prevents re-rendering if props are shallowly equal.

```javascript
const Child = React.memo(({ data }) => {
    console.log("Rendered");
    return <div>{data}</div>;
});
```

**Important:** React.memo performs shallow comparison. Passing inline objects or functions will break memoization because references change on every render.

### 2️⃣ useCallback
Functions are recreated on every render. When passed to memoized children, this causes unnecessary updates.

```javascript
const handleClick = useCallback(() => {
    console.log("Clicked");
}, []);
```

**useCallback** ensures function identity remains stable between renders.

### 3️⃣ useMemo
useMemo memoizes expensive calculations and object references.

```javascript
const filteredList = useMemo(() => {
    return items.filter(item => item.active);
}, [items]);
```

Without useMemo, filtering would execute on every render — even if `items` did not change.

## State Colocation Strategy
One of the most overlooked performance optimizations is moving state closer to where it is used. Lifting state too high in the component tree forces unnecessary re-renders.

Bad Practice:
- Global state for small UI toggles
- Keeping modal open state in top-level App

Better Practice:
- Localize state inside components
- Use context only when necessary

## Code Splitting & Lazy Loading
Large bundle sizes slow initial load time. Use dynamic imports with `React.lazy` and `Suspense` to split code.

```javascript
const Dashboard = React.lazy(() => import('./Dashboard'));

<Suspense fallback={<div>Loading...</div>}>
    <Dashboard />
</Suspense>
```

This ensures components load only when required, reducing initial bundle size.

## Optimizing Large Lists
Rendering large lists can degrade performance. Use:
- **React Window**
- **React Virtualized**

These libraries implement virtualization — rendering only visible items instead of the entire dataset.

## Debouncing and Throttling
Frequent state updates from inputs can cause performance issues.

- Use debouncing for search inputs
- Use throttling for scroll/resize events

## Production Build Optimization
- Always deploy production build (`npm run build`)
- Enable gzip or Brotli compression
- Use CDN for static assets
- Analyze bundle with Webpack Bundle Analyzer

## Common Mistakes to Avoid
- Overusing useMemo/useCallback unnecessarily
- Premature optimization
- Ignoring profiler data
- Global state misuse

## Final Thoughts
Performance optimization in React is about minimizing unnecessary renders, controlling reference equality, reducing bundle size, and measuring everything before acting. Focus on architecture first, then optimize bottlenecks.

The golden rule remains: **Measure → Identify → Optimize → Re-measure**.
