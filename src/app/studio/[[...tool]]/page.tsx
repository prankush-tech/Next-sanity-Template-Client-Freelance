import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

// If using Next.js 13 or above, you can specify dynamic rendering options
export const dynamic = 'force-static'; // Change to 'force-dynamic' if you want dynamic rendering

// Export metadata and viewport directly from next-sanity/studio
export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  return (
    <div>
      <NextStudio config={config} />
    </div>
  );
}
