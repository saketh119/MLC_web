export const metadata = { robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

import Header from '../_components/Header'
import AllView from '../_components/AllView'
import { FEEDS } from '../../../lib/blogs'

export default async function AllPage() {
  return (
    <div>
      <Header feeds={FEEDS} activeId={''} />
      <main className="blog-container">
        <AllView />
      </main>
    </div>
  )
}
