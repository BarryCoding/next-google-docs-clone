/** nextjs 15: dynamic routing */
interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>
}
export default async function DocumentIdPage({ params }: DocumentIdPageProps) {
  const { documentId } = await params
  return <div>DocumentIdPage: {documentId} </div>
}
