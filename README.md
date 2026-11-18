# Marker text

Hand-drawn annotations for React, animated as the words enter the viewport. The text inherits its surrounding font. Reduced-motion preferences show the final marks immediately.

[Interactive demo and settings](https://ilyfedorov.com/ui-components/marker-text/)

Copy MarkerText.tsx and marker-text.css into the same directory in your React project.

```tsx
import { MarkerText } from './MarkerText';

export function Note() {
  return <p>Keep the <MarkerText variant="Circle" color="#f1784d">good parts</MarkerText>.</p>;
}
```

Choose Underline, Strike, Circle, Box, Wave, or Highlight. Use the optional delay in milliseconds to stagger consecutive marks. Keep each marked phrase short enough to fit on a line.

[MIT license](LICENSE).
